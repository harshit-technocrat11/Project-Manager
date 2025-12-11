import React from "react";

import { Badge, Kanban } from "lucide-react";

import { FolderKanban, CheckCircle, Clock, Flame ,CheckSquare} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/dashboard/StatCard";

import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { toast } from "sonner";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedTasks: 0,
    pendingTasks: 0,
    dueToday: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load stats");
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          desc="Across all categories"
          icon={<Kanban/>}
        />

        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          desc="Great productivity!"
          icon={<CheckSquare/>}
        />

        <StatCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          desc="Tasks awaiting action"
          icon={<Clock/>}
        />

        <StatCard
          title="Due Today"
          value={stats.dueToday}
          desc="Complete before end of day"
          icon="🔥"
        />
      </div>
    </div>
  );
}
