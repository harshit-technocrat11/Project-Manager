import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import { AddProjectModal } from "@/components/project/AddProjectModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    {
      id: 123,
      name: "Website Redesign",
      description: "Update UI and improve performance",
      tasks: 10,
      status: "Completed",
      createdAt: "2025-01-15",
    },
    {
      id: 12314,
      name: "AI Chatbot Integration",
      description: "Build an AI chatbot for customer support",
      status: "In Progress",
      tasks: 10,
      createdAt: "2025-01-20",
    },
    {
      id: 1444,
      name: "Marketing Dashboard",
      description: "Analytics dashboard for campaign metrics",
      createdAt: "2025-01-22",
      status: "Completed",
      tasks: 10,
    },
    {
      id: 643,
      name: "Mobile App Prototype",
      description: "Create Figma prototype for mobile app",
      createdAt: "2025-01-25",
      status: "In Progress",
      tasks: 10,
    },
  ]);
  const handleAddProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };
  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // formHandler

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>

        {/* <Button>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button> */}
        <AddProjectModal
          onAdd={(newProject) => setProjects((prev) => [...prev, newProject])}
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => navigate(`/projects/:${project.id}`)}
            onDelete={() => handleDeleteProject(project.id)}
          />
        ))}
      </div>

      
    </div>
  );
}
