import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskCard from "@/components/task/TaskCard";
import { AddTaskModal } from "@/components/task/AddTaskModal";

export default function ProjectDetailsPage({}) {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: "use express here",
      title: "Design APIs",
      priority: "high",
      status: "pending",
      dueDate: "today",
    },
    {
      id: "23",
      title: "Build register UI ",
      description: "use reactjs",
      priority: "medium",
      status: "completed",
      dueDate: "Tomorrow",
    },
    {
      id: "3",
      title: "Build register UI ",
      priority: "low",
      status: "completed",
      dueDate: "2025-11-20",
    },
    {
      id: "222",
      title: "Build register UI ",
      priority: "medium",
      status: "pending",
      dueDate: "2025-11-21",
    },
    {
      id: "22",
      title: "refine frontend !!",
      priority: "medium",
      status: "pending",
      dueDate: "2025-11-20",
    },
  ]);

  const [Taskfilter, setfilter] = useState("all");

  //today filter
  function isToday(task){
    const date = new Date(task.dueDate);
    const today = new Date();

    return (
      date.getDate() === today.getDate() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear()
    )
  }

  // filter buttons -
  const filteredTasks = tasks?.filter((task) => {
    if (Taskfilter === "all") return true;
    if (Taskfilter === "pending") return task.status === "pending";
    if (Taskfilter === "completed") return task.status === "completed";
    if (Taskfilter === "today") return isToday(task);
  });



  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Name</h1>
          <p className="text-muted-foreground">Short project description...</p>
        </div>

        {/* safer method (prev=> [...prev, newtask]) */}
        <AddTaskModal onAdd={(newtask) => setTasks(prev =>[...prev, newtask ])} />
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Button onClick={() => setfilter("all")} variant="outline">
          All
        </Button>
        <Button onClick={() => setfilter("today")} variant="outline">
          Today
        </Button>
        <Button onClick={() => setfilter("pending")} variant="outline">
          Pending
        </Button>
        <Button onClick={() => setfilter("completed")} variant="outline">
          Completed
        </Button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </div>

      {/* Add Task Modal */}
      {/* <AddTaskModal open={open} setOpen={setOpen} /> */}
    </div>
  );
}
