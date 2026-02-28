import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import api from '@/lib/api';

const StaffComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<any>(null);
  const [remark, setRemark] = useState('');

  useEffect(() => {
    api.get(`/staff/complaints/${id}`).then(res => setComplaint(res.data.complaint));
  }, [id]);

  const handleResolve = async () => {
    await api.patch(`/staff/complaints/${id}/resolve`, { remark });
    navigate('/staff/dashboard');
  };

  if (!complaint) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-bold mb-4">
        <ArrowLeft size={20} /> Back
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 bg-slate-50 border-b border-slate-200">
          <div className="flex justify-between items-center mb-4">
             <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
               {complaint.category?.name}
             </span>
             <span className="text-xs text-slate-400">{new Date(complaint.createdAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{complaint.title}</h1>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2">Student Description</h4>
            <div className="bg-slate-50 p-6 rounded-xl text-slate-700 leading-relaxed border border-slate-100">
              {complaint.description}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2">Add Resolution Remark</h4>
            <textarea 
              rows={4}
              className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Explain how the issue was addressed..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleResolve}
              className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 flex items-center justify-center gap-2"
            >
              <Send size={18} /> Resolve & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffComplaintDetail;