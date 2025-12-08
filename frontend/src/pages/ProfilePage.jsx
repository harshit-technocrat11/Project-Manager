import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function ProfilePage() {
  const { user, logoutUser } = useAuth();

  // UI-only editable fields
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  // Stats placeholders → connect backend later
  const stats = {
    projects: 5,
    completedTasks: 18,
    pendingTasks: 6,
  };

  const handleUpdateProfile = () => {
    console.log("Update profile:", { name });
    // Later: call backend → api.patch('/users/profile', {...})
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">
      {/* HEADER */}
      <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>

      {/* PROFILE CARD */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl">Account Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatarUrl} alt="User" />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-lg font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                className="mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input className="mt-1" value={email} disabled />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleUpdateProfile}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* STATS CARD */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl">Your Activity</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 border rounded-lg">
            <p className="text-2xl font-bold">{stats.projects}</p>
            <p className="text-sm text-muted-foreground">Projects</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-2xl font-bold">{stats.completedTasks}</p>
            <p className="text-sm text-muted-foreground">Tasks Completed</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-2xl font-bold">{stats.pendingTasks}</p>
            <p className="text-sm text-muted-foreground">Pending Tasks</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
