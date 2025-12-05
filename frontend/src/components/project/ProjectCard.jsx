import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Delete, Pencil, EllipsisVertical } from "lucide-react";
import ProgressBar from "./ProgressBar";
import EditProjectModal from "./EditProjectModal";

export default function ProjectCard({ project, onDelete, onClick, onEdit }) {
  const [editOpen, setEditOpen] = useState(false);

  const tasks = project?.tasks || [];
  const total = tasks.length;
  const completed = tasks.filter((t) => t?.status === "completed").length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Card
      onClick={(e)=> {
        if ( editOpen){ return};
        onClick();
      }}
      className="relative border rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      
      <div className="absolute top-4 right-4 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" >
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setEditOpen(true);
              }}
            >
              <div className="flex items-center gap-2">
                <Pencil size={16} />
                Edit
              </div>
            </DropdownMenuItem>

            
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                
                onDelete(project._id);
              }}
            >
              <div className="flex items-center gap-2 text-red-600">
                <Delete size={16} />
                Delete
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <EditProjectModal
        open={editOpen}
        setOpen={setEditOpen}
        project={project}
        onUpdate={onEdit}
      />

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
        <p className="text-sm text-gray-600">{project.description}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Created on: {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        <p className="text-sm font-medium">
          {completed}/{total} tasks completed
        </p>
        <ProgressBar progress={progress} />
      </CardContent>

      <CardFooter className="pt-1">
        <Badge
          className={
            project.status === "Completed"
              ? "bg-green-500"
              : project.status === "In Progress"
              ? "bg-blue-500"
              : "bg-yellow-500"
          }
        >
          {project.status}
        </Badge>
      </CardFooter>
    </Card>
  );
}
