import { Button } from "@/components/ui/button";
import {
  Dialog,

  DialogContent,

  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

import { Plus } from "lucide-react";

import { toast } from "sonner";

import { useState } from "react";

export function AddProjectModal({ onAdd }) {
  const getToday = () => {
    // to get the local date!!
    return new Date().toLocaleDateString().split("T")[0];
  };
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  //  const [status, setStatus] = useState("In Progress");
  // const [dateCreated, setDateCreated] = useState(getToday());


  const handleAddProject = async () => {
    if (!projectName || !projectDesc) {
      
      toast.warning("title and description are mandatory fields!");
      return;
    }
    // validations
    if (projectName.trim().length < 3) {
      toast.error("title must be atleast 3 characters long!");
      return;
    }

    //desc size limit
    if (projectDesc.length > 40) {
      toast.error("description too long !");
      return;
    }

    // prevent past date submits
    // if (dueDate) {
    //   if (dueDate < getToday()) {
    //     toast.error("Due date cannot be in the past");
    //     return;
    //   }
    // }

    const newProject = {
      title: projectName,
      description: projectDesc,
    };

    console.log(newProject);

    onAdd(newProject);
    // toast.success("Project created");
    setOpen(false);

    //reset form
    setProjectName("");
    setProjectDesc("");

    // setDateCreated(getToday());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-900 text-white">
          <Plus className="mr-2" /> Create Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Project Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Name</label>
            <Input
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              placeholder="Enter project description"
            />
          </div>

          {/* Status
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-progress">🟦 In Progress</SelectItem>
                <SelectItem value="completed">🟢 Completed</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleAddProject}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
