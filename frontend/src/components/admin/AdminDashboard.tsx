import React, { useEffect, useState } from 'react';
import { FileText, CheckCircle, Clock, Users, Loader2 } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import api from '@/lib/api';

const COLORS = ['#003366', '#f1b400', '#2d4bbd', '#ef4444', '#10b981'];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolutionRate: 0,
    avgResolutionTime: 0,
    totalUsers: 0
  });
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [total, rate, time, users, category, monthly] = await Promise.all([
          api.get('/analytics/total'),
          api.get('/analytics/resolution-rate'),
          api.get('/analytics/avg-resolution-time'),
          api.get('/users'),
          api.get('/analytics/by-category'),
          api.get('/analytics/monthly')
        ]);

        setStats({
          totalComplaints: total.data.totalComplaints || 0,
          resolutionRate: rate.data.resolutionRate || 0,
          avgResolutionTime: time.data.averageResolutionTime || 0,
          totalUsers: users.data.length || 0
        });

        // Backend returns "data" array for these
        setCategoryData(category.data.data || []);
        setMonthlyData(monthly.data.data || []);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-[#003366]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-2">
      {/* 1. TOP STAT CARDS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Complaints" val={stats.totalComplaints} color="text-blue-600" bg="bg-blue-50" icon={FileText} />
        <StatCard title="Resolution Rate" val={`${stats.resolutionRate.toFixed(1)}%`} color="text-green-600" bg="bg-green-50" icon={CheckCircle} />
        <StatCard title="Avg Resolution" val={`${stats.avgResolutionTime.toFixed(1)} Days`} color="text-orange-600" bg="bg-orange-50" icon={Clock} />
        <StatCard title="System Users" val={stats.totalUsers} color="text-purple-600" bg="bg-purple-50" icon={Users} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 2. PIE CHART: CATEGORY DISTRIBUTION */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
          <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Complaints by Category</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="total"
                nameKey="category"
                cx="50%" cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3. BAR CHART: MONTHLY TRENDS */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
          <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="total" fill="#003366" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Sub-component for clean code
const StatCard = ({ title, val, color, bg, icon: Icon }: any) => (
  <div className="flex items-center gap-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-black text-slate-800 leading-tight">{val}</p>
    </div>
  </div>
);

export default AdminDashboard;