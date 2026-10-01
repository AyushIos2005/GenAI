import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Plus, Loader2, AlertTriangle } from "lucide-react";
import api from "../lib/api.js";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function History() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/interview/reports/interview")
      .then(({ data }) => setReports(data.interviewReports || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">My Reports</h1>
          <p className="text-sm text-muted mt-1">Every interview analysis you've generated.</p>
        </div>
        <Link to="/app/analyze" className="btn-primary">
          <Plus size={16} /> New Analysis
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={20} className="animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="card p-8 text-center">
          <AlertTriangle size={20} className="text-red-400 mx-auto mb-2" />
          <p className="text-sm text-muted">{error}</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-sm text-muted mb-4">You haven't generated any reports yet.</p>
          <Link to="/app/analyze" className="btn-primary inline-flex">
            <Plus size={16} /> New Analysis
          </Link>
        </div>
      ) : (
        <div className="card divide-y divide-border">
          {reports.map((r) => (
            <Link
              key={r._id}
              to={`/app/reports/${r._id}`}
              className="flex items-center justify-between px-5 py-4 group"
            >
              <div>
                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                  {r.jobDescription?.split("\n")[0]?.replace(/^Role:\s*/, "") || "Interview Analysis"}
                </p>
                <p className="text-xs text-muted mt-0.5">{formatDate(r.createdAt)}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold tabular-nums">{r.matchScore ?? "—"}%</span>
                <ChevronRight size={16} className="text-muted" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
