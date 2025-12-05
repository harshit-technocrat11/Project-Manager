import React from "react";

import { Badge } from "lucide-react";

import { FolderKanban, CheckCircle, Clock, Flame ,CheckSquare} from "lucide-react";

import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddProjectModal } from "@/components/project/AddProjectModal";
import { useAuth } from "@/context/AuthContext";


export default function DashboardPage() {
  const {user} = useAuth();
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <AddProjectModal />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-violet-600">
          Welcome, {user?.name} 👋
        </h2>
      </div>

      {/* stats card */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Projects */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderKanban className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Tasks
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">30</p>
            <p className="text-xs text-muted-foreground">Great productivity!</p>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">15</p>
            <p className="text-xs text-muted-foreground">
              Tasks awaiting action
            </p>
          </CardContent>
        </Card>

        {/* Due Today */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <Flame className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-xs text-muted-foreground">
              Complete before end of day
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Recent Tasks */}
      <Card className="shadow-sm mt-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Tasks</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Task #1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
              <span>set up Langchain for AI agent</span>
            </div>
            <Badge variant="secondary">2 hours ago</Badge>
          </div>

          {/* Task #2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
              <span>Create Project Card UI</span>
            </div>
            <Badge variant="secondary">Yesterday</Badge>
          </div>

          {/* Task #3 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
              <span>Implement task filters</span>
            </div>
            <Badge variant="secondary">3 days ago</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
