import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import { AddProjectModal } from "@/components/project/AddProjectModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { api } from "@/api/api";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [projects, setProjects] = useState([
    // {
    //   id: 123,
    //   title: "Website Redesign",
    //   description: "Update UI and improve performance",
    //   tasks: 10,
    //   status: "Completed",
    //   createdAt: "2025-01-15",
    // },
    // {
    //   id: 12314,
    //   title: "AI Chatbot Integration",
    //   description: "Build an AI chatbot for customer support",
    //   status: "In Progress",
    //   tasks: 10,
    //   createdAt: "2025-01-20",
    // },
    
  ]);
  const handleAddProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };
  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };


  const filteredProjects =  projects.filter ((p)=>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
      try {
        const res =  await api.get("/projects");

        console.log("projects fetched are: ", res.data.projects || [])
        setProjects(res.data.projects || []);
        
      }
      catch(err) {
          console.error("error while , fetching projects :", err)
      }
    
  }

  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>

        {/* search */}
        <div className="relative flex-1 mx-4 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <Button>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button> */}
        <AddProjectModal
          onAdd={(newProject) => setProjects((prev) => [...prev, newProject])}
        />
      </div>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects?.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => navigate(`/projects/:${project._id}`)}
            onDelete={() => handleDeleteProject(project._id)}
          />
        ))}
      </div>
    </div>
  );
}
