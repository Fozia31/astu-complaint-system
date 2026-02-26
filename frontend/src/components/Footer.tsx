import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  ChevronRight, 
  Twitter, 
  Linkedin, 
  Facebook 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#001f3f] text-white/70 pt-16 pb-8 px-6 w-full mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        
        {/* Column 1: Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded">
              <GraduationCap className="text-[#001f3f]" size={20} />
            </div>
            <h4 className="text-base font-bold text-white uppercase tracking-tight leading-tight">
              Adama Science and <br/> Technology University
            </h4>
          </div>
          <p className="text-xs leading-relaxed opacity-60 max-w-xs">
            Dedicated to excellence in education, research, and institutional 
            integrity for the advancement of the ASTU community.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-5 border-l-2 border-amber-400 pl-3 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-[13px] font-medium">
            <li>
              <a href="#" className="hover:text-amber-400 flex items-center gap-2 transition-colors">
                <ChevronRight size={12}/> Student Portal
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 flex items-center gap-2 transition-colors">
                <ChevronRight size={12}/> Staff Portal
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 flex items-center gap-2 transition-colors">
                <ChevronRight size={12}/> ASTU Official Website
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h4 className="text-white font-bold text-sm mb-5 border-l-2 border-amber-400 pl-3 uppercase tracking-wider">
            Contact Support
          </h4>
          <ul className="space-y-4 text-[13px]">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-amber-400 shrink-0" />
              <span>Adama, Ethiopia, P.O. Box 1888</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-amber-400 shrink-0" />
              <a href="mailto:info@astu.edu.et" className="hover:text-white transition-colors">
                info@astu.edu.et
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-amber-400 shrink-0" />
              <span>+251 221 110 000</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Adama Science and Technology University. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Twitter size={14}/> Twitter
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Linkedin size={14}/> Linkedin
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Facebook size={14}/> Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;