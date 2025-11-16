import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        {/* page content goes here --> like <Dashboard/>  */}
        <Outlet/>
        
        </main>
    </div>
  );
}
