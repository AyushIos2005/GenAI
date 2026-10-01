import { NavLink } from "react-router-dom";
import { LayoutDashboard, Sparkles, FileText, User } from "lucide-react";

const items = [
  { to: "/app/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/app/analyze", label: "Analyze", icon: Sparkles },
  { to: "/app/reports", label: "Reports", icon: FileText },
  { to: "/app/settings", label: "Profile", icon: User },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border grid grid-cols-4">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium ${
              isActive ? "text-white" : "text-muted"
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
