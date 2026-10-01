import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Analyze from "./pages/Analyze.jsx";
import Processing from "./pages/Processing.jsx";
import Report from "./pages/Report.jsx";
import Preparation from "./pages/Preparation.jsx";
import History from "./pages/History.jsx";
import Settings from "./pages/Settings.jsx";
import Practice from "./pages/Practice.jsx";
import { ProtectedRoute, PublicOnlyRoute } from "./routes/RouteGuards.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
      <Route
        path="/app/analyze/processing"
        element={
          <ProtectedRoute>
            <Processing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analyze" element={<Analyze />} />
        <Route path="analyze/practice" element={<Practice />} />
        <Route path="reports" element={<History />} />
        <Route path="reports/:id" element={<Report />} />
        <Route path="preparation" element={<Preparation />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
