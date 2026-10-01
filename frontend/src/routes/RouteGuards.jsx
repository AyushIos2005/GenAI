import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function FullScreenSpinner() {
  return (
    <div className="min-h-screen bg-bg grid place-items-center">
      <div className="h-8 w-8 rounded-full border-2 border-border border-t-primary animate-spin" />
    </div>
  );
}

// Wrap routes that require a logged-in user (the /app/* section).
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullScreenSpinner />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}

// Wrap /login and /register so a logged-in user gets bounced to the dashboard.
export function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenSpinner />;
  if (user) return <Navigate to="/app/dashboard" replace />;
  return children;
}
