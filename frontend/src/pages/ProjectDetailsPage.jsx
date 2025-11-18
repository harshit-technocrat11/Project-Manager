import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskCard from "@/components/task/TaskCard";
import { AddTaskModal } from "@/components/task/AddTaskModal";

export default function ProjectDetailsPage({}) {
    const [taskTitle, setTaskTitle] = useState("");
    const [TaskDesc, setTaskDesc] = useState("");
    const [status, setStatus] = useState("");
    const [dueDate, setDueDate]= useState("")
    const [priority, setPriority] = useState("")
    
    const formHandler = () => {
      console.log({
        title: taskTitle,
        description: TaskDesc,
        status: status,
      });

      // reset form
      setTaskDesc("");
      setStatus("");
      setTaskTitle("");
    };
    
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design APIs",
      priority: "high",
      status: "pending",
      dueDate: "today",
    },
    {
      id: "2",
      title: "Build register UI                                           ",
      priority: "medium",
      status: "completed",
      dueDate: "Tomorrow",
    },
    {
      id: "2",
      title: "Build register UI                                           ",
      priority: "low",
      status: "completed",
      dueDate: "Tomorrow",
    },
    {
      id: "2",
      title: "Build register UI                                           ",
      priority: "medium",
      status: "pending",
      dueDate: "Tomorrow",
    },
  ]);

  const [filter, setfilter] = useState("all")

  // filter buttons -
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return task.status === "pending";
    if (filter === "completed") return task.status === "completed";
    if (filter === "today") return task.dueDate === "Today";
  });


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Name</h1>
          <p className="text-muted-foreground">Short project description...</p>
        </div>

        {/* <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </Button> */}
        <AddTaskModal onAdd={(newtask)=> setTasks({...tasks, newtask}) }  />
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
