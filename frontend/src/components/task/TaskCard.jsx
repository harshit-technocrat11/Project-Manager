import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


// import { EditTaskModal } from "./EditTaskModal";

export default function TaskCard({ task, toggleComplete, onDelete }) {
  const priorityColor = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };
  const statusColor= {
    completed: "bg-green-200 text-green-700",
    pending: "bg-blue-800 text-white",
    
  };


  return (
    <div
      
      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer flex justify-between"
    >
      {/* Left Section */}
      <div className="space-y-1">
        {/* Priority + Title */}
        <div className="flex items-center gap-2">
          <Badge className={priorityColor[task.priority]}>
            {task.priority}
          </Badge>

          <h3 className="font-medium text-xl ">{task.title}</h3>
        </div>
        <p className="font-light p-2 text-base">{task.description}</p>

        {/* Due Date + Status */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          {task.dueDate && <p>📅 {task.dueDate}</p>}
          <p className="text-black ">
            Status:{" "}
            <Badge className={`${statusColor[task.status]}`}>
              {task.status}
            </Badge>{" "}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-2" variant="outline">
            options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>onDelete(task.id)}>❌Delete </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>toggleComplete(task.id)}>{task.status==="pending"?"Mark Completed ✅ ":"Mark Pending⏲️"}</DropdownMenuItem>
        
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
