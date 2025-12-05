
import ProjectCard from "@/components/project/ProjectCard";
import { AddProjectModal } from "@/components/project/AddProjectModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarTaxiFront, Search } from "lucide-react";
import { api } from "@/api/api";
import { toast } from "sonner";


export default function ProjectsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [projects, setProjects] = useState([]);

  const filteredProjects =  projects.filter ((p)=>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  
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

  const createProject = async (title, description) =>{
    try {
      const res  = await api.post("/projects", {title:title, description: description} )
      
      console.log("Project Created!", res.data?.msg)
      toast.message("New Project Created!")
      setProjects((prev)=> [...prev, res.data?.project])
    }
    catch(err) {
      console.log("error while , creating project :", err);
      toast.error("error occured")
    }
  }

  const handleUpdateProject= async ( updatedProject) =>{
    try {
      const res = await api.patch(`/projects/${updatedProject._id}`, {
        title: updatedProject.title,
        description: updatedProject.description,
      });
      console.log( "updated project:", res.data?.project)

      setProjects((prev)=>prev.map((proj)=>( proj._id === updatedProject._id)? res.data?.project : proj ))

      console.log("project Updated!", res.data?.msg);
      toast.message("Project updated succesfully !");
    }

    catch ( err) {
       console.log("error while , updating project :", err);
       toast.error("error occured");
    }
  }

  const handleDeleteProject = async (projectId) => {
    try {
      const res = await api.delete(`/projects/${projectId}`);
      console.log("deleted project:", res.data?.msg);

      setProjects((prev) =>
        prev.filter((proj) =>
          proj._id !== projectId
        )
      );
      console.log("project Deleted successfully!", res.data?.msg);
      toast.message("Project Deleted succesfully !");
    } catch (err) {
      console.log("error while , deleting project :", err);
      toast.error("error occured");
    }
  };
  useEffect(() => {
    fetchProjects();
    
  }, []);
  
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

        {/* project modal */}
        <AddProjectModal
          onAdd={(proj) => createProject(proj.title, proj.description)}
        />
      </div>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects?.length === 0 ? (
          <h4 className="flex justify-center text-xl text-zinc-700 font-medium">No currently exisiting Projects found⚠️</h4>
        ) : null}
        { filteredProjects?.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onClick={() => navigate(`/projects/${project._id}`)}
            onDelete={() => handleDeleteProject(project._id)}
            onEdit={handleUpdateProject}
          />
        ))}
      </div>
    </div>
  );
}
