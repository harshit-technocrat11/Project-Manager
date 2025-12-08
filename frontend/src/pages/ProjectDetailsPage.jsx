import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/task/TaskCard";
import AddTaskModal from "@/components/task/AddTaskModal";
import EditTaskModal from "@/components/task/EditTaskModal";

import { api } from "@/api/api";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  console.log("projectId:", projectId)

  const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;

  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [project, setProject] = useState(null);

  const [Taskfilter, setfilter] = useState("all");
  const [memberEmail, setMemberEmail] = useState("");
  const [adding, setAdding] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // -----------------------------------------
  //  FETCH PROJECT DETAILS FROM BACKEND
  // -----------------------------------------
  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    try {
      
      const res = await api.get(`/tasks/${projectId}`);

      setProject(res.data.project);
      setTasks(res.data.tasks);
      setMembers(res.data.project.members);

      console.log("Loaded:", res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load project details");
    }
  };

  // -----------------------------------------
  //      ADD MEMBER TO BACKEND
  // -----------------------------------------
  const handleAddMember = async () => {
    if (!memberEmail.includes("@")) {
      toast.error("Invalid email");
      return;
    }
    setAdding(true);
    try {
      const res = await api.post(`/projects/${projectId}/add-member`, {
        email: memberEmail,
      });

      toast.success("Member added!");

      setMembers(res.data.members);
      setMemberEmail("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Failed to add member");
    }
    setAdding(false);
  };

  // -----------------------------------------
  //       CREATE TASK (BACKEND)
  // -----------------------------------------
  const handleAddTask = async (newTask) => {
    try {
      const res = await api.post(`/projects/${projectId}/tasks`, newTask);

      setTasks((prev) => [...prev, res.data.task]);

      toast.success("Task created");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create task");
    }
  };

  // -----------------------------------------
  //       UPDATE TASK (BACKEND)
  // -----------------------------------------
  const handleUpdateTask = async (updated) => {
    try {
      const res = await api.patch(`/tasks/${updated.id}`, updated);

      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? res.data.task : t))
      );

      toast.success("Task updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  // -----------------------------------------
  //     DELETE TASK (BACKEND)
  // -----------------------------------------
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // -----------------------------------------
  //   TOGGLE COMPLETE (BACKEND UPDATE)
  // -----------------------------------------
  const handleToggleStatus = async (id) => {
    const existing = tasks.find((t) => t.id === id);
    const newStatus = existing.status === "pending" ? "completed" : "pending";

    try {
      const res = await api.patch(`/tasks/${id}`, { status: newStatus });

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? res.data.task : t))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to change status");
    }
  };

  // -----------------------------------------
  //             FILTER LOGIC
  // -----------------------------------------
  const isToday = (task) => {
    if (!task?.dueDate) return false;
    const d = new Date(task.dueDate);
    const t = new Date();
    return (
      d.getDate() === t.getDate() &&
      d.getMonth() === t.getMonth() &&
      d.getFullYear() === t.getFullYear()
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      switch (Taskfilter) {
        case "pending":
          return task.status === "pending";
        case "completed":
          return task.status === "completed";
        case "today":
          return isToday(task);
        case "mine":
          return task.assignedTo === currentUserId;
        case "assigned":
          return task.assignedTo && task.assignedTo !== currentUserId;
        case "unassigned":
          return !task.assignedTo;
        default:
          return true;
      }
    });
  }, [tasks, Taskfilter]);

  const openEdit = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {project?.title || "Project Name"}
          </h1>
          <p className="text-muted-foreground">
            {project?.description || "Short project description..."}
          </p>
        </div>

        <AddTaskModal members={members} onAdd={handleAddTask} />
      </div>

      {/* Members */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-3">Members</h2>

        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Enter member email"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          />
          <button
            onClick={handleAddMember}
            disabled={adding}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {adding ? "Adding..." : "Add"}
          </button>
        </div>

        <div className="flex gap-3 mt-3">
          {members.map((m) => (
            <div key={m.user._id} className="px-3 py-1 border rounded-full text-sm">
              {m.user.email}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {["all", "mine", "assigned", "unassigned", "today", "pending", "completed"].map((f) => (
          <Button
            key={f}
            onClick={() => setfilter(f)}
            variant={Taskfilter === f ? "default" : "outline"}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length === 0 ? (
          <h4 className="flex justify-center text-xl text-zinc-700 font-medium">
            No tasks found
          </h4>
        ) : null}

        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            members={members}
            currentUserId={currentUserId}
            toggleComplete={handleToggleStatus}
            onDelete={handleDelete}
            onEdit={() => openEdit(task)}
          />
        ))}
      </div>

      {/* Edit Modal */}
      <EditTaskModal
        open={editOpen}
        setOpen={setEditOpen}
        task={selectedTask}
        members={members}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
}
