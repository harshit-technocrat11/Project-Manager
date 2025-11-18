import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Link } from "react-router-dom";
export default function ProjectCard({ title, description, tasks, status }) {
  return (
    <Link to={{
      pathname:"/projects/id"
    }}>
      <Card className="border-2 px-4 py-6 rounded-lg transform  duration-500 hover:scale-101 hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>

        <CardContent>
          <p className="text-sm">
            <span className="font-semibold">{tasks}</span> tasks
          </p>
        </CardContent>

        <CardFooter>
          <Badge
            className={
              status === "Completed"
                ? "bg-green-500"
                : status === "In Progress"
                ? "bg-blue-500"
                : "bg-yellow-500"
            }
          >
            {status}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
