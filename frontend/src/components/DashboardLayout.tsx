import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { sidebarConfig, type Role } from '@/config/sideBarConfig';
import { Bell, LogOut, GraduationCap, Menu, X, Loader2 } from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = () => {
      const rawData = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (rawData && token && rawData !== "undefined" && rawData !== "null") {
        try {
          const parsedUser = JSON.parse(rawData);
          
          if (parsedUser && parsedUser.role) {
            const currentPathRole = location.pathname.split('/')[1]; 
            
            if (currentPathRole !== parsedUser.role) {
                navigate(`/${parsedUser.role}/dashboard`, { replace: true });
            }
            
            setUser(parsedUser);
          } else {
            throw new Error("Invalid user data");
          }
        } catch (e) {
          console.error("Auth Error:", e);
          localStorage.clear();
          navigate('/login', { replace: true });
        }
      }
      
      setTimeout(() => {
        setIsInitializing(false);
      }, 100);
    };

    checkAuth();
  }, [location.pathname, navigate]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#003366]" size={40} />
          <p className="text-slate-500 animate-pulse text-sm font-medium">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = (user.role as Role) || 'student';
  const currentMenu = sidebarConfig[userRole] || sidebarConfig['student'];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-[70] w-64 bg-[#003366] text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-[#f1b400]" size={32} />
            <h1 className="font-bold text-sm tracking-tight">ASTU Complain Tracker</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 mt-6 space-y-1 overflow-y-auto custom-scrollbar">
          {currentMenu.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-[#f1b400] text-[#003366] shadow-md' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-[#003366]' : 'text-slate-400 group-hover:text-white'} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 font-semibold text-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-[#003366]">
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex flex-col items-end">
              <p className="text-sm font-bold text-[#003366] leading-none">{user?.name}</p>
              <p className="text-[10px] text-[#f1b400] font-black uppercase tracking-tighter mt-1">
                {user?.role} Account
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#003366] font-bold ring-2 ring-[#f1b400]/20">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-10 flex-1">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;