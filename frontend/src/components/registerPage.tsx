import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Hash, 
  ChevronRight, 
  Globe, 
  HelpCircle, 
  Info,
  Lock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const [formState, setFormState] = React.useState({
        fullName: '',
        email: '',
        // studentId: '',
        department: '',
        password: ''
    });
    const navigator = useNavigate();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await api.post('/auth/sign-up', formState);

            if(response.status === 201){
                alert('Registration successful! Please login to your account.');
                navigator('/login')
            }else{
                alert('Registration failed. Please try again.');
            }

        }catch(error){
            console.error("Registration failed:", error);
        }
    }


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 p-4 md:p-12 border border-slate-100">
        
        <div className="text-center mb-5">
          <h1 className="text-3xl font-black text-[#003366] mb-2 tracking-tight">Join ASTU CMS</h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-[280px] mx-auto">
            Create your institutional account to access student services and resources.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3 text-slate-400" size={18} />
              <Input 
                placeholder="John Doe" 
                value={formState.fullName}
                onChange={e => setFormState({...formState, fullName: e.target.value})}
                className="pl-12 py-2 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1"> Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3 text-slate-400" size={18} />
              <Input 
                type="email" 
                value={formState.email}
                onChange={e => setFormState({...formState, email: e.target.value})}
                placeholder="student.name@astu.edu.et" 
                className="pl-12 py-2 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {/* <label className="text-sm font-bold text-slate-700 ml-1">Student ID</label>
              <div className="relative">
                <Hash className="absolute left-4 top-3 text-slate-400" size={18} />
                <Input 
                  value={formState.studentId}
                  onChange={e => setFormState({...formState, studentId: e.target.value})}
                  placeholder="ASTU/1234/14" 
                  className="pl-12 py-2 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all"
                />
              </div> */}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Department</label>
              <input type="text"  
                value={formState.department}
                onChange={e => setFormState({...formState, department: e.target.value})}
                className="pl-12 py-2 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all" placeholder="e.g., Computer Science" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3 text-slate-400" size={18} />
              <Input 
                type="password" 
                value={formState.password}
                onChange={e => setFormState({...formState, password: e.target.value})}
                placeholder="••••••••" 
                className="pl-12 py-2 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all"
              />
            </div>
          </div>

          <Button className="w-1/2 bg-[#1e3a8a] ml-25 hover:bg-[#172554] text-white py-6 rounded-2xl font-bold text-md shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2">
            Create Account <ChevronRight size={18} />
          </Button>
        </form>
          <p className=" ml-20 text-sm text-slate-500 mt-2">Already have an account? <Link to="/login" className='font-bold hover:text-[#172554]'>Login</Link></p>

      </div>

    </div>
  );
};

export default RegisterPage;