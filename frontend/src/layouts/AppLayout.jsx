import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import MobileNav from "../components/MobileNav.jsx";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="flex-1 min-w-0 pb-24 md:pb-0">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-8">
          <Outlet />
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
