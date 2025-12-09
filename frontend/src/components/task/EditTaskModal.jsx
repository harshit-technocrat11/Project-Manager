import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

export default function EditTaskModal({
  open,
  setOpen,
  task,
  members,
  onUpdate,
}) {
  const [title, setTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [assignedTo, setAssignedTo] = useState("none");

  // console.log("fullmemberLIST:", members)

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setTaskDesc(task.description || "");
      setPriority(task.priority || "medium");
      setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
      setStatus(task.status || "pending");
      setAssignedTo(task.assignedTo || "none");
    }
  }, [task]);

  const handleSave = () => {

    console.log("assignedTO : ", assignedTo)
    const updatedTask = {
      _id: task._id,
      title,
      description: taskDesc,
      priority,
      dueDate,
      status,
      assignedTo: assignedTo === "none" ? null : assignedTo,
    };

    onUpdate(updatedTask);
    setOpen(false);
  };

  if (!task) return null;

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
            placeholder="Description"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />

          {/* Priority */}
          <div>
            <label>Priority:</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <label>Status:</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div>
            <label>Assigned To:</label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>

                {members.map((m) => (
                  <SelectItem key={m._id} value={m._id}>
                    {m.email} - ({m.role})
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
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
