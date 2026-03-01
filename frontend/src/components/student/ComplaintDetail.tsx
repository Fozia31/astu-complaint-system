import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, FileText, 
  Loader2, Paperclip, 
  ShieldCheck, ExternalLink, AlertCircle
} from 'lucide-react';
import api from '@/lib/api';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/student/complaints/${id}`);
        const data = response.data.data || response.data;
        setComplaint(data);
      } catch (error: any) {
        console.error("Error details:", error);
        setError("Could not find the complaint details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchComplaintData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Loading Case #{id?.slice(-6)}</p>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-bold text-slate-800">Oops! Something went wrong</h2>
        <p className="text-slate-500 mb-6">{error || "Complaint not found."}</p>
        <button onClick={() => navigate('/student/my-complaints')} className="px-6 py-2 bg-blue-600 text-white rounded-xl">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <button 
          onClick={() => navigate('/student/my-complaints')}
          className="flex items-center gap-2 w-fit px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Back to List</span>
        </button>
        
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white px-4 py-2 border border-slate-100 rounded-xl">
          CASE_ID: <span className="text-blue-600 font-bold">{complaint._id}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  complaint.status === 'resolved' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {complaint.status}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                  {typeof complaint.category === 'object' ? complaint.category.name : complaint.category}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#001a33]">{complaint.title}</h1>
            </div>

            <div className="p-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Complaint Description</h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{complaint.description}</p>
              </div>
            </div>
          </div>

          {/* ATTACHMENTS SECTION */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Paperclip size={14} /> Attachments
             </h3>
             {complaint.attachments && complaint.attachments.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {complaint.attachments.map((file: string, index: number) => {
                   // Clean path: extract just the filename if a path was stored
                   const fileNameOnly = file.split(/[/\\]/).pop();
                   const fileUrl = `http://localhost:5000/uploads/${fileNameOnly}`;

                   return (
                    <a 
                      key={index}
                      href={fileUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                         <FileText className="text-blue-500" size={20} />
                         <span className="text-sm font-bold text-slate-700">View Document {index + 1}</span>
                      </div>
                      <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-500" />
                    </a>
                   );
                 })}
               </div>
             ) : (
               <p className="text-slate-400 text-sm italic text-center py-4">No documents attached.</p>
             )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#001a33] rounded-[2rem] p-8 text-white shadow-lg">
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <ShieldCheck size={18} /> Resolution Track
            </h3>

            {complaint.remarks && complaint.remarks.length > 0 ? (
              <div className="space-y-6">
                {complaint.remarks.map((remark: any, idx: number) => (
                  <div key={idx} className="relative pl-6 border-l border-blue-500/30 pb-2">
                    <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                    <p className="text-xs text-slate-300 italic mb-2">"{remark.comment}"</p>
                    <div className="flex items-center gap-2">
                       <p className="text-[10px] font-bold text-white uppercase">{remark.addedBy?.name || "Official Staff"}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Clock className="mx-auto text-slate-500 mb-3" size={32} />
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Status: Pending</p>
                <p className="text-[10px] text-slate-500 mt-1">Our team is currently reviewing your case.</p>
              </div>
            )}
          </div>
          
          <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Timeline</h4>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm">
                <Clock size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">Submitted On</p>
                <p className="text-[10px] text-slate-500">{new Date(complaint.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComplaintDetail;