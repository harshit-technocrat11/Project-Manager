import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function AddTaskModal({ members = [], onAdd }) {

  const getToday = () => new Date().toLocaleDateString().split("T")[0];

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(getToday());
  const [status, setStatus] = useState("pending");
  const [assignedTo, setAssignedTo] = useState("none");

  const resetForm = () => {
    setTitle("");
    setTaskDesc("");
    setPriority("medium");
    setDueDate(getToday());
    setStatus("pending");
    setAssignedTo("none");
  };

  const handleAddTask = () => {

    if (title.trim().length < 3) {
      toast.error("Title must be at least 3 characters long.");
      return;
    }

    if (taskDesc.length > 500) {
      toast.error("Description too long!");
      return;
    }


    if (dueDate && dueDate < getToday()) {
      toast.error("Due date cannot be in the past.");
      return;
    }

    const newTask = {
      title: title.trim(),
      description: taskDesc.trim(),
      priority,
      dueDate: dueDate || null,
      status,
      assignedTo: assignedTo === "none" ? null : assignedTo,
    };

    console.log("NEW TASK:", newTask);

    onAdd(newTask);
    toast.success("Task created!");

    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Short description..."
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-sm">Priority</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="text-sm">Due Date (optional)</label>
            <Input
              type="date"
              value={dueDate}
              min={getToday()}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Assign To */}
          <div className="space-y-2">
            <label className="text-sm">Assign to</label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger>
                <SelectValue placeholder="Assign to (optional)" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">None</SelectItem>

                {members?.map((m) => (
                  <SelectItem key={m.user} value={m.user}>
                    {m.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddTask}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
