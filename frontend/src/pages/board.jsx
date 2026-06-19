import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import TaskCard from '../components/TaskCard';

export default function BoardPage({ 
  projects, 
  tasks, 
  selectedProjectId, 
  setSelectedProjectId,
  onUpdateTaskStatus,
  onEditTask,
  onDeleteTask,
  onCreateTaskAtStatus,
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  assigneeFilter,
  setAssigneeFilter,
  uniqueAssignees
}) {

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || projects[0] || null;
  }, [projects, selectedProjectId]);

  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain") || draggedTaskId;
    if (taskId) {
      onUpdateTaskStatus(taskId, targetStatus);
    }
    setDraggedTaskId(null);
  };

  const filteredTasks = useMemo(() => {
    if (!activeProject) return [];
    
    return tasks.filter(t => {
      if (t.projectId !== activeProject.id) return false;

      const q = searchQuery.toLowerCase().trim();
      const matchQuery = q === "" || 
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.taskKey.toLowerCase().includes(q) ||
        (t.assignee && t.assignee.toLowerCase().includes(q));

      const matchPriority = priorityFilter === "All" || t.priority === priorityFilter;
      const matchAssignee = assigneeFilter === "All" || t.assignee === assigneeFilter;

      return matchQuery && matchPriority && matchAssignee;
    });
  }, [tasks, activeProject, searchQuery, priorityFilter, assigneeFilter]);

  const todoTasks = filteredTasks.filter(t => t.status === "To Do");
  const inProgressTasks = filteredTasks.filter(t => t.status === "In Progress");
  const doneTasks = filteredTasks.filter(t => t.status === "Done");

  const clearAllFilters = () => {
    setSearchQuery("");
    setPriorityFilter("All");
    setAssigneeFilter("All");
  };

  const hasActiveFilters = searchQuery !== "" || priorityFilter !== "All" || assigneeFilter !== "All";

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Panel with Project Switcher */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div className="space-y-1">
          <p className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider">Active Workspace</p>
          <div className="flex items-center space-x-3">
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-100 font-extrabold text-lg sm:text-xl rounded-xl py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.key}] {p.name}
                </option>
              ))}
            </select>
          </div>
          {activeProject && (
            <p className="text-slate-400 text-xs max-w-xl line-clamp-1 mt-1.5">
              {activeProject.description || "No project description provided."}
            </p>
          )}
        </div>

        {activeProject && (
          <button 
            onClick={() => onCreateTaskAtStatus("To Do")}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md"
          >
            <Plus className="h-4 w-4" />
            <span>Create Ticket</span>
          </button>
        )}
      </div>

      {/* Render modular SearchBar component */}
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        assigneeFilter={assigneeFilter}
        setAssigneeFilter={setAssigneeFilter}
        uniqueAssignees={uniqueAssignees}
        clearFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLUMN: TO DO */}
        <div 
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[500px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "To Do")}
        >
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800/60">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h3 className="font-bold text-slate-100 text-sm">To Do</h3>
              <span className="bg-slate-950 border border-slate-800 text-[10px] text-slate-400 px-2 py-0.5 rounded-full font-bold">
                {todoTasks.length}
              </span>
            </div>
            
            <button 
              onClick={() => onCreateTaskAtStatus("To Do")}
              className="p-1 hover:bg-slate-800 text-slate-500 hover:text-slate-200 rounded transition"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[600px] pr-1">
            {todoTasks.length === 0 ? (
              <EmptyColumnPlaceholder status="To Do" onClick={() => onCreateTaskAtStatus("To Do")} />
            ) : (
              todoTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onDragStart={handleDragStart}
                  onEdit={onEditTask} 
                  onDelete={onDeleteTask}
                  onStatusChange={onUpdateTaskStatus}
                />
              ))
            )}
          </div>
        </div>

        {/* COLUMN: IN PROGRESS */}
        <div 
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[500px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "In Progress")}
        >
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800/60">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <h3 className="font-bold text-slate-100 text-sm">In Progress</h3>
              <span className="bg-slate-950 border border-slate-800 text-[10px] text-slate-400 px-2 py-0.5 rounded-full font-bold">
                {inProgressTasks.length}
              </span>
            </div>
            
            <button 
              onClick={() => onCreateTaskAtStatus("In Progress")}
              className="p-1 hover:bg-slate-800 text-slate-500 hover:text-slate-200 rounded transition"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[600px] pr-1">
            {inProgressTasks.length === 0 ? (
              <EmptyColumnPlaceholder status="In Progress" onClick={() => onCreateTaskAtStatus("In Progress")} />
            ) : (
              inProgressTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onDragStart={handleDragStart}
                  onEdit={onEditTask} 
                  onDelete={onDeleteTask}
                  onStatusChange={onUpdateTaskStatus}
                />
              ))
            )}
          </div>
        </div>

        {/* COLUMN: DONE */}
        <div 
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[500px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "Done")}
        >
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800/60">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h3 className="font-bold text-slate-100 text-sm">Done</h3>
              <span className="bg-slate-950 border border-slate-800 text-[10px] text-slate-400 px-2 py-0.5 rounded-full font-bold">
                {doneTasks.length}
              </span>
            </div>
            
            <button 
              onClick={() => onCreateTaskAtStatus("Done")}
              className="p-1 hover:bg-slate-800 text-slate-500 hover:text-slate-200 rounded transition"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[600px] pr-1">
            {doneTasks.length === 0 ? (
              <EmptyColumnPlaceholder status="Done" onClick={() => onCreateTaskAtStatus("Done")} />
            ) : (
              doneTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onDragStart={handleDragStart}
                  onEdit={onEditTask} 
                  onDelete={onDeleteTask}
                  onStatusChange={onUpdateTaskStatus}
                />
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

function EmptyColumnPlaceholder({ status, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="border border-dashed border-slate-800 hover:border-slate-700/80 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-950/20 transition-all duration-150 flex flex-col items-center justify-center space-y-2 py-10 my-1"
    >
      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-slate-600">
        <Plus className="h-4 w-4" />
      </div>
      <p className="text-xs font-semibold text-slate-400">Column empty</p>
      <p className="text-[10px] text-slate-500 max-w-[150px] leading-relaxed">Click to add a ticket directly to "{status}".</p>
    </div>
  );
}