import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage your profile and preferences.</p>
      </div>

      <div className="card p-6 space-y-4">
        <p className="font-semibold text-sm mb-1">Profile</p>
        <div>
          <label className="label">Username</label>
          <input className="input" value={user?.username || ""} disabled />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" value={user?.email || ""} disabled />
        </div>
        <p className="text-xs text-muted">
          Profile editing isn't available yet — the backend doesn't expose an update endpoint.
        </p>
      </div>

      <div className="card p-6">
        <p className="font-semibold text-sm mb-1">Session</p>
        <p className="text-xs text-muted mb-4">Sign out of CareerPilot AI on this device.</p>
        <button onClick={handleLogout} className="btn-secondary">Log out</button>
      </div>
    </div>
  );
}
