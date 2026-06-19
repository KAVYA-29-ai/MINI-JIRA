// ==========================================
// 📂 File: src/data/tasks.js
// ==========================================
export const INITIAL_TASKS = [
  {
    id: "task-1",
    projectId: "proj-1",
    taskKey: "EMP-101",
    title: "Implement OAuth2 SSO Login",
    description: "Connect standard Google Workspace credentials with passport-js strategy and store user session securely.",
    status: "To Do",
    priority: "High",
    assignee: "Rajesh Kumar",
    createdAt: "2026-06-15"
  },
  {
    id: "task-2",
    projectId: "proj-1",
    taskKey: "EMP-102",
    title: "Create Leave Request form & API",
    description: "UI form with validation for start/end date, reason, and type of leave. Endpoint to save requests in DB.",
    status: "In Progress",
    priority: "Medium",
    assignee: "Priya Sharma",
    createdAt: "2026-06-16"
  },
  {
    id: "task-3",
    projectId: "proj-1",
    taskKey: "EMP-103",
    title: "Refactor Database Schema for Payroll",
    description: "Update payroll structures to support variable bonuses and tax bracket modifications in postgreSQL schema.",
    status: "Done",
    priority: "High",
    assignee: "Amit Patel",
    createdAt: "2026-06-10"
  },
  {
    id: "task-4",
    projectId: "proj-2",
    taskKey: "COA-201",
    title: "Configure Stripe Webhook Integration",
    description: "Validate stripe session completion triggers to unlock premium platform tiers automatically.",
    status: "To Do",
    priority: "High",
    assignee: "Rajesh Kumar",
    createdAt: "2026-06-18"
  },
  {
    id: "task-5",
    projectId: "proj-2",
    taskKey: "COA-202",
    title: "Design Onboarding Flow UI",
    description: "Create interactive multi-step wizard for new users showing profile setup, preference selection, and tutorial videos.",
    status: "In Progress",
    priority: "Low",
    assignee: "Siddharth Sen",
    createdAt: "2026-06-17"
  },
  {
    id: "task-6",
    projectId: "proj-3",
    taskKey: "ANL-301",
    title: "Setup Kafka Cluster in AWS",
    description: "Spin up robust MSK instance for processing user click streams across all mobile and web microservices.",
    status: "Done",
    priority: "High",
    assignee: "Elena Rostova",
    createdAt: "2026-06-12"
  }
];
