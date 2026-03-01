import React, { useState, useEffect } from 'react';
import { UserPlus, Briefcase, Send, Loader2, CheckCircle, ShieldAlert } from 'lucide-react';
import api from '@/lib/api';

const StaffManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State for new staff
  const [newStaff, setNewStaff] = useState({ name: '', email: '', department: '' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [compRes, staffRes] = await Promise.all([
        api.get('/admin/complaints'),
        api.get('/admin/staff-list')
      ]);
      setComplaints(compRes.data.complaints?.filter(c => c.status === 'pending') || []);
      setStaffList(staffRes.data.data || staffRes.data.staff || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await api.post('/admin/add-staff', { ...newStaff, role: 'staff' });
      setNewStaff({ name: '', email: '', department: '' });
      fetchData(); // Refresh list
      alert("Staff member added successfully!");
    } catch (err) {
      alert("Error adding staff");
    } finally {
      setAdding(false);
    }
  };

  const handleAssign = async (complaintId: string, staffId: string) => {
    try {
      await api.patch(`/admin/complaints/${complaintId}/assign`, { staffId });
      fetchData(); // Refresh to remove assigned complaint from list
    } catch (err) {
      alert("Assignment failed");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SECTION 1: ADD NEW STAFF */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><UserPlus size={20}/></div>
            <h2 className="text-xl font-black text-slate-800">Add New Staff</h2>
          </div>
          <form onSubmit={handleAddStaff} className="space-y-4">
            <input 
              className="w-full h-12 px-4 bg-slate-50 border-none rounded-2xl text-sm" 
              placeholder="Full Name" 
              required
              value={newStaff.name}
              onChange={e => setNewStaff({...newStaff, name: e.target.value})}
            />
            <input 
              className="w-full h-12 px-4 bg-slate-50 border-none rounded-2xl text-sm" 
              placeholder="Email Address" 
              type="email" 
              required
              value={newStaff.email}
              onChange={e => setNewStaff({...newStaff, email: e.target.value})}
            />
            <select 
              className="w-full h-12 px-4 bg-slate-50 border-none rounded-2xl text-sm"
              value={newStaff.department}
              onChange={e => setNewStaff({...newStaff, department: e.target.value})}
            >
              <option value="">Select Department</option>
              <option value="Registrar">Registrar</option>
              <option value="Finance">Finance</option>
              <option value="IT Support">IT Support</option>
              <option value="Academic">Academic</option>
            </select>
            <button 
              disabled={adding}
              className="w-full py-4 bg-[#003366] text-white rounded-2xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {adding ? 'Processing...' : 'Register Staff'}
            </button>
          </form>
        </div>

        {/* SECTION 2: ASSIGN STAFF TO COMPLAINTS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-xl"><Briefcase size={20}/></div>
              <h2 className="text-xl font-black text-slate-800">Quick Assignment Center</h2>
            </div>

            <div className="space-y-4">
              {complaints.length > 0 ? complaints.map((c: any) => (
                <div key={c._id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-[1.8rem] gap-4">
                  <div className="max-w-md">
                    <p className="font-bold text-slate-800">{c.title}</p>
                    <p className="text-xs text-slate-400 mt-1">From: {c.student?.name} • Category: {c.category?.name}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select 
                      onChange={(e) => handleAssign(c._id, e.target.value)}
                      className="h-10 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none"
                    >
                      <option value="">Choose Expert...</option>
                      {staffList.map((s: any) => (
                        <option key={s._id} value={s._id}>{s.name} ({s.department})</option>
                      ))}
                    </select>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10">
                   <CheckCircle className="mx-auto text-emerald-400 mb-2" size={32} />
                   <p className="text-slate-400 text-sm font-medium">All clear! No pending assignments.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffManagement;