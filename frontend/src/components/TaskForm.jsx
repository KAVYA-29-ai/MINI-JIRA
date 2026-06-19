// ==========================================
// 📂 File: src/components/TaskForm.jsx
// ==========================================
import { X } from 'lucide-react';
import { useState } from 'react';

export default function TaskFormModal({ task, projects, currentProjectId, defaultStatus, onSave, onClose }) {
  const isEdit = !!task;

  const [projectId, setProjectId] = useState(isEdit ? task.projectId : (currentProjectId || projects[0]?.id || ""));
  const [title, setTitle] = useState(isEdit ? task.title : "");
  const [description, setDescription] = useState(isEdit ? task.description : "");
  const [status, setStatus] = useState(isEdit ? task.status : (defaultStatus || "To Do"));
  const [priority, setPriority] = useState(isEdit ? task.priority : "Medium");
  const [assignee, setAssignee] = useState(isEdit ? task.assignee : "");

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!projectId) newErrors.projectId = "Please select a target Project directory";
    if (!title.trim()) newErrors.title = "Ticket Title is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: isEdit ? task.id : undefined,
      taskKey: isEdit ? task.taskKey : undefined,
      projectId,
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      assignee: assignee.trim() || "Unassigned",
      createdAt: isEdit ? task.createdAt : undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-white text-base">
            {isEdit ? `Edit Ticket ${task.taskKey}` : "Create Development Ticket"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Project Directory Target</label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              disabled={isEdit}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer disabled:opacity-50"
            >
              <option value="">Select Target project...</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.key}] {p.name}
                </option>
              ))}
            </select>
            {errors.projectId && <p className="text-[10px] text-rose-400 font-bold">{errors.projectId}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Summary / Title</label>
            <input 
              type="text" 
              placeholder="Short, actionable developer title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {errors.title && <p className="text-[10px] text-rose-400 font-bold">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Priority Tier</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Assignee Name</label>
            <input 
              type="text" 
              placeholder="e.g. Priyesh Sharma"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Description / Specifications</label>
            <textarea 
              rows="4"
              placeholder="Enter technical specifications, links, or acceptance criteria..."
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
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              {isEdit ? "Update Ticket" : "Generate Issue"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}