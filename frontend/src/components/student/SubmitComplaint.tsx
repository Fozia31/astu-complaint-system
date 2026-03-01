import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Upload, Loader2, X, FileText, MessageCircle, Sparkles, Wand2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from '@/lib/api';

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    description: '',
    urgency: 'Normal'
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: "Hello! I'm here to help you draft your complaint. Ask me about university policies or request help phrasing your issue." }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File is too large. Max 5MB allowed.");
        return;
      }
      setFile(selectedFile);
    }
  };

  // --- NEW: AI API Interaction ---
  const handleAskAI = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput("");
    setIsTyping(true);

    try {
      const response = await api.post('/chatbot/ask', { question: userMessage });
      setChatMessages(prev => [...prev, { role: 'ai', content: response.data.data }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'ai', content: "I'm sorry, I'm having trouble connecting to my brain right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('urgency', formData.urgency);
    if (file) data.append('attachments', file);

    try {
      const response = await api.post('/student/complaint', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        alert("Complaint submitted successfully!");
        navigate('/student/my-complaints');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-20">
      <div className={`max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 transition-all duration-300 ${isChatOpen ? 'lg:mr-[450px]' : ''}`}>
        <div className="mb-8 p-4">
          <h1 className="text-3xl font-bold text-[#001a33]">Submit New Complaint</h1>
          <p className="text-slate-500 mt-1">Provide detailed information to help us resolve your issue.</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Subject / Title</label>
              <Input name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Discrepancy in Final Grade" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 outline-none">
                  <option value="Academic">Academic</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Hostel/Dormitory">Hostel/Dormitory</option>
                  <option value="Financial">Financial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Urgency</label>
                <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 outline-none">
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full min-h-[150px] bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none" placeholder="Provide a detailed account..."></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Attachments</label>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.pdf,.doc,.docx" />
              {!file ? (
                <div onClick={() => fileInputRef.current?.click()} className="p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-blue-300 cursor-pointer transition-all group">
                  <Upload size={32} className="group-hover:text-blue-500" />
                  <p className="mt-2 text-sm font-medium text-slate-600">Drag and drop files or <span className="text-orange-600">browse</span></p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-blue-900 truncate max-w-[200px]">{file.name}</p>
                      <p className="text-[10px] text-blue-600">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setFile(null)} className="text-blue-600"><X size={18} /></button>
                </div>
              )}
            </div>

            <Button disabled={loading} type="submit" className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold">
              {loading ? <Loader2 className="animate-spin" /> : "Submit Complaint"}
            </Button>
          </form>
        </div>
      </div>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-8 right-8 w-16 h-16 bg-[#001a33] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50">
          <MessageCircle size={28} />
        </button>
      )}

      {isChatOpen && (
        <div className="fixed top-0 right-0 w-full md:w-[400px] h-screen bg-white shadow-2xl z-[60] flex flex-col animate-in slide-in-from-right">
          <div className="p-6 bg-[#001a33] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="text-orange-500" size={20} />
              <h3 className="font-bold">ASTU AI Assistant</h3>
            </div>
            <button onClick={() => setIsChatOpen(false)}><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-orange-100 text-orange-900 rounded-tr-none' : 'bg-white border rounded-tl-none shadow-sm'}`}>
                  {msg.content}
                  {msg.role === 'ai' && i !== 0 && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setFormData(prev => ({...prev, description: prev.description + "\n\n" + msg.content}))}
                      className="mt-2 text-[10px] h-6 text-orange-600 font-bold p-0 hover:bg-transparent"
                    >
                      <Wand2 size={12} className="mr-1" /> APPEND TO DESCRIPTION
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-slate-400 animate-pulse">Assistant is thinking...</div>}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="relative">
              <Input 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                placeholder="Ask AI for help..." 
                className="pr-10 rounded-xl h-12" 
              />
              <button onClick={handleAskAI} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitComplaint;