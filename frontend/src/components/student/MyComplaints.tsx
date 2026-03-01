import { useEffect, useState, useMemo, useRef } from 'react';
import { Search, Filter, Clock, Loader2, Inbox, Eye, X, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false); // State for AI upload
  const navigate = useNavigate();
  
  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await api.get('/student/complaints/my');
        const dataArray = response.data.data || response.data;
        setComplaints(Array.isArray(dataArray) ? dataArray : []);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // --- Logic to handle AI Policy Upload ---
  const handlePolicyUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Optional: Check file type
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file for the AI to read.");
      return;
    }

    try {
      setUploading(true);
      
      // Note: Since your backend 'upload-doc' expects a URL, 
      // in a real app, you'd upload to Firebase/S3 first.
      // For testing, we send the ASTU Legislation link you have.
      const payload = {
        fileName: file.name,
        fileUrl: "https://www.astu.edu.et/images/mg312022pho/ASTU_legislation_-August_2017_edited.pdf"
      };

      await api.post('/chatbot/upload-doc', payload);
      alert("AI Assistant updated! It has now read the legislation document.");
      
    } catch (error: any) {
      console.error("AI Upload Error:", error);
      alert("Failed to update AI context: " + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    }
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((item: any) => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, complaints]);

  return (
    <div className="animate-in fade-in duration-500">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePolicyUpload} 
        className="hidden" 
        accept=".pdf"
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#001a33]">My Complaints</h1>
          <p className="text-slate-500 mt-1">Track the status of your submitted requests.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="h-11 px-4 bg-[#001a33] text-white rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-slate-800 transition-all shadow-md disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Upload size={18} className="text-orange-500" />
            )}
            {uploading ? "AI Reading..." : "Update AI Context"}
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search complaints..." 
              className="pl-10 pr-10 h-11 bg-white border border-slate-200 rounded-xl text-sm outline-none w-64 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm" 
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button className="h-11 px-4 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Fetching your records...</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Inbox className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-600 font-bold">
              {searchTerm ? "No results found" : "No complaints found"}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {searchTerm ? "Try searching for another title or ID." : "You haven't submitted any complaints yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Complaint Info</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredComplaints.map((item: any) => (
                  <tr 
                    key={item._id} 
                    onClick={() => navigate(`/student/my-complaints/${item._id}`)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="px-8 py-6">
                      <p className="font-bold text-[#001a33] text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5 uppercase">
                        {item._id.slice(-8)}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-md text-slate-600">
                        {typeof item.category === 'object' ? item.category.name : item.category || 'General'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={14} />
                        <span className="text-xs">{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'resolved' ? 'bg-green-100 text-green-600' : 
                        item.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Eye size={16} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;