import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left fixed part*/}
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        {/*Dynamic RIGHT part and page content is rendered here --> like <Dashboard/>  */}

        <Outlet />   {/*any changes made will be reflected inside main portion   */}
      </main>
    </div>
  );
}
