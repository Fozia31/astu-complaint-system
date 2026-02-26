import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Mail, Lock, Eye, GraduationCap, ChevronRight, HelpCircle, Info } from 'lucide-react';
import api from '@/lib/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formState, setFormState] = useState({ 
        email: '', 
        password: '' 
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            if(!formState.email || !formState.password){
                alert("Please fill in both email and password fields.");
                return;
            }else if(formState.email === 'admin@astu.edu.et' && formState.password === 'admin123'){
                alert("Admin login successful! Redirecting to admin dashboard...");
                navigate('/admin/dashboard');
                return;
             }else if(formState.email === 'staff@astu.edu.et' && formState.password === 'staff123'){
                alert("Staff login successful! Redirecting to staff dashboard...");
                navigate('/staff/dashboard');
                return;
             }
            const res = await api.post('/auth/login', formState);

            if(res.status === 200){
                
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                alert("Login successful!");
                navigate('/student/dashboard');
                // setFormState({ email: '', password: '' });
            }else{
                alert("Login failed. Please check your credentials and try again.");
                return;
                
             }

            }catch(error: any){
                console.error("Login failed:", error);
                const serverMessage = error.response?.data?.message || "Invalid credentials or server error.";
                alert(`Login failed: ${serverMessage}`);

        }
    }


    return (
        <div className="min-h-screen w-full bg-[#f0f4f9] flex flex-col items-center justify-center p-4 font-sans">
            
            <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-2xl shadow-blue-900/5 p-4 md:p-12">
                
                <div className="flex flex-col items-center text-center mb-7">
                    <div className="w-16 h-8 bg-[#eef4ff] rounded-full flex items-center justify-center mb-2">
                        <GraduationCap size={32} className="text-[#2d4bbd]" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-800">Welcome Back To ASTU CMS</h1>
                    <p className="text-[8px] text-slate-400 mt-1 uppercase tracking-widest font-semibold">
                        Adama Science and Technology University
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="email"
                                placeholder="username@gmail.com"
                                required
                                className="w-full pl-12 pr-4 py-1.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                value={formState.email}
                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2 ml-1">
                            <label className="text-xs font-bold text-slate-700">Password</label>
                            <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot password?</button>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                className="w-full pl-12 pr-12 py-1.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                value={formState.password}
                                onChange={(e) => setFormState({...formState, password: e.target.value})}
                            />
                            <Eye onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer" size={18} />
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[#2d4bbd] hover:bg-[#253da1] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
                    >
                        Login <ChevronRight size={15} />
                    </button>
                </form>
                <p className="text-center mt-2 text-sm text-slate-500">Don't have an account? <a href="/register" className="text-blue-600 hover:text-blue-700 font-bold">Sign up</a></p>
            </div>
        </div>
    );
};

export default LoginPage;