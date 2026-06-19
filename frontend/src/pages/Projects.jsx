import { ChevronRight, Edit3, Trash2 } from 'lucide-react';

export default function ProjectsPage({ projects, tasks, onSelectProject, onEditProject, onDeleteProject }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-white">All Active Workspaces</h1>
        <p className="text-xs text-slate-400 mt-1 font-medium">Direct development workspaces, track issues index, and configure team parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => {
          const pTasks = tasks.filter(t => t.projectId === p.id);
          const completion = pTasks.length > 0 ? Math.round((pTasks.filter(t => t.status === "Done").length / pTasks.length) * 100) : 0;

          return (
            <div key={p.id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-md transition duration-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-950 border border-indigo-900 px-2 py-0.5 rounded">
                    {p.key}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onEditProject(p)}
                      className="p-1.5 hover:text-indigo-400 text-slate-400 hover:bg-slate-800 rounded transition"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteProject(p.id)}
                      className="p-1.5 hover:text-rose-400 text-slate-400 hover:bg-slate-800 rounded transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white truncate">{p.name}</h3>
                  <p className="text-slate-400 text-xs line-clamp-3 mt-1 leading-relaxed">
                    {p.description || "No project description provided."}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Total Tickets: <strong className="text-slate-200">{pTasks.length}</strong></span>
                  <span>{completion}% Complete</span>
                </div>

                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/60">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>

                <button 
                  onClick={() => onSelectProject(p.id)}
                  className="w-full bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 hover:border-transparent text-indigo-400 hover:text-white font-bold py-2 px-4 rounded-xl transition duration-150 text-xs flex items-center justify-center space-x-2"
                >
                  <span>Enter Kanban Workspace</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}