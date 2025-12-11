import React from "react";

import { Badge, Kanban } from "lucide-react";

import { FolderKanban, CheckCircle, Clock, Flame ,CheckSquare} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/dashboard/StatCard";

import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { toast } from "sonner";

export default function DashboardPage() {
  const [projects, setProjects] = useState(null)
  const [overdue, setOverdue]= useState([])
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedTasks: 0,
    pendingTasks: 0,
    dueToday: 0,
  });

  useEffect(() => {
    fetchStats();
    LoadOverDueTasks();
  }, []);

  const user  = JSON.parse(localStorage.getItem("user"))

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard/stats");

      console.log("user projects:", res.data.projects)
      setProjects(res.data.projects)
      setStats(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load stats");
    }
  };
  const LoadOverDueTasks =  async () => {
     try {
       const res = await api.get("/dashboard/overdue");
       setOverdue(res.data.overdue);
     } catch (err) {
       console.error("Overdue fetch error:", err);
     }
  }

  

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="flex items-baseline gap-3">
        <h4 className=" text-gray-600 text-2xl">Welcome,</h4>
        <h2
          className="text-2xl font-semibold text-purple-600 tracking-tight"
          aria-label={`Logged in user ${user?.name ?? "user"}`}
        >
          {user?.name} 👋
        </h2>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          desc="Across all categories"
          icon={<Kanban />}
        />

        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          desc="Great productivity!"
          icon={<CheckSquare />}
        />

        <StatCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          desc="Tasks awaiting action"
          icon={<Clock />}
        />

        <StatCard
          title="Due Today"
          value={stats.dueToday}
          desc="Complete before end of day"
          icon="🔥"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">⚠️ Overdue Tasks</h2>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          {overdue.length === 0 ? (
            <p className="text-gray-500">No overdue tasks 🎉</p>
          ) : (
            <ul className="space-y-4">
              {overdue.map((t) => (
                <li
                  key={t._id}
                  className="flex items-center justify-between border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="font-medium text-red-600">{t.title}</p>
                    <p className="text-sm text-gray-600">
                      Project: {t.project?.title}
                    </p>
                  </div>

                  <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">
                    Due: {t.dueDate?.slice(0, 10)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
