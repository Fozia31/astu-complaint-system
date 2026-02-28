import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, MessageSquare, Clock, 
  CheckCircle, Trash2, ShieldCheck, Tag, 
  AlertCircle, Loader2 
} from 'lucide-react';
import api from '@/lib/api';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComplaintDetail();
  }, [id]);

  const fetchComplaintDetail = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/complaints/${id}`);
      setComplaint(response.data.complaint);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load complaint details.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      // Logic for updating status (assuming you have a patch route)
      await api.patch(`/admin/complaints/${id}/status`, { status: newStatus });
      fetchComplaintDetail(); // Refresh data
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (error || !complaint) return (
    <div className="p-10 text-center">
      <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
      <h2 className="text-xl font-bold text-slate-800">{error || "Complaint not found"}</h2>
      <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 font-bold">Go Back</button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <div className="flex gap-3">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">
            ID: {complaint._id.slice(-6)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                complaint.status === 'open' ? 'bg-orange-100 text-orange-600' : 
                complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 
                'bg-emerald-100 text-emerald-600'
              }`}>
                {complaint.status}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                <Clock size={14} /> {new Date(complaint.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {complaint.title}
            </h1>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MessageSquare size={16} /> Detailed Description
              </h3>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-slate-600 leading-relaxed text-lg">
                {complaint.description}
              </div>
            </div>
          </div>

          {/* Attachments Section (If any) */}
          {complaint.attachments?.length > 0 && (
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Attachments</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Map your attachments here */}
                <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-sm">
                   Document.pdf
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar Info & Actions */}
        <div className="space-y-6">
          {/* Student Info */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Submitted By</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <User size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{complaint.student?.name}</p>
                <p className="text-[10px] text-slate-500">{complaint.student?.email}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Department</p>
              <p className="text-xs font-bold text-slate-700">{complaint.student?.department || 'N/A'}</p>
            </div>
          </div>

          {/* Category & Assignment */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6">
             <div className="mb-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</h3>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Tag size={16} className="text-blue-500" />
                  {complaint.category?.name || 'General Inquiry'}
                </div>
             </div>
             
             <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Assignee</h3>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  {complaint.assignedTo?.name || 'Unassigned'}
                </div>
             </div>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => handleStatusUpdate('resolved')}
              className="w-full bg-[#2d4bbd] hover:bg-[#213996] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100"
            >
              <CheckCircle size={18} /> Mark as Resolved
            </button>
            <button className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
              <ShieldCheck size={18} /> Assign to Staff
            </button>
            <button className="w-full bg-red-50 text-red-500 hover:bg-red-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
              <Trash2 size={18} /> Delete Grievance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;