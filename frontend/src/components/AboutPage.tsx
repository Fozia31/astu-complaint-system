import React from 'react';
import { 
  Target, 
  Users, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Award,
  BookOpen
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from './Header';
import Footer from './Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />
      
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-6 bg-[#003366]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80" 
            alt="University Campus" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Excellence in <span className="text-amber-400">Innovation</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-light">
            Adama Science and Technology University (ASTU) is dedicated to producing 
            highly qualified graduates and conducting impactful research.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#003366] flex items-center gap-3">
              <Target className="text-amber-500" /> Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed italic border-l-4 border-amber-400 pl-6">
              "Our mission is to support national development goals through advanced science, 
              engineering, and technology education, preparing students to tackle the complex 
              challenges of the 21st century."
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-[#003366] text-sm mb-1">Established</h4>
                <p className="text-2xl font-black text-amber-600 tracking-tighter">1993</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-[#003366] text-sm mb-1">Excellence</h4>
                <p className="text-2xl font-black text-amber-600 tracking-tighter">COE</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" 
              alt="Students Collaborating" 
              className="rounded-[2.5rem] shadow-2xl z-10 relative"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-400/10 rounded-full -z-0 blur-2xl" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#003366] mb-4">The Complaint Management System</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Ensuring transparency and accountability. Our centralized digital portal allows 
              the ASTU community to voice concerns and track resolutions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <ValueCard icon={<Users size={24}/>} label="Student" step="01" />
            <ValueCard icon={<ShieldCheck size={24}/>} label="Department" step="02" />
            <ValueCard icon={<Award size={24}/>} label="Resolution" step="03" />
            <ValueCard icon={<Zap size={24}/>} label="Feedback" step="04" />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <Card className="max-w-3xl mx-auto bg-white border-2 border-dashed border-amber-300 shadow-none rounded-[2rem]">
          <CardContent className="py-12">
            <h3 className="text-2xl font-bold text-[#003366] mb-4">Have a concern that needs attention?</h3>
            <p className="text-slate-500 mb-8 text-sm">Join us in making ASTU a better place for everyone.</p>
            <Button size="lg" className="bg-[#003366] hover:bg-[#002244] text-white px-10 py-6 rounded-xl font-bold gap-2">
              File a New Complaint <ArrowRight size={18} />
            </Button>
          </CardContent>
        </Card>
      </section>
      <Footer/>

    </div>
  );
};

const ValueCard = ({ icon, label, step }: { icon: React.ReactNode, label: string, step: string }) => (
  <div className="group relative bg-white p-8 rounded-3xl border border-slate-200 text-center hover:border-amber-400 hover:shadow-xl hover:shadow-amber-900/5 transition-all">
    <span className="absolute top-4 right-6 text-4xl font-black text-slate-50 opacity-10 group-hover:text-amber-400 group-hover:opacity-20 transition-all">
      {step}
    </span>
    <div className="bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto text-amber-600 group-hover:bg-[#003366] group-hover:text-white transition-colors">
      {icon}
    </div>
    <h4 className="font-bold text-[#003366] uppercase tracking-wider text-xs mb-2">{label}</h4>
    <div className="w-8 h-1 bg-amber-400 mx-auto rounded-full" />
  </div>
);

export default AboutPage;