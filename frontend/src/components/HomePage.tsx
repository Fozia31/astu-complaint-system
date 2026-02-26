import React from 'react';
import { 
  FileText, 
  BarChart3, 
  Bot, 
  MapPin, 
  Mail, 
  Phone, 
  ChevronRight, 
  GraduationCap 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from './Header';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">

      <Header/>
      <header className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            alt="ASTU Campus" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-[#003366]/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight">
            ASTU Digital Complaint <br /> 
            <span className="text-amber-400">Management System</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Promoting Transparency and Accountability across our academic community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#d4a017] hover:bg-white/10 text-white px-8 py-6 text-lg rounded-xl" onClick={() => window.location.href = "/login"}>
              Login Here
            </Button>
            <Button size="lg" variant="outline" className="bg-[#d4a017] text-white border-white/30 hover:bg-white/10 px-8 py-6 text-lg rounded-xl" onClick={() => window.location.href = "/register"}>
              Create Account
            </Button>
          </div>
        </div>
      </header>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-3">Our Key Features</h2>
          <div className="w-12 h-1 bg-[#d4a017] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard 
            icon={<FileText size={28}/>} 
            title="Submit Complaint" 
            desc="Voice your concerns securely and easily through our encrypted channel."
          />
          <FeatureCard 
            icon={<BarChart3 size={28}/>} 
            title="Track Status" 
            desc="Monitor progress in real-time with automatic updates."
          />
          <FeatureCard 
            icon={<Bot size={28}/>} 
            title="AI Assistant" 
            desc="Get instant guidance on the resolution process."
          />
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer/>
    </div>
  );
};

// Internal FeatureCard using shadcn/ui Card components
const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <Card className="border-none shadow-sm hover:shadow-md transition-all text-center rounded-[1.5rem] p-4">
    <CardHeader>
      <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-2 mx-auto text-[#003366]">
        {icon}
      </div>
      <CardTitle className="text-lg font-bold text-[#003366]">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
    </CardContent>
  </Card>
);

export default HomePage;