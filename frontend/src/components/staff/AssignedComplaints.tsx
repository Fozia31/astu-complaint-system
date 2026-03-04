import React, { useEffect, useState, useCallback } from 'react';
import { Eye, Search, AlertCircle, CheckCircle2, Clock, ListFilter, LayoutGrid } from 'lucide-react';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const AssignedComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Stats for the header
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c: any) => c.status !== 'resolved').length,
    resolved: complaints.filter((c: any) => c.status === 'resolved').length,
  };

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/staff/assigned-complaints?status=${statusFilter}&search=${searchTerm}`);
      setComplaints(res.data.complaints || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchComplaints();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [fetchComplaints]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'pending':
      case 'open': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Assigned Tasks</h1>
          <p className="text-slate-500 font-medium mt-1">Directly manage student grievances and updates.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase">Open</p>
            <p className="text-xl font-black text-orange-600">{stats.pending}</p>
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase">Resolved</p>
            <p className="text-xl font-black text-emerald-600">{stats.resolved}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by student name or ticket title..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.2rem] shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="md:col-span-4 flex gap-2">
          <div className="relative flex-1">
            <ListFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            <select 
              className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-[1.2rem] shadow-sm appearance-none outline-none font-bold text-slate-700 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="open">Pending/Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. The Table Data */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Grievance Detail</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Current Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={4} className="px-8 py-32 text-center"><div className="flex flex-col items-center gap-3"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div><p className="text-slate-400 font-bold uppercase text-xs tracking-tighter">Syncing assignments...</p></div></td></tr>
              ) : complaints.length > 0 ? (
                complaints.map((c: any) => (
                  <tr 
                    key={c._id} 
                    onClick={() => navigate(`/staff/complaints/${c._id}`)}
                    className="group hover:bg-blue-50/30 transition-all cursor-pointer"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {c.student?.name?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{c.student?.name}</div>
                          <div className="text-xs text-slate-400 font-medium">{c.student?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-800 line-clamp-1">{c.title}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                          {c.category?.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          • {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter border ${getStatusStyle(c.status)}`}>
                        {c.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="p-6 bg-slate-50 rounded-full">
                        <AlertCircle className="text-slate-300" size={40} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-900 font-black">No Assignments Found</p>
                        <p className="text-slate-400 text-sm font-medium">Try adjusting your filters or search term.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedComplaints;