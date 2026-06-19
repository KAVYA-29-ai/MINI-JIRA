// ==========================================
// 📂 File: src/components/SearchBar.jsx
// ==========================================
import { Filter, Search, User, X } from 'lucide-react';

export default function SearchBar({ 
  searchQuery, 
  setSearchQuery, 
  priorityFilter, 
  setPriorityFilter, 
  assigneeFilter, 
  setAssigneeFilter, 
  uniqueAssignees,
  clearFilters,
  hasActiveFilters 
}) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
      
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
          <Search className="h-4 w-4" />
        </span>
        <input 
          type="text"
          placeholder="Search tasks by Title, Key, description, assignee..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filter Selects */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Priority Filter */}
        <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800/80 px-3 py-1.5 rounded-xl">
          <Filter className="h-3.5 w-3.5 text-slate-500" />
          <span className="text-[11px] text-slate-400">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Assignee Filter */}
        <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800/80 px-3 py-1.5 rounded-xl">
          <User className="h-3.5 w-3.5 text-slate-500" />
          <span className="text-[11px] text-slate-400">Assignee:</span>
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer max-w-[120px]"
          >
            <option value="All">All Team</option>
            {uniqueAssignees.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters Trigger */}
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-[11px] text-rose-400 hover:text-rose-300 font-bold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-3 py-1.5 rounded-xl transition duration-150"
          >
            Clear Filters
          </button>
        )}

      </div>

    </div>
  );
}