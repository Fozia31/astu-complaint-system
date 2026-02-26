import React, { useState } from 'react'; // Added useState
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react'; // Added Menu and X icons
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State to handle toggle
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Function to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#003366]/95 backdrop-blur-md border-b border-white/10 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
          <div className="bg-white p-1.5 rounded-lg transition-transform group-hover:scale-110">
            <GraduationCap className="text-[#003366]" size={24} />
          </div>
          <div className="text-white leading-tight">
            <span className="block font-bold tracking-tight text-lg uppercase">ASTU</span>
            <span className="block text-[9px] uppercase tracking-widest font-medium opacity-70">Portal</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" active={isActive('/')}>Home</NavLink>
          <NavLink to="/about" active={isActive('/about')}>About</NavLink>
          
          <div className="h-5 w-px bg-white/20 mx-2" />
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-amber-400 hover:bg-white/5 font-semibold">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#d4a017] hover:bg-[#b88a12] text-white font-bold px-6 shadow-lg shadow-amber-900/20">
                Register
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={cn(
        "absolute top-full left-0 w-full bg-[#003366] border-b border-white/10 transition-all duration-300 ease-in-out md:hidden overflow-hidden",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      )}>
        <div className="flex w-1/2 flex-col p-6 gap-6 items-center text-center">
          <Link to="/" className={cn("text-lg font-medium w-full py-2", isActive('/') ? "text-amber-400" : "text-white")} onClick={closeMenu}>Home</Link>
          <Link to="/about" className={cn("text-lg font-medium w-full py-2", isActive('/about') ? "text-amber-400" : "text-white")} onClick={closeMenu}>About</Link>
          
          <div className="w-full h-px bg-white/10 my-2" />
          
          <Link to="/login" className="w-full" onClick={closeMenu}>
            <Button variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 bg-[#d4a017]">
              Login
            </Button>
          </Link>
          <Link to="/register" className="w-full" onClick={closeMenu}>
            <Button className="w-full bg-[#d4a017] hover:bg-white/10 text-white font-bold">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) => (
  <Link 
    to={to} 
    className={cn(
      "text-sm font-medium transition-all duration-200 relative pb-1",
      active 
        ? "text-amber-400 border-b-2 border-amber-400" 
        : "text-white/80 hover:text-white"
    )}
  >
    {children}
  </Link>
);

export default Header;