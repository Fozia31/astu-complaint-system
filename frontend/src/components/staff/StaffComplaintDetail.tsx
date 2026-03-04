import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Loader2, MessageSquare, AlertCircle, ChevronDown } from 'lucide-react';
import api from '@/lib/api';

const StaffComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [remark, setRemark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/staff/complaints/${id}`);
      setComplaint(res.data.complaint);
    } catch (err) {
      console.error("Error fetching detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const handleUpdateStatus = async (newStatus: string) => {
    if (newStatus === complaint.status) return;
    
    setUpdatingStatus(true);
    try {
      await api.patch(`/staff/complaints/${id}/status`, { status: newStatus });
      setComplaint({ ...complaint, status: newStatus });
      await fetchComplaint(); 
    } catch (err) {
      alert("Error updating status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleResolve = async () => {
    if (!remark.trim()) return alert("Please add a remark before resolving.");
    
    setIsSubmitting(true);
    try {
      await api.post(`/staff/complaints/${id}/remarks`, { message: remark });
      await api.patch(`/staff/complaints/${id}/status`, { status: 'resolved' });
      navigate('/staff/dashboard');
    } catch (err) {
      alert("Error resolving complaint");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-bold transition-colors hover:text-slate-800">
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                {complaint.category?.name || 'General'}
              </span>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                complaint.status === 'resolved' ? 'bg-emerald-100 text-emerald-600' : 
                complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {complaint.status}
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">{complaint.title}</h1>
          </div>

          <div className="relative inline-block text-left">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">Change Status</label>
            <div className="flex items-center gap-2">
              <select 
                value={complaint.status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                disabled={updatingStatus || complaint.status === 'resolved'}
                className="appearance-none bg-white border-2 border-slate-200 rounded-xl px-4 py-2 pr-10 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 transition-all disabled:opacity-50 cursor-pointer"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <div className="pointer-events-none absolute right-3 mt-4">
                {updatingStatus ? <Loader2 size={14} className="animate-spin text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Student Name</p>
              <p className="font-bold text-slate-800">{complaint.student?.name}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Department</p>
              <p className="font-bold text-slate-800">{complaint.student?.department || 'N/A'}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Issue Description</h4>
            </div>
            <div className="bg-slate-50/50 p-8 rounded-3xl text-slate-700 leading-relaxed border border-slate-100 text-lg">
              {complaint.description}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Update History</h4>
            <div className="space-y-3">
              {complaint.remarks?.map((r: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100">
                  <MessageSquare size={16} className="text-slate-300 mt-1" />
                  <div>
                    <p className="text-sm text-slate-600">{r.message}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase italic">
                      {new Date(r.createdAt).toLocaleString()} • {r.addedBy?.name || 'Staff'}
                    </p>
                  </div>
                </div>
              ))}
              {complaint.remarks?.length === 0 && <p className="text-xs text-slate-400 italic">No remarks added yet.</p>}
            </div>
          </div>

          {complaint.status !== 'resolved' ? (
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Add Remark / Resolve Issue</h4>
              <textarea 
                rows={4}
                className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-blue-500/20 focus:bg-white transition-all text-slate-700"
                placeholder="Type your update or resolution notes here..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
              
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={async () => {
                    if(!remark.trim()) return;
                    setIsSubmitting(true);
                    await api.post(`/staff/complaints/${id}/remarks`, { message: remark });
                    setRemark('');
                    fetchComplaint();
                    setIsSubmitting(false);
                  }}
                  disabled={isSubmitting || !remark.trim()}
                  className="flex-1 border-2 border-blue-600 text-blue-600 py-4 rounded-2xl font-black uppercase text-xs hover:bg-blue-50 transition-all disabled:opacity-50"
                >
                  Post Remark Only
                </button>
                <button 
                  onClick={handleResolve}
                  disabled={isSubmitting || !remark.trim()}
                  className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase text-xs hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={18} />}
                  Resolve & Close
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-4">
               <CheckCircle2 size={32} className="text-emerald-600" />
               <div>
                 <p className="font-black text-emerald-800 uppercase text-xs">Ticket Resolved</p>
                 <p className="text-emerald-600 text-sm font-medium">Closed on {new Date(complaint.resolvedAt || Date.now()).toLocaleDateString()}</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffComplaintDetail;