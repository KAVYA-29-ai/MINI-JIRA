// ==========================================
// 📂 File: src/pages/Dashboard.jsx
// ==========================================
import { Activity, Briefcase, CheckCircle, Clock, ChevronRight, FolderPlus, Layers, TrendingUp } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

export default function DashboardPage({ projects, tasks, onSelectProject, onAddProject, onEditProject, onDeleteProject }) {
  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter(t => t.status === "In Progress").length;
  const doneCount = tasks.filter(t => t.status === "Done").length;
  const todoCount = tasks.filter(t => t.status === "To Do").length;

  const completionRate = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;
  const recentTasks = [...tasks].sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-500/20">Mini Jira Control Deck</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Project Workspaces Hub</h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Keep track of ongoing team operations, tasks execution statuses, and key metrics in one single pane.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onAddProject}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl transition duration-150 text-sm"
          >
            <FolderPlus className="h-4 w-4" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* Analytics Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Tickets</p>
            <h3 className="text-3xl font-black text-white">{totalTasks}</h3>
          </div>
          <div className="bg-slate-800 p-3 rounded-xl text-indigo-400">
            <Layers className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">To Do</p>
            <h3 className="text-3xl font-black text-amber-500">{todoCount}</h3>
          </div>
          <div className="bg-amber-500/10 p-3 rounded-xl text-amber-500">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">In Progress</p>
            <h3 className="text-3xl font-black text-sky-400">{inProgressCount}</h3>
          </div>
          <div className="bg-sky-500/10 p-3 rounded-xl text-sky-400">
            <Activity className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Done</p>
            <h3 className="text-3xl font-black text-emerald-400">{doneCount}</h3>
          </div>
          <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Progress & Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-400" />
              Completion Rate
            </h2>
            <p className="text-xs text-slate-400 mt-1">Calculated based on closed vs active tickets.</p>
          </div>
          
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32">
                <circle className="text-slate-800" strokeWidth="8" stroke="currentColor" fill="transparent" r="54" cx="64" cy="64"/>
                <circle className="text-indigo-500 transition-all duration-500 ease-out" strokeWidth="8" strokeDasharray={339.2} strokeDashoffset={339.2 - (339.2 * completionRate) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="54" cx="64" cy="64" transform="rotate(-90 64 64)"/>
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-black text-white">{completionRate}%</span>
                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Done</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-400" />
              Recent Workspace Activity
            </h2>
          </div>

          <div className="divide-y divide-slate-800/60 my-4 max-h-[220px] overflow-y-auto pr-1">
            {recentTasks.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-sm">
                No recent tickets created. Once you add issues, they'll show up here!
              </div>
            ) : (
              recentTasks.map(t => {
                const proj = projects.find(p => p.id === t.projectId);
                return (
                  <div key={t.id} className="py-3 flex items-center justify-between group hover:bg-slate-950/20 px-1 rounded transition duration-150">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-mono bg-slate-800 text-indigo-400 px-2 py-0.5 rounded font-bold">
                          {t.taskKey}
                        </span>
                        <h4 className="text-xs text-slate-200 font-bold group-hover:text-indigo-400 transition truncate max-w-[200px] sm:max-w-xs">
                          {t.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400">Project: <span className="text-slate-300 font-medium">{proj ? proj.name : 'Unknown'}</span> | Assg: {t.assignee || 'Unassigned'}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        t.status === "Done" ? "bg-emerald-500/10 text-emerald-400" :
                        t.status === "In Progress" ? "bg-sky-500/10 text-sky-400" :
                        "bg-slate-800 text-slate-400"
                      }`}>
                        {t.status}
                      </span>
                      <button 
                        onClick={() => onSelectProject(t.projectId)}
                        className="text-slate-500 hover:text-white p-1"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Projects List Overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Workspaces & Project Catalogs ({projects.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(p => (
            <ProjectCard 
              key={p.id}
              project={p}
              projectTasks={tasks.filter(t => t.projectId === p.id)}
              onSelectProject={onSelectProject}
              onEditProject={onEditProject}
              onDeleteProject={onDeleteProject}
            />
          ))}
        </div>
      </div>
    </div>
  );
}