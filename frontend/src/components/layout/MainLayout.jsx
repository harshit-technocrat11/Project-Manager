import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function MainLayout() {
  return (
    <div className="w-full h-screen flex flex-col">
     
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-50">
        <Sheet>
          <SheetTrigger className="p-2">
            <Menu className="w-6 h-6" />
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <span className="font-semibold text-lg">Project Manager</span>
      </div>

 
      <div className="hidden md:flex flex-1 w-full">
        {/* Sticky Sidebar */}
        <aside className="w-64 h-screen fixed left-0 top-0 border-r bg-white">
          <Sidebar />
        </aside>

    
        <main className="flex-1 ml-70 h-screen overflow-y-auto px-4 sm:px-6 lg:px-10 py-6">
          <Outlet />
        </main>
      </div>

  
      <div className="md:hidden flex-1 overflow-y-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
}
