import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function TaskCard({
  task,
  members,
  currentUserId,
  onDelete,
  toggleComplete,
  onEdit,
}) {
  const priorityColor = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const assignedUser = members.find((m) => m._id === task.assignedTo) || null;

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={priorityColor[task.priority]}>
              {task.priority}
            </Badge>
            <h3 className="font-semibold text-xl">{task.title}</h3>
          </div>

          <p className="text-gray-700 mb-2">{task.description}</p>

          {/* Meta info */}
          <div className="text-sm text-gray-600 flex flex-col gap-1">
            {task.dueDate && <p>📅 {task.dueDate.slice(0, 10)}</p>}

            <p>
              Status:{" "}
              <Badge
                className={
                  task.status === "completed"
                    ? "bg-green-200 text-green-700"
                    : "bg-blue-200 text-blue-800"
                }
              >
                {task.status}
              </Badge>
            </p>

            <p>
              Assigned to:{" "}
              <span className="font-medium">
                {assignedUser ? assignedUser.email : "None"}
              </span>
            </p>
          </div>
        </div>

        {/* Options Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Options
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit(task)}>
              ✏️ Edit Task
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => toggleComplete(task._id)}>
              {task.status === "pending"
                ? "✔ Mark Completed"
                : "⏳ Mark Pending"}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(task._id)}
            >
              ❌ Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
