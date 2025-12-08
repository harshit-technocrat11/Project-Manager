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
  const getToday = () => new Date().toLocaleDateString();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(getToday());
  const [status, setStatus] = useState("pending");
  const [assignedTo, setAssignedTo] = useState("none");

  const handleAddTask = () => {
    if (title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }
    if (taskDesc.length > 1000) toast.error("Description too long");
    if (dueDate && dueDate < getToday()) {
      toast.error("Due date cannot be in the past");
      return;
    }

    const newTask = {
      
      title: title.trim(),
      priority:priority,
      description: taskDesc,
      dueDate: dueDate || null,
      status,
      assignedTo: assignedTo === "none" ? null : assignedTo,

    };

    console.log("new task :", newTask)

    onAdd(newTask);
    toast.success("Task created");
    // reset local form
    setTitle("");
    setTaskDesc("");
    setPriority("medium");
    setDueDate(getToday());
    setStatus("pending");
    setAssignedTo("none");
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

          <div className="space-y-2">
            <label className="text-sm">Priority</label>
            <Select value={priority} onValueChange={(v) => setPriority(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Due Date (optional)</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Assign to (optional)</label>
            <Select value={assignedTo} onValueChange={(v) => setAssignedTo(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Assign to (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {members.map((m) => (
                  <SelectItem key={m.user._id} value={m.user._id}>
                    {m.user.email}
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
