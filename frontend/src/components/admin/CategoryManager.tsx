import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Tag, Loader2 } from 'lucide-react';
import api from '@/lib/api';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    const res = await api.get('/categories');
    setCategories(res.data.data || res.data);
  };

  const handleAdd = async () => {
    if(!newCat) return;
    setLoading(true);
    await api.post('/categories', { name: newCat });
    setNewCat('');
    fetchCategories();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if(confirm("Delete category?")) {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[#001a33] mb-8">System Categories</h1>
      
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm mb-8 flex gap-3">
        <input 
          value={newCat} 
          onChange={(e)=>setNewCat(e.target.value)}
          placeholder="New Category Name (e.g. Facilities)" 
          className="flex-1 px-5 h-12 bg-slate-50 border-none rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-blue-500/20" 
        />
        <button 
          onClick={handleAdd}
          disabled={loading}
          className="bg-[#001a33] text-white px-8 rounded-2xl font-bold text-sm hover:bg-blue-900 transition-all flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat: any) => (
          <div key={cat._id} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Tag size={20} />
              </div>
              <span className="font-bold text-slate-700">{cat.name}</span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-slate-400 hover:text-blue-600"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(cat._id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;