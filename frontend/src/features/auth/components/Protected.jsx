import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Protected({ children }) {
  const { status } = useAuth();

  if (status === "checking") {
    return (
      <div className="screen-center">
        <div className="led led--pending" />
        <p className="mono muted">verifying session…</p>
      </div>
    );
  }

  if (status === "signed-out") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
