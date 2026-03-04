import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  ChevronRight, 
  Lock,
  Building2,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from '@/lib/api';

const RegisterPage = () => {
    const [formState, setFormState] = React.useState({
        name: '',
        email: '',
        department: '',
        password: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/auth/sign-up', formState);
            if(response.status === 201){
                alert('Registration successful! Please login to your account.');
                navigate('/login');
            }
        } catch(error) {
            console.error("Registration failed:", error);
            alert('Registration failed. Please check your details.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-6 font-sans">
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-100 blur-3xl" />
            </div>

            <div className="w-full max-w-[480px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,51,102,0.05)] p-8 md:p-12 border border-slate-100">
                
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-10 rounded-2xl bg-blue-50 mb-4 text-[#1e3a8a]">
                        <GraduationCap size={32} className="text-[#2d4bbd]" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#001a33] tracking-tight">Create Account</h1>
                    <p className="text-slate-500 mt-2 text-sm">
                        Join the <span className="font-semibold text-blue-600">ASTU CMS</span> community today.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-slate-700 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <Input 
                                placeholder="Abebe Bikila" 
                                value={formState.name}
                                onChange={e => setFormState({...formState, name: e.target.value})}
                                className="pl-12 h-10 bg-slate-50/50 border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-none ring-1 ring-slate-200"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-slate-700 ml-1">University Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <Input 
                                type="email" 
                                placeholder="name@astu.edu.et" 
                                value={formState.email}
                                onChange={e => setFormState({...formState, email: e.target.value})}
                                className="pl-12 h-10 bg-slate-50/50 border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-none ring-1 ring-slate-200"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-slate-700 ml-1">Department</label>
                        <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <Input 
                                placeholder="e.g. Software Engineering" 
                                value={formState.department}
                                onChange={e => setFormState({...formState, department: e.target.value})}
                                className="pl-12 h-10 bg-slate-50/50 border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-none ring-1 ring-slate-200"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-slate-700 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <Input 
                                type="password" 
                                placeholder="••••••••" 
                                value={formState.password}
                                onChange={e => setFormState({...formState, password: e.target.value})}
                                className="pl-12 h-10 bg-slate-50/50 border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all border-none ring-1 ring-slate-200"
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-[#1e3a8a] hover:bg-[#162d6d] text-white h-11 rounded-2xl font-bold text-base shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? "Creating Account..." : "Sign Up"}
                        {!isLoading && <ChevronRight size={19} />}
                    </Button>
                </form>

                <div className="mt-3 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#1e3a8a] font-bold hover:underline underline-offset-4">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;