import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TaskCard({
  task,
  toggleComplete,
  onDelete,
  onEdit,
  members = [],
  currentUserId,
}) {
  const priorityColor = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };
  const statusColor = {
    completed: "bg-green-200 text-green-700",
    pending: "bg-blue-800 text-white",
  };

  const assignedUser = members.find((m) => m.user._id === task.assignedTo);

  return (
    <div
      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer flex justify-between"
      onClick={() => {}}
    >
      <div className="space-y-1 max-w-[70%]">
        <div className="flex items-center gap-2">
          <Badge className={priorityColor[task.priority] || "bg-gray-100"}>
            {task.priority}
          </Badge>
          <h3 className="font-medium text-xl">{task.title}</h3>
        </div>

        {task.description ? (
          <p className="font-light p-2 text-base">{task.description}</p>
        ) : null}

        <div className="flex gap-4 text-sm text-muted-foreground items-center">
          {task.dueDate && <p>📅 {task.dueDate}</p>}
          <p className="text-black">
            Status:{" "}
            <Badge
              className={`${
                statusColor[task.status] || "bg-gray-200 text-black"
              }`}
            >
              {task.status}
            </Badge>
          </p>
        </div>

        <div className="text-sm mt-2">
          <strong>Assigned to: </strong>
          <span className="font-medium">
            {assignedUser ? assignedUser.user.email : "None"}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-2" variant="outline">
              options
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(task);
              }}
            >
              Edit ✏️
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                toggleComplete?.(task.id);
              }}
            >
              {task.status === "pending"
                ? "Mark Completed ✅"
                : "Mark Pending ⏲️"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(task.id);
              }}
            >
              Delete❌
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
