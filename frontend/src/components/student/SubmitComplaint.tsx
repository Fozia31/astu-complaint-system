import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Upload, Loader2, X, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from '@/lib/api';

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    description: '',
    urgency: 'Normal'
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // CRITICAL: Use FormData for file uploads
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('urgency', formData.urgency);
    
    if (file) {
      // Ensure the key 'attachments' matches your backend: upload.single('attachments')
      data.append('attachments', file);
    }

    try {
      const response = await api.post('/student/complaints', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert("Complaint submitted successfully!");
        navigate('/student/my-complaints');
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(error.response?.data?.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#001a33]">Submit New Complaint</h1>
        <p className="text-slate-500 mt-1">Please provide detailed information to help us resolve your issue.</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Subject / Title</label>
            <Input 
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Brief title of your complaint" 
              className="h-12 bg-slate-50 border-slate-200 rounded-xl" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 font-medium outline-none focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="Academic">Academic</option>
                <option value="Facilities">Facilities</option>
                <option value="Hostel/Dormitory">Hostel/Dormitory</option>
                <option value="Financial">Financial</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Urgency</label>
              <select 
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 font-medium outline-none focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full min-h-[150px] bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
              placeholder="Explain your issue in detail..."
            ></textarea>
          </div>

          {/* Functional File Upload UI */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#001a33] uppercase tracking-wider">Supporting Documents</label>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              accept="image/*,.pdf,.doc,.docx"
            />
            
            {!file ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer group"
              >
                <Upload size={32} className="group-hover:text-blue-500 transition-colors" />
                <p className="mt-2 text-sm font-medium">Click to upload documents or images</p>
                <p className="text-[10px] mt-1 text-slate-300">Maximum file size: 5MB</p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg text-white">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-900 truncate max-w-[200px]">{file.name}</p>
                    <p className="text-[10px] text-blue-600">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setFile(null)}
                  className="p-1 hover:bg-blue-200 rounded-full text-blue-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          <div className="pt-4">
            <Button 
              disabled={loading}
              type="submit"
              className="w-full h-14 bg-[#f1b400] hover:bg-[#d9a300] text-[#001a33] rounded-2xl font-extrabold text-base shadow-lg shadow-yellow-500/20 flex gap-2 disabled:opacity-70 transition-transform active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitComplaint;