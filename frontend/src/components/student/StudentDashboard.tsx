import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '@/lib/api';

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));

    // 2. Fetch real data from backend
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/student/complaints/my');
        // Your backend returns { data: [...] }
        const data = response.data.data || [];
        setComplaints(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 3. Calculate dynamic stats
  const stats = [
    { 
      label: 'Total Complaints', 
      value: complaints.length, 
      icon: FileText, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      label: 'Pending', 
      value: complaints.filter((c: any) => c.status === 'pending').length, 
      icon: Clock, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50' 
    },
    { 
      label: 'Resolved', 
      value: complaints.filter((c: any) => c.status === 'resolved').length, 
      icon: CheckCircle2, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50' 
    },
  ];

  // 4. Get the 3 most recent activities
  const recentActivity = complaints.slice(0, 3);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#001a33]">
          Welcome back, {user?.name || 'Student'}!
        </h1>
        <p className="text-slate-500 mt-1">Here is what is happening with your complaints today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-[#001a33]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#001a33]">Recent Activity</h2>
            <Link to="/student/my-complaints" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity: any) => (
                <div key={activity._id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#001a33] line-clamp-1">{activity.title}</p>
                      <p className="text-[11px] text-slate-400">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    activity.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 
                    activity.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-slate-400 text-sm italic">No recent activity found.</p>
            )}
          </div>
        </div>

        {/* Quick Action / AI Promo */}
        <div className="bg-[#003366] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2 text-[#f1b400]">New Issue?</h3>
            <p className="text-sm text-blue-100 mb-6 leading-relaxed">
              Don't let issues linger. Submit a formal complaint and track its progress in real-time.
            </p>
            <Link 
              to="/student/submit-complaint" 
              className="inline-flex items-center gap-2 bg-[#f1b400] text-[#001a33] px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
            >
              Submit Complaint
            </Link>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;