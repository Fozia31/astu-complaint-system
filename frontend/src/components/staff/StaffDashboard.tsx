import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListChecks, Clock, CheckCircle2, Eye, UserCheck } from 'lucide-react';
import api from '@/lib/api';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/staff/dashboard-summary');
        
        if (res.data.summary) {
          setStats({
            total: res.data.summary.totalAssigned || 0,
            pending: res.data.summary.pending || 0,
            resolved: res.data.summary.resolved || 0
          });
        }
        
        if (res.data.recentComplaints) {
           setRecent(res.data.recentComplaints);
        }
      } catch (err) { 
        console.error("Dashboard Fetch Error:", err); 
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Loading Dashboard Data...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Staff Dashboard</h1>
        <p className="text-slate-500">Manage and respond to assigned complaints from students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Assigned" value={stats?.total} icon={<ListChecks className="text-blue-600"/>} color="bg-blue-50" />
        <StatCard title="Pending" value={stats?.pending} icon={<Clock className="text-orange-600"/>} color="bg-orange-50" />
        <StatCard title="Resolved" value={stats?.resolved} icon={<CheckCircle2 className="text-emerald-600"/>} color="bg-emerald-50" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recent Assigned Complaints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-400">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                {/* NEW COLUMN HEADER */}
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recent.length > 0 ? (
                recent.map((c: any) => (
                  <tr key={c._id} className="hover:bg-slate-50 transition-colors text-sm">
                    <td className="px-6 py-4 font-medium">{c.student?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-slate-600">{c.title}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 px-2 py-1 rounded text-[10px]">
                        {c.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                         c.status === 'resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                       }`}>{c.status}</span>
                    </td>
                    {/* NEW COLUMN CELL */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                          <UserCheck size={12} className="text-slate-500" />
                        </div>
                        <span className="text-slate-700 font-medium">
                          {c.assignedTo?.name || 'Unassigned'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => navigate(`/staff/complaints/${c._id}`)} 
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
                    No complaints available in the system yet.
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

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase mb-1">{title}</p>
      <p className="text-3xl font-black text-slate-800">{value ?? 0}</p>
    </div>
    <div className={`p-4 rounded-xl ${color}`}>{icon}</div>
  </div>
);

export default StaffDashboard;