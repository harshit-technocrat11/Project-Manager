import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

export default function EditTaskModal({
  open,
  setOpen,
  task,
  members = [],
  onUpdate,
}) {
  const getToday = () => new Date().toISOString().slice(0, 10);

  const [title, setTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(getToday());
  const [status, setStatus] = useState("pending");
  const [assignedTo, setAssignedTo] = useState("none");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setTaskDesc(task.description || "");
      setPriority(task.priority || "medium");
      setDueDate(task.dueDate || getToday());
      setStatus(task.status || "pending");
      setAssignedTo(task.assignedTo || "none");
    }
  }, [task]);

  if (!task) return null;

  const handleUpdateTask = () => {
    if (!title.trim() || title.trim().length < 3) {
      toast.error("Title must be at least 3 characters.");
      return;
    }
    if (taskDesc.length > 1000) {
      toast.error("Description is too long!");
      return;
    }
    if (dueDate && dueDate < getToday()) {
      toast.error("Due date cannot be in the past.");
      return;
    }

    const updatedTask = {
      ...task,
      title: title.trim(),
      description: taskDesc,
      priority,
      dueDate,
      status,
      assignedTo: assignedTo === "none" ? null : assignedTo,
    };

    onUpdate(updatedTask);
    toast.success("Task updated!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
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
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Assign To</label>
            <Select
              value={assignedTo ?? "none"}
              onValueChange={(v) => setAssignedTo(v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Assign to" />
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
          <Button onClick={handleUpdateTask}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
