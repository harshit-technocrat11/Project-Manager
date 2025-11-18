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

export function AddProjectModal({
  status,
  setStatus,
  projectName,
  setProjectName,
  projectDesc,
  setProjectDesc,
  formHandler,
}) {
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

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">🟨Pending </SelectItem>
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
                  formHandler();
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
