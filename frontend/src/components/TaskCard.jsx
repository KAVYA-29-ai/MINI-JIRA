// ==========================================
// 📂 File: src/components/TaskCard.jsx
// ==========================================
import { Edit3, Trash2 } from 'lucide-react';

export default function TaskCard({ task, onDragStart, onEdit, onDelete, onStatusChange }) {
  const priorityStyles = {
    High: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Low: "bg-slate-800 text-slate-400 border-slate-700/50"
  };

  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-slate-950 border border-slate-800 hover:border-slate-750 p-4 rounded-xl space-y-3 cursor-grab active:cursor-grabbing hover:shadow-md transition duration-150 group"
    >
      {/* Header Info */}
      <div className="flex justify-between items-start gap-2">
        <span className="text-[10px] font-mono font-bold bg-slate-900 border border-slate-850 text-indigo-400 px-2 py-0.5 rounded">
          {task.taskKey}
        </span>
        
        {/* Action controls */}
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition duration-150">
          <button 
            onClick={() => onEdit(task)}
            className="p-1 hover:text-indigo-400 text-slate-500 hover:bg-slate-900 rounded"
            title="Edit ticket"
          >
            <Edit3 className="h-3 w-3" />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-1 hover:text-rose-400 text-slate-500 hover:bg-slate-900 rounded"
            title="Delete ticket"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Title & Body description */}
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-slate-100 leading-snug hover:text-indigo-400 transition cursor-pointer" onClick={() => onEdit(task)}>
          {task.title}
        </h4>
        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
          {task.description || "No description provided for this issue."}
        </p>
      </div>

      {/* Footer Details */}
      <div className="border-t border-slate-900/80 pt-3 mt-1 flex flex-wrap gap-2 items-center justify-between">
        
        {/* Assignee pill */}
        <div className="flex items-center space-x-1 text-slate-300">
          <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[8px] font-bold">
            {task.assignee ? task.assignee.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="text-[10px] font-medium max-w-[80px] truncate">
            {task.assignee || "Unassigned"}
          </span>
        </div>

        {/* Priority and interactive Status drop */}
        <div className="flex items-center space-x-1.5">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${priorityStyles[task.priority] || priorityStyles.Low}`}>
            {task.priority}
          </span>
          
          <select 
            value={task.status} 
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="bg-slate-900 border border-slate-800 text-[9px] text-slate-300 font-bold rounded px-1 py-0.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none cursor-pointer"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

      </div>

    </div>
  );
}