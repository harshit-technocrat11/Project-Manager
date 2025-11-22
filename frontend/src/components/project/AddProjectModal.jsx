import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Plus } from "lucide-react";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";



export function AddProjectModal({onAdd
}) {

   const getToday = () => {
     // to get the local date!!
     return new Date().toLocaleDateString().split("T")[0];
   };
     const [projectName, setProjectName] = useState("");
     const [projectDesc, setProjectDesc] = useState("");
   
     const [status, setStatus] = useState("In Progress");
     const [dateCreated, setDateCreated] = useState(getToday())
    

     //helper functions --> onChange for the modal
    const onNameChange=()=>{}
    


      const handleAddProject = () => {
        // validations
        if (projectName.trim() < 3) {
          toast.error("title must be atleast 3 characters long!");
          return;
        }

        //desc size limit
        if (projectDesc.length > 40) {
          toast.error("description too long !");
        }

        // prevent past date submits
        // if (dueDate) {
        //   if (dueDate < getToday()) {
        //     toast.error("Due date cannot be in the past");
        //     return;
        //   }
        // }

        const newProject = {
          id: crypto.randomUUID(),
          name: projectName,

          description: projectDesc,
          dateCreated: dateCreated,
          status: status, // default
        };
        console.log(newProject);

        toast.success("Project created");
        onAdd(newProject)

        //reset form

        setProjectName("");
        setProjectDesc("");

        setDateCreated(getToday());
        
      };
     

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className={"bg-gray-900 text-white"} variant="outline">
            {" "}
            <Plus></Plus>Create Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          {/* FORM FIELDS */}
          <div className="space-y-4">
            {/* Project Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium" value={projectName}>
                Project Name
              </label>
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

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select

                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-progress">🟦In Progress </SelectItem>
                  <SelectItem value="completed">🟢Completed </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  handleAddProject();
                  toast.success("Project has been created");
                }}
                type="submit"
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
