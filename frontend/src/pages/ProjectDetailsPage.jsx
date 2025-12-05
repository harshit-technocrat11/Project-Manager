import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

import TaskCard from "@/components/task/TaskCard";
import AddTaskModal from "@/components/task/AddTaskModal";
import EditTaskModal from "@/components/task/EditTaskModal";


export default function ProjectDetailsPage() {

  const currentUserId = "user-100";

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Design APIs",
      description: "use express here",
      priority: "high",
      status: "pending",
      dueDate: new Date().toISOString().slice(0, 10),
      assignedTo: null,
    },
    {
      id: "23",
      title: "Build register UI",
      description: "use reactjs",
      priority: "medium",
      status: "completed",
      dueDate: "2025-11-20",
      assignedTo: "user-200",
    },
    {
      id: "3",
      title: "Build register UI",
      priority: "low",
      status: "completed",
      dueDate: "2025-11-20",
      assignedTo: null,
    },
    {
      id: "222",
      title: "Build register UI",
      priority: "medium",
      status: "pending",
      dueDate: "2025-11-21",
      assignedTo: "user-200",
    },
    {
      id: "22",
      title: "refine frontend !!",
      priority: "medium",
      status: "pending",
      dueDate: "2025-11-20",
      assignedTo: currentUserId,
    },
  ]);

  const [members, setMembers] = useState([
    { user: { _id: "user-100", email: "me@example.com", name: "Me" } },
    { user: { _id: "user-200", email: "alice@example.com", name: "Alice" } },
  ]);

  const [Taskfilter, setfilter] = useState("all");
  const [memberEmail, setMemberEmail] = useState("");
  const [adding, setAdding] = useState(false);

  // edit modal control
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // helper: is task due today
  function isToday(task) {
    if (!task?.dueDate) return false;
    const date = new Date(task.dueDate);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      switch (Taskfilter) {
        case "all":
          return true;
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
  }, [tasks, Taskfilter, currentUserId]);

  // Add member (UI-only here) - replace with backend call if needed
  const handleAddMember = () => {
    if (!memberEmail || !memberEmail.includes("@")) {
      return alert("Enter a valid email");
    }
    setAdding(true);
    setTimeout(() => {
      const newId = crypto ? crypto.randomUUID() : `user-${Date.now()}`;
      setMembers((prev) => [
        ...prev,
        {
          user: {
            _id: newId,
            email: memberEmail,
            name: memberEmail.split("@")[0],
          },
        },
      ]);
      setMemberEmail("");
      setAdding(false);
    }, 400);
  };

  // Add Task (called by AddTaskModal)
  const handleAddTask = (newtask) => {
    // if you want to POST to backend, do it here and use server response
    // const res = await api.post('/tasks', {...newtask, projectId})
    setTasks((prev) => [
      ...prev,
      {
        ...newtask,
        id:
          newtask.id || (crypto ? crypto.randomUUID() : Date.now().toString()),
      },
    ]);
  };

  // Update Task (called by EditTaskModal -> which calls onUpdate)
  const handleUpdateTask = (updated) => {
    // call backend PATCH here if desired, then update local state
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  // Delete
  const handleDelete = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  // Toggle complete
  const handleToggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "pending" ? "completed" : "pending" }
          : t
      )
    );
  };

  // open edit
  const openEdit = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Name</h1>
          <p className="text-muted-foreground">Short project description...</p>
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
            <div
              key={m.user._id}
              className="px-3 py-1 border rounded-full text-sm"
            >
              {m.user.email}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={() => setfilter("all")}
          variant={Taskfilter === "all" ? "default" : "outline"}
        >
          All
        </Button>
        <Button
          onClick={() => setfilter("mine")}
          variant={Taskfilter === "mine" ? "default" : "outline"}
        >
          My Tasks
        </Button>
        <Button
          onClick={() => setfilter("assigned")}
          variant={Taskfilter === "assigned" ? "default" : "outline"}
        >
          Assigned to Others
        </Button>
        <Button
          onClick={() => setfilter("unassigned")}
          variant={Taskfilter === "unassigned" ? "default" : "outline"}
        >
          Unassigned
        </Button>
        <Button
          onClick={() => setfilter("today")}
          variant={Taskfilter === "today" ? "default" : "outline"}
        >
          Today
        </Button>
        <Button
          onClick={() => setfilter("pending")}
          variant={Taskfilter === "pending" ? "default" : "outline"}
        >
          Pending
        </Button>
        <Button
          onClick={() => setfilter("completed")}
          variant={Taskfilter === "completed" ? "default" : "outline"}
        >
          Completed
        </Button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length === 0 && (
          <h4 className="flex justify-center text-xl text-zinc-700 font-medium">
            No tasks found
          </h4>
        )}
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

      {/* Edit modal (controlled) */}
      <EditTaskModal
        open={editOpen}
        setOpen={setEditOpen}
        task={selectedTask}
        members={members}
        onUpdate={(updated) => handleUpdateTask(updated)}
      />
    </div>
  );
}
