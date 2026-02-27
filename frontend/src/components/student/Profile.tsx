import React, { useEffect, useState } from 'react';
import { Camera, Save, Info, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from '@/lib/api';

const ProfilePage = () => {
  // 1. Local State for User Data
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    campusAddress: ''
  });

  // 2. Load User on Mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // Initialize form with existing data
      setFormData({
        department: parsedUser.department || 'Software Engineering',
        campusAddress: parsedUser.campusAddress || ''
      });
    }
  }, []);

  // 3. Handle Form Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Update Backend
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      // Assuming your backend has an endpoint: PUT /api/student/profile
      const response = await api.put('/student/profile', formData);
      
      // Update local storage with new data so sidebar/dashboard update too
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Update failed:", error);
      alert(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-10 text-center text-slate-500">Loading Profile...</div>;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#001a33]">Student Profile</h1>
        <p className="text-slate-500 mt-1">Manage your institutional identity and academic information.</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-12 mb-6">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer">
              <div className="w-40 h-40 rounded-2xl bg-[#eef4ff] overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-[#f1b400] p-2 rounded-lg text-[#001a33] shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </div>
            </div>
            <p className="mt-4 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              ID: {user._id?.slice(-10) || "ASTU/UG/..."}
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Full Name</label>
              <Input value={user.name} readOnly className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-500 cursor-not-allowed" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Institutional Email</label>
              <Input value={user.email} readOnly className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-500 cursor-not-allowed" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Role</label>
              <Input value={user.role} readOnly className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-500 uppercase" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Department</label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Software Engineering">Software Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Campus Address</label>
              <Input 
                name="campusAddress"
                placeholder="Block 502, Room 12" 
                value={formData.campusAddress}
                onChange={handleChange}
                className="h-12 bg-white border-slate-200 rounded-xl font-medium" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-slate-50">
          <Button variant="outline" className="px-8 h-12 rounded-xl font-bold">Cancel</Button>
          <Button 
            onClick={handleUpdateProfile}
            disabled={loading}
            className="px-8 h-12 rounded-xl bg-[#f1b400] hover:bg-[#d9a300] text-[#001a33] font-bold shadow-lg shadow-yellow-500/20 flex gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex gap-4">
        <Info size={20} className="text-blue-600 shrink-0" />
        <p className="text-xs text-slate-500 leading-relaxed">
          Your institutional data is managed according to <strong>ASTU's</strong> academic policies. Fields like Name and Email require Registrar approval to change.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;