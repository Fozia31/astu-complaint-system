import React, { useEffect, useState } from 'react';
import { Search, Filter, Calendar, MoreVertical, CheckCircle, Clock, AlertCircle, UserCheck, Loader2 } from 'lucide-react';
import api from '@/lib/api';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await api.get('/complaints');
      setComplaints(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching admin complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (id: string, staffId: string) => {
    try {
      await api.patch(`/complaints/${id}/assign`, { assignedTo: staffId });
      fetchComplaints(); // Refresh list
    } catch (error) {
      alert("Failed to assign complaint");
    }
  };

  const filtered = complaints.filter((c: any) => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.student?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-[#001a33]">Student Grievances</h1>
        <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl border border-orange-100 font-bold text-sm flex items-center gap-2 hover:bg-orange-100 transition-all">
          <Calendar size={16} /> Export Report
        </button>
      </div>

      {/* Filter Bar from Image */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm outline-none font-medium">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <select className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm outline-none font-medium">
          <option>All Categories</option>
        </select>
        <div className="relative">
           <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
           <input type="text" placeholder="Select Date Range" className="w-full pl-10 h-11 bg-white border border-slate-200 rounded-xl text-sm outline-none" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            placeholder="Search by student or title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 h-11 bg-white border border-slate-200 rounded-xl text-sm outline-none" 
          />
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item: any) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {item.student?.name?.split(' ').map((n:any)=>n[0]).join('')}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.student?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600 font-medium">{item.title}</td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded-md text-slate-500 uppercase">
                      {item.category?.name || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      item.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                      item.status === 'resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-400 font-bold">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-5">
                    <button className="text-orange-600 text-xs font-black uppercase tracking-tighter hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaints;