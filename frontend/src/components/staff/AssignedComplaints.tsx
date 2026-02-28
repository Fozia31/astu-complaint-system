import React, { useEffect, useState, useCallback } from 'react';
import { Eye, Search, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const AssignedComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Enhanced fetch with query params
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
    // Optional: Add a small delay (debounce) for searching
    const delayDebounce = setTimeout(() => {
      fetchComplaints();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [fetchComplaints]);

  // Helper for Status Badge Styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
      case 'open': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Assigned Complaints</h1>
          <p className="text-slate-500 mt-1">Manage and update status for student grievances.</p>
        </div>
        <div className="text-sm text-slate-400 font-medium">
          Showing {complaints.length} tickets
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by title or student name..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="open">Open / New</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-[12px] uppercase font-semibold text-slate-500">
            <tr>
              <th className="px-6 py-4">Student Info</th>
              <th className="px-6 py-4">Complaint Details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Submitted</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
               <tr><td colSpan={5} className="px-6 py-20 text-center text-slate-400">Loading records...</td></tr>
            ) : complaints.length > 0 ? (
              complaints.map((c: any) => (
                <tr key={c._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{c.student?.name}</div>
                    <div className="text-xs text-slate-500">{c.student?.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700 truncate max-w-xs">{c.title}</div>
                    <div className="mt-1">
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border border-slate-200">
                            {c.category?.name || 'General'}
                        </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getStatusStyle(c.status)}`}>
                      {c.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => navigate(`/staff/complaints/${c._id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-2 font-semibold text-sm"
                    >
                      <Eye size={18} />
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <AlertCircle className="text-slate-300" size={48} />
                        <p className="text-slate-500 font-medium">No complaints match your criteria.</p>
                    </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedComplaints;