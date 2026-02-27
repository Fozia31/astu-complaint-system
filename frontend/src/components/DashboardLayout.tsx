import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { sidebarConfig } from '@/config/sideBarConfig';
import type { Role } from '@/config/sideBarConfig';
import { 
  Bell, LogOut, GraduationCap, ChevronDown, 
  MessageSquare, Menu, X 
} from 'lucide-react';

const DashboardLayout = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const rawData = localStorage.getItem('user');
    if (rawData && rawData !== "undefined" && rawData !== "null") {
      try { return JSON.parse(rawData); } catch (e) { return null; }
    }
    return null;
  });

  useEffect(() => {
    const checkAuth = () => {
      const rawData = localStorage.getItem('user');
      if (!rawData || rawData === "undefined") {
        navigate('/login', { replace: true });
      }
    };
    const timer = setTimeout(checkAuth, 50);
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const userRole = (user.role as Role) || 'student';
  const currentMenu = sidebarConfig[userRole] || sidebarConfig['student'];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; 
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-64 bg-[#003366] text-white flex flex-col 
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        shadow-2xl lg:shadow-none
      `}>
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
              <GraduationCap className="text-[#003366]" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight uppercase tracking-tighter">ASTU Portal</h1>
              <p className="text-[10px] text-slate-300">ADAMA SCIENCE & TECH</p>
            </div>
          </div>
          {/* Close button for mobile only */}
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-3 mt-6 space-y-1 overflow-y-auto">
          {currentMenu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium group ${
                  isActive 
                  ? 'bg-[#f1b400] text-[#001a33] shadow-lg' 
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-[#001a33]' : 'group-hover:text-[#f1b400]'} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-red-500 hover:text-white text-white rounded-xl transition-all text-sm font-bold"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all">
        
        <header className="h-16 bg-[#003366] text-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Academic Year 2023/24</p>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex gap-2 md:gap-4 border-r border-white/10 pr-3 md:pr-6">
              <Bell size={19} className="text-slate-300 cursor-pointer hover:text-[#f1b400]" />
              <MessageSquare size={19} className="hidden sm:block text-slate-300 cursor-pointer hover:text-[#f1b400]" />
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 pl-1">
              <div className="text-right hidden xs:block">
                <p className="text-xs md:text-sm font-bold leading-none mb-1 line-clamp-1">{user.name.split(' ')[0]}</p>
                <p className="text-[10px] text-[#f1b400] font-bold uppercase tracking-wider">{user.role}</p>
              </div>
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-[#f1b400] to-yellow-200 p-[1px] md:p-[2px] shrink-0">
                <div className="w-full h-full rounded-[10px] bg-white overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 lg:p-10 flex-1 min-h-[calc(100vh-64px)] overflow-x-hidden">
          <Outlet context={{ user }} /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;