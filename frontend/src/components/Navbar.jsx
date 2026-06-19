// ==========================================
// 📂 File: src/components/Navbar.jsx
// ==========================================
import { Briefcase, CheckSquare, FolderPlus, Layers, Plus, TrendingUp } from 'lucide-react';

export default function Navbar({ currentTab, setCurrentTab, projectsCount, hasSelectedProject, onNewProject, onNewTicket }) {
  return (
    <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab("dashboard")}>
          <div className="bg-gradient-to-tr from-indigo-500 to-sky-400 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-xl tracking-tight text-white">Mini</span>
              <span className="bg-indigo-500 text-white font-black text-xs px-2 py-0.5 rounded uppercase tracking-wider">Jira</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Developer Sandbox Suite</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80">
          <button 
            onClick={() => setCurrentTab("dashboard")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentTab === "dashboard" 
                ? "bg-slate-800 text-white shadow-inner" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setCurrentTab("projects")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentTab === "projects" 
                ? "bg-slate-800 text-white shadow-inner" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Projects ({projectsCount})</span>
          </button>
          <button 
            onClick={() => setCurrentTab("board")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentTab === "board" 
                ? "bg-slate-800 text-white shadow-inner" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <CheckSquare className="h-4 w-4" />
            <span>Kanban Board</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onNewProject}
            className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all duration-200 shadow-md shadow-indigo-600/10"
          >
            <FolderPlus className="h-4 w-4" />
            <span>New Project</span>
          </button>
          
          {hasSelectedProject && (
            <button 
              onClick={onNewTicket}
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all duration-200 shadow-md shadow-emerald-600/10"
            >
              <Plus className="h-4 w-4" />
              <span>New Ticket</span>
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}