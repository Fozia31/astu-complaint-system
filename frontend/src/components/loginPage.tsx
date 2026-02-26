import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Mail, Lock, Eye, GraduationCap, ChevronRight, HelpCircle, Info } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({ email: '', password: '' });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = formState;
        if (email === 'admin@astu.edu.et' && password === 'admin123') navigate('/admin');
        else if (email === 'staff@astu.edu.et' && password === 'staff123') navigate('/staff');
        else navigate('/student');
    };

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

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="email"
                                placeholder="username@gmail.com"
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
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-1.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                value={formState.password}
                                onChange={(e) => setFormState({...formState, password: e.target.value})}
                            />
                            <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer" size={18} />
                        </div>
                    </div>

                    {/* <div className="flex items-center gap-2 ml-1">
                        <input type="checkbox" id="keep-logged" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="keep-logged" className="text-sm text-slate-500 font-medium">Keep me logged in</label>
                    </div> */}

                    <button 
                        type="submit"
                        className="w-full bg-[#2d4bbd] hover:bg-[#253da1] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
                    >
                        Login <ChevronRight size={15} />
                    </button>
                </form>

                <p className="text-center mt-2 text-sm text-slate-500">Don't have an account? <a href="/register" className="text-blue-600 hover:text-blue-700 font-bold">Sign up</a></p>

                {/* <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center gap-6 text-[11px] font-bold text-slate-400">
                    <span className="flex items-center gap-1.5 cursor-pointer hover:text-slate-600 uppercase tracking-tighter">
                        <HelpCircle size={14}/> Support Center
                    </span>
                    <span className="flex items-center gap-1.5 cursor-pointer hover:text-slate-600 uppercase tracking-tighter">
                        <Info size={14}/> Portal Guide
                    </span>
                </div> */}
            </div>

            {/* <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                <a href="#" className="hover:text-blue-600 transition-colors">ASTU Website</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Student Mail</a>
            </div> */}
        </div>
    );
};

export default LoginPage;