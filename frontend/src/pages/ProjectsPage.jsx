import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import  ProjectCard  from "@/components/project/ProjectCard";
import { AddProjectModal } from "@/components/project/AddProjectModal";
import { useState } from "react";


export default function ProjectsPage() {
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [status, setStatus] = useState("");
   const formHandler = () => {
     console.log({
       projectName: projectName,
       description: projectDesc,
       status: status,
     });

     // reset form
     setProjectName("");
     setStatus("");
     setProjectDesc("");

     
   };
  

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>

        {/* <Button>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button> */}
        <AddProjectModal
          projectDesc={projectDesc}
          projectName={projectName}
          setProjectName={setProjectName}
          setProjectDesc={setProjectDesc}
          status={status}
          setStatus={setStatus}
          formHandler={formHandler} />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TEMP DEMO PROJECTS */}
        <ProjectCard
          title="AI Agent System"
          description="Building AI agent workflows with LangChain."
          tasks={12}
          status="In Progress"
        />

        <ProjectCard
          title="Fullstack CRM"
          description="A complete CRM dashboard system."
          tasks={20}
          status="Completed"
          
        />

        <ProjectCard
          title="Personal Portfolio"
          description="Portfolio website with animations."
          tasks={5}
          status="Pending"
        />
        <ProjectCard
          title="Weather Agent"
          description="a fine tuned AI agent - that provides real time weather updates"
          tasks={5}
          status="In Progress"
        />
        <ProjectCard
          title="Personal Career guide"
          description="GEN AI integration - hackathon"
          tasks={5}
          status="Pending"
        />
      </div>
    </div>
  );
}
