// ==========================================
// 📂 File: src/components/ProjectForm.jsx
// ==========================================
import { X } from 'lucide-react';
import { useState } from 'react';

export default function ProjectFormModal({ project, onSave, onClose }) {
  const isEdit = !!project;
  
  const [name, setName] = useState(isEdit ? project.name : "");
  const [key, setKey] = useState(isEdit ? project.key : "");
  const [description, setDescription] = useState(isEdit ? project.description : "");
  
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = "Project Name is required";
    if (!key.trim()) {
      newErrors.key = "Project Key is required";
    } else if (key.trim().length < 2 || key.trim().length > 5) {
      newErrors.key = "Key must be between 2 to 5 characters";
    } else if (!/^[A-Z0-9]+$/i.test(key)) {
      newErrors.key = "Key must contain alphanumeric characters only";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: isEdit ? project.id : undefined,
      name: name.trim(),
      key: key.trim().toUpperCase(),
      description: description.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-white text-base">
            {isEdit ? "Modify Project Parameters" : "Initiate New Project Directory"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Project Name</label>
            <input 
              type="text" 
              placeholder="e.g. Employee Portal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {errors.name && <p className="text-[10px] text-rose-400 font-bold">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Project Key</label>
              <input 
                type="text" 
                placeholder="e.g. EMP"
                value={key}
                disabled={isEdit}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none uppercase disabled:opacity-50"
              />
              {errors.key && <p className="text-[10px] text-rose-400 font-bold">{errors.key}</p>}
            </div>
            
            <div className="flex flex-col justify-end">
              <p className="text-[10px] text-slate-500 leading-relaxed pb-1">
                Keys help prefix ticket identifiers (e.g., EMP-101). Cannot edit key after directory creation.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 font-medium">Description</label>
            <textarea 
              rows="3"
              placeholder="Provide a general context description for developers bhai ye bana de"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button 
              type="button"
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              {isEdit ? "Update Project" : "Create Workspace"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
