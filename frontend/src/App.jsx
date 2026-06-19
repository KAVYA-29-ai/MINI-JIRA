// ==========================================
// 📂 File: src/App.jsx (Main Orchestrator)
// ==========================================
import { useEffect, useMemo, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import DashboardPage from './pages/Dashboard';
import ProjectsPage from './pages/Projects';
import BoardPage from './pages/board';
import ProjectFormModal from './components/ProjectForm';
import TaskFormModal from './components/TaskForm';
import { INITIAL_PROJECTS } from './data/projects';
import { INITIAL_TASKS } from './data/tasks';

export default function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('mini_jira_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('mini_jira_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [selectedProjectId, setSelectedProjectId] = useState("proj-1");

  // Filter conditions
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("All");

  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [targetTaskStatus, setTargetTaskStatus] = useState("To Do");

  useEffect(() => {
    localStorage.setItem('mini_jira_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('mini_jira_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || projects[0] || null;
  }, [projects, selectedProjectId]);

  useEffect(() => {
    if (projects.length > 0 && !projects.some(p => p.id === selectedProjectId)) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const uniqueAssignees = useMemo(() => {
    const names = new Set();
    tasks.forEach(t => {
      if (t.assignee) names.add(t.assignee);
    });
    return Array.from(names);
  }, [tasks]);

  const handleSaveProject = (projectData) => {
    if (projectData.id) {
      setProjects(prev => prev.map(p => p.id === projectData.id ? projectData : p));
    } else {
      const newProj = {
        ...projectData,
        id: `proj-${Date.now()}`
      };
      setProjects(prev => [...prev, newProj]);
      setSelectedProjectId(newProj.id);
    }
    setIsProjectFormOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (projId) => {
    const projectToDelete = projects.find(p => p.id === projId);
    if (!projectToDelete) return;

    if (confirm(`Are you sure you want to delete project "${projectToDelete.name}" (${projectToDelete.key})? This will also delete all its tasks.`)) {
      setProjects(prev => prev.filter(p => p.id !== projId));
      setTasks(prev => prev.filter(t => t.projectId !== projId));
    }
  };

  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      setTasks(prev => prev.map(t => t.id === taskData.id ? taskData : t));
    } else {
      const proj = projects.find(p => p.id === taskData.projectId);
      const projKey = proj ? proj.key : "TSK";
      const projTasks = tasks.filter(t => t.projectId === taskData.projectId);
      
      const nextNum = projTasks.reduce((max, t) => {
        const parts = t.taskKey.split('-');
        const num = parseInt(parts[1], 10);
        return !isNaN(num) && num > max ? num : max;
      }, 100) + 1;

      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`,
        taskKey: `${projKey}-${nextNum}`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTasks(prev => [...prev, newTask]);
    }
    setIsTaskFormOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const handleUpdateTaskStatus = (taskId, nextStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: nextStatus } : t));
  };

  const viewProjectBoard = (projId) => {
    setSelectedProjectId(projId);
    setCurrentTab("board");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      <Navbar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        projectsCount={projects.length}
        hasSelectedProject={!!selectedProject}
        onNewProject={() => {
          setEditingProject(null);
          setIsProjectFormOpen(true);
        }}
        onNewTicket={() => {
          setEditingTask(null);
          setTargetTaskStatus("To Do");
          setIsTaskFormOpen(true);
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {projects.length === 0 ? (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-6 rounded-2xl flex flex-col items-center text-center gap-4 my-8">
            <AlertCircle className="h-12 w-12 text-amber-400" />
            <div>
              <h3 className="text-lg font-bold">No active projects found</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-md">Every issue tracker needs a project base. Spin up your first team project using the button below!</p>
            </div>
            <button 
              onClick={() => {
                setEditingProject(null);
                setIsProjectFormOpen(true);
              }}
              className="mt-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl transition duration-150 text-xs"
            >
              Create First Project
            </button>
          </div>
        ) : (
          <>
            {currentTab === "dashboard" && (
              <DashboardPage 
                projects={projects}
                tasks={tasks}
                onSelectProject={viewProjectBoard}
                onAddProject={() => {
                  setEditingProject(null);
                  setIsProjectFormOpen(true);
                }}
                onEditProject={(p) => {
                  setEditingProject(p);
                  setIsProjectFormOpen(true);
                }}
                onDeleteProject={handleDeleteProject}
              />
            )}

            {currentTab === "projects" && (
              <ProjectsPage 
                projects={projects}
                tasks={tasks}
                onSelectProject={viewProjectBoard}
                onEditProject={(p) => {
                  setEditingProject(p);
                  setIsProjectFormOpen(true);
                }}
                onDeleteProject={handleDeleteProject}
              />
            )}

            {currentTab === "board" && (
              <BoardPage 
                projects={projects}
                tasks={tasks}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={setSelectedProjectId}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                onEditTask={(t) => {
                  setEditingTask(t);
                  setIsTaskFormOpen(true);
                }}
                onDeleteTask={handleDeleteTask}
                onCreateTaskAtStatus={(status) => {
                  setEditingTask(null);
                  setTargetTaskStatus(status);
                  setIsTaskFormOpen(true);
                }}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                assigneeFilter={assigneeFilter}
                setAssigneeFilter={setAssigneeFilter}
                uniqueAssignees={uniqueAssignees}
              />
            )}
          </>
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Mini-Jira Dashboard. Local storage enabled.</p>
        </div>
      </footer>

      {isProjectFormOpen && (
        <ProjectFormModal 
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => {
            setIsProjectFormOpen(false);
            setEditingProject(null);
          }}
        />
      )}

      {isTaskFormOpen && (
        <TaskFormModal 
          task={editingTask}
          projects={projects}
          currentProjectId={selectedProjectId}
          defaultStatus={targetTaskStatus}
          onSave={handleSaveTask}
          onClose={() => {
            setIsTaskFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}

    </div>
  );
}