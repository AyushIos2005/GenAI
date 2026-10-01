import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  ListChecks,
  Settings,
  LogOut,
  Compass,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/analyze", label: "New Analysis", icon: Sparkles },
  { to: "/app/reports", label: "My Reports", icon: FileText },
  { to: "/app/preparation", label: "Preparation", icon: ListChecks },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-border bg-card min-h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="grid place-items-center h-8 w-8 rounded-lg bg-brand-gradient">
          <Compass size={18} className="text-white" />
        </div>
        <span className="font-display font-bold text-[15px] tracking-tight">
          CareerPilot <span className="text-primary">AI</span>
        </span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-card2 text-white border border-border"
                  : "text-muted hover:text-white hover:bg-card2/60"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6 pt-4 border-t border-border mx-3">
        {user && (
          <p className="px-3 text-xs text-muted truncate">
            Signed in as <span className="text-white">{user.username}</span>
          </p>
        )}
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-white hover:bg-card2/60 transition-colors"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
