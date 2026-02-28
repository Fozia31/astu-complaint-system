import React, { useEffect, useState } from 'react';
import { 
  Search, Filter, UserCog, Trash2, 
  MoreVertical, Mail, Shield, Loader2,
  ChevronLeft, ChevronRight, UserPlus
} from 'lucide-react';
import api from '@/lib/api';

const StudentsList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      // Assuming your backend returns { data: [...] }
      setUsers(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u: any) => u._id !== id));
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter((u: any) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#001a33]">Student Management</h1>
          <p className="text-slate-500 text-sm">Manage user roles and system access.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#f1b400] text-[#001a33] px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-[#e0a600] transition-all">
          <UserPlus size={18} /> Add New User
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 h-11 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          <select className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none">
            <option>All Roles</option>
            <option>Student</option>
            <option>Admin</option>
          </select>
          <button className="h-11 px-4 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 border-dashed">
            <Filter size={18} /> More Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={32} />
            <p className="text-slate-500 text-sm font-medium">Loading user directory...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Email Address</th>
                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.map((user: any) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {user.name.split(' ').map((n:any) => n[0]).join('')}
                          </div>
                          <span className="font-bold text-[#001a33] text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Mail size={14} className="text-slate-300" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                          user.role === 'admin' 
                          ? 'bg-purple-50 text-purple-600 border-purple-100' 
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            title="Edit Role"
                            className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all"
                          >
                            <UserCog size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(user._id)}
                            title="Delete User"
                            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Mockup */}
            <div className="p-5 border-t border-slate-50 flex items-center justify-between">
              <p className="text-xs text-slate-400 font-medium">
                Showing <span className="text-[#001a33] font-bold">{filteredUsers.length}</span> users
              </p>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#f1b400] text-[#001a33] font-bold text-xs">1</button>
                <button className="w-8 h-8 rounded-lg hover:bg-slate-50 text-slate-600 font-bold text-xs">2</button>
                <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentsList;