import React, { useState, useEffect } from 'react';
import { UserCheck, Loader2, X, Search, UserPlus, ShieldCheck, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';

interface StaffMember {
  _id: string;
  name: string;
  email: string;
  role: string;
  department?: string; 
}

interface AssignStaffModalProps {
  complaint: { _id: string; title: string };
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: (updatedComplaint: any) => void;
}

const COLORS = ['bg-emerald-100 text-emerald-600', 'bg-violet-100 text-violet-600', 'bg-amber-100 text-amber-600', 'bg-blue-100 text-blue-600'];

const AssignStaffModal: React.FC<AssignStaffModalProps> = ({ complaint, isOpen, onClose, onUpdateSuccess }) => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchStaff = async () => {
        setLoading(true);
        try {
          const res = await api.get('/admin/staff-list');
          setStaff(res.data.data || res.data.staff || []);
        } catch (err) {
          console.error("Error fetching staff:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchStaff();
    }
  }, [isOpen]);

  const handleAssign = async (staffId: string) => {
    setSubmitting(true);
    try {
      const res = await api.patch(`/admin/complaints/${complaint._id}/assign`, { staffId });
      onUpdateSuccess(res.data.complaint);
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to assign staff");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Header */}
        <div className="p-8 pb-6 flex justify-between items-start bg-gradient-to-b from-slate-50 to-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-violet-600 rounded-lg">
                <ShieldCheck className="text-white" size={18} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Assign Expert</h2>
            </div>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.1em]">
              Target: <span className="text-violet-600">{complaint.title.substring(0, 25)}...</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white hover:shadow-lg rounded-xl transition-all text-slate-400 hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-8 mb-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500" size={18} />
            <input 
              type="text"
              placeholder="Search by name, email or dept..."
              className="w-full pl-11 pr-4 h-14 bg-slate-100/50 border-2 border-transparent focus:border-violet-500/20 focus:bg-white rounded-2xl text-sm font-semibold outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="px-4 pb-4 max-h-[350px] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center py-12">
              <Loader2 className="animate-spin text-violet-600" size={44} />
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-4">Syncing Team</p>
            </div>
          ) : filteredStaff.length > 0 ? (
            <div className="space-y-2 px-2">
              {filteredStaff.map((person, idx) => (
                <button
                  key={person._id}
                  disabled={submitting}
                  onClick={() => handleAssign(person._id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-violet-50/50 rounded-[1.8rem] transition-all group border border-transparent hover:border-violet-100"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${COLORS[idx % COLORS.length]}`}>
                      {person.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-800 text-sm group-hover:text-violet-700">{person.name}</p>
                      <span className="flex items-center gap-1 text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold">
                        <Briefcase size={10} />
                        {person.department || 'Staff'}
                      </span>
                    </div>
                  </div>
                  {submitting ? <Loader2 className="animate-spin text-violet-600" size={20} /> : <UserCheck size={20} className="text-slate-300 group-hover:text-violet-600" />}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-slate-400 text-sm font-bold">No experts found.</p>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
          <button 
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-violet-600 transition-all"
            onClick={() => navigate('/admin/students')} 
          >
            <UserPlus size={16} />
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignStaffModal;