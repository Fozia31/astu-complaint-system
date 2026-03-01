import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Loader2, AlertCircle, UserPlus } from 'lucide-react';
import api from '@/lib/api';
// IMPORT the Modal component
import AssignStaffModal from './AssignStaffModal';

const AdminComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [error, setError] = useState<string | null>(null);

  // MODAL STATE
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/complaints');
      setComplaints(response.data.complaints || []);
    } catch (error: any) {
      console.error("Error fetching admin complaints:", error);
      setError("Failed to load grievances. Please check your admin permissions.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await api.delete(`/admin/complaints/${id}`);
      fetchComplaints();
    } catch (error) {
      alert("Error deleting complaint");
    }
  };

  // OPEN MODAL HANDLER
  const handleOpenAssign = (complaint: any) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  // SUCCESS HANDLER (Updates UI locally without full reload)
  const onUpdateSuccess = (updatedComplaint: any) => {
    setComplaints((prev: any) =>
      prev.map((c: any) => (c._id === updatedComplaint._id ? updatedComplaint : c))
    );
  };

  const filtered = complaints.filter((c: any) => {
    const matchesSearch =
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.student?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All Statuses' ||
      c.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-[#003366]" size={40} />
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-[#001a33]">Student Grievances</h1>
        {error && <span className="text-red-500 text-sm flex items-center gap-1"><AlertCircle size={14} /> {error}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm outline-none font-medium"
        >
          <option value="All Statuses">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="in-progress">In Progress</option>
        </select>

        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            placeholder="Search by student name, email or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 h-11 bg-white border border-slate-200 rounded-xl text-sm outline-none"
          />
        </div>
        <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl border border-orange-100 font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange-100 transition-all">
          <Calendar size={16} /> Export
        </button>
      </div>

      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned To</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length > 0 ? filtered.map((item: any) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-700">{item.student?.name || 'Unknown'}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.student?.email}</p>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600 font-medium">{item.title}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${item.assignedTo?.name ? 'text-slate-700 font-semibold' : 'text-slate-300 italic'}`}>
                        {item.assignedTo?.name || "Unassigned"}
                      </span>
                      {/* ASSIGN ICON BUTTON */}
                      <button 
                        onClick={() => handleOpenAssign(item)}
                        className="p-1.5 hover:bg-violet-50 text-violet-500 rounded-lg transition-colors"
                        title="Assign Staff"
                      >
                        <UserPlus size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      item.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                      item.status === 'resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-400 font-bold">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin/complaints/${item._id}`)}
                      className="text-orange-600 text-[10px] font-black uppercase hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 text-[10px] font-black uppercase hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 text-sm italic">
                    No complaints found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RENDER MODAL CONDITIONALLY */}
      {selectedComplaint && (
        <AssignStaffModal
          isOpen={isModalOpen}
          complaint={selectedComplaint}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedComplaint(null);
          }}
          onUpdateSuccess={onUpdateSuccess}
        />
      )}
    </div>
  );
};

export default AdminComplaints;