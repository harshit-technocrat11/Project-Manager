import { Link, useLocation } from "react-router-dom";
import { Home, FolderKanban, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { name: "Projects", path: "/projects", icon: <FolderKanban size={18} /> },

    { name: "Profile", path: "/profile", icon: <User size={18} /> },
  ];

  const { logoutUser } = useAuth();


    // defining side bar structure
  return (
    <aside className="w-64 h-full bg-card border-r p-6 flex flex-col">
      <h1 className="text-xl font-bold mb-8">Project Manager</h1>

      <nav className="space-y-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`
              flex items-center gap-3 p-2 rounded-md transition
              ${
                location.pathname === link.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              }
            `}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}

        <button
          onClick={logoutUser}
          className="flex items-center gap-2 p-2 rounded-md mt-4 text-red-500 hover:bg-red-100"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </aside>
  );
}
