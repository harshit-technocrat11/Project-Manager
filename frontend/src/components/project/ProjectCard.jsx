import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Link } from "react-router-dom";
export default function ProjectCard({ project, onClick, onDelete }) {
  return (
    <Card
      onClick={onClick}
      className="border-2 px-4 py-6 rounded-lg transform  duration-500 hover:scale-101 hover:shadow-md transition-shadow cursor-pointer"
    >
      <CardHeader>
        <CardTitle className="text-xl">{project.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardHeader>

      <CardContent>
        <p className="text-sm">
          <span className="font-semibold">{project.tasks}</span> tasks
        </p>
      </CardContent>

      <CardFooter>
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

      {/* Right Section */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-2" variant="outline">
            options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDelete(project.id)}>
            ❌Delete{" "}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
