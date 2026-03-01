import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Tag, Loader2, X, AlignLeft, Edit2, Check } from 'lucide-react';
import api from '@/lib/api';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // NEW: State for Editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setFetchLoading(true);
      const res = await api.get('/categories');
      setCategories(res.data.data || res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newCat.name.trim()) return;
    setLoading(true);
    try {
      const response = await api.post('/categories', { 
        name: newCat.name.trim(),
        description: newCat.description.trim() 
      });
      const createdCategory = response.data.data || response.data;
      setCategories((prev) => [...prev, createdCategory]);
      setNewCat({ name: '', description: '' });
      setShowForm(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  // NEW: Handle Update
  const handleUpdate = async (id: string) => {
    if (!editForm.name.trim()) return;
    setLoading(true);
    try {
      const response = await api.put(`/categories/${id}`, {
        name: editForm.name.trim(),
        description: editForm.description.trim()
      });
      const updatedCategory = response.data.data || response.data;
      
      setCategories((prev) => 
        prev.map((cat: any) => (cat._id === id ? updatedCategory : cat))
      );
      setEditingId(null); // Exit edit mode
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete category? This might affect existing complaints.")) {
      try {
        await api.delete(`/categories/${id}`);
        setCategories(categories.filter((c: any) => c._id !== id));
      } catch (err) {
        alert("Failed to delete category");
      }
    }
  };

  // Helper to start editing
  const startEditing = (category: any) => {
    setEditingId(category._id);
    setEditForm({ name: category.name, description: category.description || '' });
  };

  return (
    <div className="max-w-4xl p-6 mx-auto animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#001a33]">Complaint Categories</h1>
          <p className="text-slate-500 text-sm mt-1">Manage types of student grievances.</p>
        </div>
        
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null); // Close edit mode if adding new
          }}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm ${
            showForm ? 'bg-red-50 text-red-600' : 'bg-[#001a33] text-white'
          }`}
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? 'Close' : 'Add New Category'}
        </button>
      </div>
      
      {/* CREATION FORM */}
      {showForm && (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-blue-50 shadow-xl mb-10 animate-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-blue-600 rounded-full" />
            New Category Details
          </h2>
          <div className="space-y-4">
            <input 
              value={newCat.name} 
              onChange={(e) => setNewCat({...newCat, name: e.target.value})}
              placeholder="Category Name" 
              className="w-full px-5 h-14 bg-slate-50 border-2 border-transparent rounded-2xl outline-none font-bold focus:border-blue-500/20 focus:bg-white transition-all" 
            />
            <textarea 
              value={newCat.description} 
              onChange={(e) => setNewCat({...newCat, description: e.target.value})}
              placeholder="Description" 
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none font-bold focus:border-blue-500/20 focus:bg-white transition-all min-h-[100px]" 
            />
            <button 
              onClick={handleAdd}
              disabled={loading || !newCat.name.trim()}
              className="bg-blue-600 text-white px-10 h-14 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />} 
              Save Category
            </button>
          </div>
        </div>
      )}

      <hr className="border-slate-100 mb-8" />

      {/* CATEGORY LIST GRID */}
      {fetchLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat: any) => (
            <div key={cat._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 group hover:border-blue-400 transition-all shadow-sm">
              {editingId === cat._id ? (
                /* EDIT MODE UI */
                <div className="space-y-3 animate-in fade-in duration-300">
                  <input 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl outline-none font-bold"
                  />
                  <textarea 
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl outline-none text-sm min-h-[80px]"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleUpdate(cat._id)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-1"
                    >
                      <Check size={16} /> Save
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl font-bold text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* NORMAL VIEW UI */
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Tag size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{cat.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{cat.description || "No description provided."}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEditing(cat)} className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(cat._id)} className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryManager;