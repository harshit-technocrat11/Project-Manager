import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderKanban, CheckCircle, Clock, Flame } from "lucide-react";


export default function DashboardPage() {
  return (
    
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Project
          </Button>
        </div>

      </div>

  );
}
