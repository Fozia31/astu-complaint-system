import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Tag, User, FileText, 
  AlertCircle, Loader2, Paperclip, ChevronRight,
  ShieldCheck, Calendar
} from 'lucide-react';
import api from '@/lib/api';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/student/complaints/${id}`);
        setComplaint(response.data.data);
      } catch (error: any) {
        navigate('/student/my-complaints');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchComplaintData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <div className="absolute inset-0 blur-xl bg-blue-400/20 animate-pulse"></div>
        </div>
        <p className="mt-6 text-slate-400 font-bold tracking-widest uppercase text-xs">Retrieving Case Details</p>
      </div>
    );
  }

  if (!complaint) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Breadcrumbs & Actions */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 text-slate-500 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to Dashboard</span>
        </button>
        
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
          Case ID <ChevronRight size={12} /> 
          <span className="text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{complaint._id.toUpperCase()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            
            {/* Title Block */}
            <div className="p-8 md:p-12 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-50">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <FileText size={24} />
                 </div>
                 <div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#001a33] leading-tight">
                      {complaint.title}
                    </h1>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Status</p>
                  <span className={`text-xs font-black uppercase tracking-wider ${
                    complaint.status === 'resolved' ? 'text-emerald-600' : 'text-blue-600'
                  }`}>
                    ● {complaint.status}
                  </span>
                </div>
                <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Category</p>
                  <span className="text-xs font-bold text-slate-700">
                    {typeof complaint.category === 'object' ? complaint.category.name : complaint.category}
                  </span>
                </div>
                <div className="p-4 bg-white border border-slate-100 rounded-2xl col-span-2 md:col-span-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Filed Date</p>
                  <span className="text-xs font-bold text-slate-700">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                Detailed Statement
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                {complaint.description}
              </p>
            </div>
          </div>

          {complaint.attachments && complaint.attachments.length > 0 && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Paperclip size={16} /> Supporting Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {complaint.attachments.map((file: string, index: number) => (
                  <a 
                    key={index}
                    href={`${import.meta.env.VITE_API_URL}/${file}`} 
                    target="_blank" 
                    className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 group-hover:scale-90 transition-transform">
                        <FileText size={20} />
                      </div>
                      <span className="text-sm font-bold truncate max-w-[120px]">Document {index + 1}</span>
                    </div>
                    <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-[#001a33] rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <ShieldCheck size={18} /> Resolution Track
            </h3>

            {complaint.remarks && complaint.remarks.length > 0 ? (
              <div className="space-y-8">
                {complaint.remarks.map((remark: any, idx: number) => (
                  <div key={idx} className="relative pl-6 border-l border-blue-500/30">
                    <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">"{remark.comment}"</p>
                    <div className="flex items-center gap-2">
                       <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-[10px] font-bold">
                          {remark.addedBy?.name?.[0]}
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-white uppercase">{remark.addedBy?.name}</p>
                          <p className="text-[9px] text-blue-400 font-bold tracking-widest uppercase">Official Staff</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center">
                <Clock className="mx-auto text-blue-500/40 mb-4" size={40} />
                <p className="text-slate-400 text-sm font-medium">Under Review</p>
                <p className="text-[10px] text-slate-500 mt-2 uppercase font-bold tracking-widest">Awaiting admin response</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-[2.5rem] p-8 border border-blue-100">
             <h4 className="text-[#001a33] font-black text-sm mb-2">Need Help?</h4>
             <p className="text-slate-500 text-xs leading-relaxed font-medium">
                If the resolution provided is unsatisfactory, you may escalate this case to the Student Affairs office.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;