import React from 'react';
import { Clock, CheckCircle, AlertCircle, Inbox } from 'lucide-react';

const AdminStats = ({ complaints }: { complaints: any[] }) => {
  // Logic to calculate stats from the complaints array
  const stats = [
    {
      label: 'Total Complaints',
      value: complaints.length,
      icon: Inbox,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Pending',
      value: complaints.filter(c => c.status === 'pending').length,
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      label: 'In Progress',
      value: complaints.filter(c => c.status === 'in-progress').length,
      icon: AlertCircle,
      color: 'text-blue-500',
      bg: 'bg-blue-50/50',
    },
    {
      label: 'Resolved',
      value: complaints.filter(c => c.status === 'resolved').length,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
            <stat.icon size={28} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-[#001a33]">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;