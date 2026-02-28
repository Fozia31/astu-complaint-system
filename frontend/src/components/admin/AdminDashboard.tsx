import React, { useEffect, useState, useMemo } from 'react';
import { 
  Users, MessageSquare, CheckCircle, Clock, 
  TrendingUp, AlertTriangle, ArrowUpRight 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import api from '@/lib/api';

const AdminDashboard = () => {
  const [data, setData] = useState({ complaints: [], users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [compRes, userRes] = await Promise.all([
          api.get('/complaints'),
          api.get('/users')
        ]);
        setData({
          complaints: compRes.data.data || compRes.data,
          users: userRes.data.data || userRes.data
        });
      } catch (error) {
        console.error("Dashboard Load Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // --- Process Analytics ---
  const stats = useMemo(() => {
    const c = data.complaints;
    return {
      total: c.length,
      pending: c.filter((i: any) => i.status === 'pending').length,
      resolved: c.filter((i: any) => i.status === 'resolved').length,
      users: data.users.length,
    };
  }, [data]);

  const chartData = [
    { name: 'Pending', value: stats.pending, color: '#f1b400' },
    { name: 'Resolved', value: stats.resolved, color: '#10b981' },
    { name: 'In Progress', value: stats.total - (stats.pending + stats.resolved), color: '#3b82f6' },
  ];

  if (loading) return <div className="h-96 flex items-center justify-center"><Clock className="animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-[#001a33] tracking-tight">System Overview</h1>
        <p className="text-slate-500 font-medium">Real-time analytics for ASTU Student Grievances.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.users} icon={<Users />} color="text-blue-600" bg="bg-blue-50" trend="+12% from last month" />
        <StatCard title="Total Complaints" value={stats.total} icon={<MessageSquare />} color="text-indigo-600" bg="bg-indigo-50" trend="+5% this week" />
        <StatCard title="Pending Review" value={stats.pending} icon={<AlertTriangle />} color="text-amber-600" bg="bg-amber-50" trend="Requires Action" />
        <StatCard title="Resolved Cases" value={stats.resolved} icon={<CheckCircle />} color="text-emerald-600" bg="bg-emerald-50" trend="88% Success Rate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-[#001a33]">Complaint Status Distribution</h3>
            <TrendingUp size={20} className="text-slate-400" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Mini-List */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-[#001a33] mb-6">Recent Alerts</h3>
          <div className="space-y-6">
            {data.complaints.slice(0, 5).map((c: any) => (
              <div key={c._id} className="flex items-start gap-4 group">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${c.status === 'pending' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">{c.title}</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
                <ArrowUpRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-2xl bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest hover:bg-[#001a33] hover:text-white transition-all">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card to keep code clean (shadcn style)
const StatCard = ({ title, value, icon, color, bg, trend }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-50 px-2 py-1 rounded-lg">Live</span>
    </div>
    <h3 className="text-2xl font-black text-[#001a33] mb-1">{value}</h3>
    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">{title}</p>
    <div className="pt-3 border-t border-slate-50 text-[10px] font-medium text-slate-400">
      {trend}
    </div>
  </div>
);

export default AdminDashboard;