import { useState, useMemo, useEffect, createContext } from "react";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/task/TaskCard";
import AddTaskModal from "@/components/task/AddTaskModal";
import EditTaskModal from "@/components/task/EditTaskModal";
import MembersList from "@/components/project/MembersList";
import { api } from "@/api/api";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { CardContent } from "@/components/ui/card";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();

  const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;

  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [project, setProject] = useState(null);
  const [fullMemberList, setMembersList] = useState([]);

  const [Taskfilter, setfilter] = useState("all");
  const [memberEmail, setMemberEmail] = useState("");
  const [adding, setAdding] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchProjectDetails();
  }, []);

 const fetchProjectDetails = async () => {
   try {
     const res = await api.get(`/tasks/${projectId}`);

     const project = res.data.project;
     setProject(project);
     setTasks(res.data.tasks);


     const formattedMembers = project.members.map((m) => ({
       _id: m.user?._id || m._id,
       name: m.user?.name || m.name,
       email: m.email || m.user?.email,
       role: m.role || "member",
     }));


     const formattedOwner = {
       _id: project.owner._id,
       name: project.owner.name,
       email: project.owner.email,
       role: "owner👑",
     };

     const fullList = [formattedOwner, ...formattedMembers];

     setMembers(formattedMembers);
     setMembersList(fullList);

     toast.success("Project loaded");
   } catch (err) {
     console.error(err);
     toast.error("Failed to load project details");
   }
 };




  const handleAddMember = async () => {
    if (!memberEmail.includes("@")) {
      toast.error("Invalid email");
      return;
    }
    setAdding(true);
    try {
      const res = await api.post(`/members/${projectId}/add`, {
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

  const handleAddTask = async (newTask) => {
    try {
      console.log("handleAddTask:: ", newTask);
      const res = await api.post(`/tasks/${projectId}`, newTask);

      setTasks((prev) => [...prev, res.data.task]);

      console.log(res.data?.msg);
      toast.success("Task created");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create task");
    }
  };

  const handleUpdateTask = async (updated) => {
    try {
      const payload = {
        title: updated.title,
        description: updated.description,
        priority: updated.priority,
        dueDate: updated.dueDate,
        status: updated.status,
        assignedTo: updated.assignedTo || null,
      };

      const res = await api.patch(`/tasks/edit/${updated._id}`, payload);

      const updatedTask = res.data.task;

      setTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );

   
      if (res.data.projectStatus) {
        setProject((prev) =>
          prev ? { ...prev, status: res.data.projectStatus } : prev
        );
      }

      toast.success("Task updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
    }
  };


  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/delete/${id}`);

      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const handleToggleStatus = async (id) => {
    const existing = tasks.find((t) => t._id === id);

    console.log("existing: ", existing);
    if (!existing) return;

    const updated = {
      ...existing,
      status: existing.status === "pending" ? "completed" : "pending",
    };

    try {
      // update backend
      const res = await api.patch(`/tasks/edit/${id}`, {
        status: updated.status,
      });

      // update frontend
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data.task : t)));

      toast.success("Status Updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to toggle status");
    }
  };

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
          <p className="text-gray-500">
            {project?.description || "Short project description..."}
          </p>
        </div>

        <AddTaskModal
          members={fullMemberList} 
          onAdd={handleAddTask}
        />
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

        <MembersList fullMemberList={fullMemberList} />
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {[
          "all",
          "mine",
          "assigned",
          "unassigned",
          "today",
          "pending",
          "completed",
        ].map((f) => (
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
            key={task._id}
            task={task}
            members={fullMemberList}
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
        members={fullMemberList}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
}
