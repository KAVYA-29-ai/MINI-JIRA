// ==========================================
// 📂 File: src/components/ProjectCard.jsx
// ==========================================
import { ChevronRight, Edit3, Trash2 } from 'lucide-react';

export default function ProjectCard({ project, projectTasks, onSelectProject, onEditProject, onDeleteProject }) {
  const todo = projectTasks.filter(t => t.status === "To Do").length;
  const inProgress = projectTasks.filter(t => t.status === "In Progress").length;
  const done = projectTasks.filter(t => t.status === "Done").length;

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between shadow-md hover:shadow-indigo-500/[0.02] transition-all duration-300 group">
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-900 px-2 py-1 rounded font-mono">
            {project.key}
          </span>
          
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition duration-150">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEditProject(project);
              }}
              className="p-1 hover:text-indigo-400 text-slate-500 hover:bg-slate-850 rounded"
              title="Edit Project"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDeleteProject(project.id);
              }}
              className="p-1 hover:text-rose-400 text-slate-500 hover:bg-slate-850 rounded"
              title="Delete Project"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition duration-150 truncate">
          {project.name}
        </h3>
        <p className="text-xs text-slate-400 mt-2 line-clamp-2 h-8">
          {project.description || "No project description specified yet."}
        </p>
      </div>

      <div className="border-t border-slate-800/60 pt-4 mt-4 space-y-4">
        {/* Status pills summary */}
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
          <div className="bg-slate-950/80 p-1.5 rounded border border-slate-800/30">
            <p className="text-amber-500">{todo}</p>
            <p className="text-slate-500 mt-0.5">To Do</p>
          </div>
          <div className="bg-slate-950/80 p-1.5 rounded border border-slate-800/30">
            <p className="text-sky-400">{inProgress}</p>
            <p className="text-slate-500 mt-0.5">Active</p>
          </div>
          <div className="bg-slate-950/80 p-1.5 rounded border border-slate-800/30">
            <p className="text-emerald-400">{done}</p>
            <p className="text-slate-500 mt-0.5">Done</p>
          </div>
        </div>

        {/* Actions Bar */}
        <button 
          onClick={() => onSelectProject(project.id)}
          className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-indigo-650 hover:text-white text-slate-300 font-bold py-2 px-4 rounded-xl transition duration-150 text-xs"
        >
          <span>Open Kanban Board</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}