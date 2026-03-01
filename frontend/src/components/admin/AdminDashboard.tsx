import React, { useEffect, useState } from 'react';
import { FileText, CheckCircle, Clock, Users, Loader2, RefreshCcw, AlertCircle } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import api from '@/lib/api';

// 1. New Vibrant Palette
const COLORS = ['#10b981', '#8b5cf6', '#f59e0b', '#3b82f6', '#ef4444'];

// Type Definitions
interface DashboardStats {
  totalComplaints: number;
  resolutionRate: number;
  averageResolutionTime: number;
  totalUsers: number;
}

interface CategoryData {
  category: string;
  total: number;
}

interface MonthlyData {
  _id: string; 
  total: number;
}

interface DashboardData {
  stats: DashboardStats;
  categoryData: CategoryData[];
  monthlyData: MonthlyData[];
}

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/analytics/dashboard-summary');
      setData(res.data);
    } catch (err: any) {
      console.error("Dashboard Load Error:", err);
      setError("Failed to load analytics. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#8b5cf6]" size={48} />
        <p className="text-slate-500 font-medium tracking-wide">Gathering system data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center p-10 bg-white rounded-[2.5rem] border border-red-100 shadow-xl shadow-red-50">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={44} />
          <p className="text-slate-800 text-lg font-bold">{error || "Data unavailable"}</p>
          <button onClick={fetchDashboardData} className="mt-4 px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-100 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { stats, categoryData, monthlyData } = data;

  return (
    <div className="space-y-8 p-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Analytics Overview</h2>
          <p className="text-slate-500 font-medium mt-1">Real-time performance metrics & trends</p>
        </div>
        <button 
          onClick={fetchDashboardData} 
          className="p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:rotate-180 transition-all duration-700 text-slate-400 hover:text-violet-600 shadow-sm"
        >
          <RefreshCcw size={22} />
        </button>
      </div>

      {/* 1. STAT CARDS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Complaints" val={stats.totalComplaints} color="text-blue-600" bg="bg-blue-50" icon={FileText} />
        <StatCard title="Resolution Rate" val={`${stats.resolutionRate.toFixed(1)}%`} color="text-emerald-600" bg="bg-emerald-50" icon={CheckCircle} />
        <StatCard title="Avg Resolution" val={`${stats.averageResolutionTime.toFixed(1)} Days`} color="text-amber-600" bg="bg-amber-50" icon={Clock} />
        <StatCard title="System Users" val={stats.totalUsers} color="text-violet-600" bg="bg-violet-50" icon={Users} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 2. PIE CHART */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-[500px]">
          <h3 className="text-[11px] font-black text-slate-400 mb-8 uppercase tracking-[0.25em]">Distribution by Category</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie 
                data={categoryData} 
                dataKey="total" 
                nameKey="category" 
                cx="50%" 
                cy="45%" 
                innerRadius={85} 
                outerRadius={115} 
                paddingAngle={12}
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '15px' }} 
              />
              <Legend verticalAlign="bottom" iconType="circle" iconSize={10} wrapperStyle={{ paddingTop: '20px', fontWeight: 600, color: '#64748b' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3. BAR CHART WITH GRADIENT */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-[500px]">
          <h3 className="text-[11px] font-black text-slate-400 mb-8 uppercase tracking-[0.25em]">Monthly Growth Trend</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={monthlyData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#c084fc" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="_id" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }}
                tickFormatter={(str) => {
                  const [year, month] = str.split("-");
                  const date = new Date(parseInt(year), parseInt(month) - 1);
                  return date.toLocaleDateString('en-US', { month: 'short' });
                }} 
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#cbd5e1' }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }} 
                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
              />
              <Bar dataKey="total" fill="url(#barGradient)" radius={[14, 14, 0, 0]} barSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  val: string | number;
  color: string;
  bg: string;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, val, color, bg, icon: Icon }) => (
  <div className="flex items-center gap-6 rounded-[2.5rem] border border-slate-100 bg-white p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-2 group">
    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl ${bg} ${color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
      <Icon size={32} strokeWidth={2.5} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
      <p className="text-3xl font-black text-slate-900 leading-none">{val}</p>
    </div>
  </div>
);

export default AdminDashboard;