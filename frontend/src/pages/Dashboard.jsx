import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Plus, TrendingUp, FileText, Sparkles, ClipboardCheck, ChevronRight, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../lib/api.js";

const statIcons = [TrendingUp, FileText, Sparkles, ClipboardCheck];

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function Dashboard() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/interview/reports/interview")
      .then(({ data }) => setReports(data.interviewReports || []))
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const sorted = [...reports].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recent = sorted.slice(0, 4);

  const avgScore = reports.length
    ? Math.round(reports.reduce((sum, r) => sum + (r.matchScore || 0), 0) / reports.length)
    : 0;
  const skillGapCount = new Set(reports.flatMap((r) => (r.skillGaps || []).map((g) => g.skill))).size;

  const stats = [
    { label: "Career Score", value: String(avgScore), suffix: "/100" },
    { label: "Reports Generated", value: String(reports.length) },
    { label: "Skill Gaps Found", value: String(skillGapCount) },
  ];

  // Oldest-to-newest match score trend, for the chart.
  const trendData = [...reports]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((r, i) => ({ name: `#${i + 1}`, score: r.matchScore || 0 }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">
            {greeting}{user ? `, ${user.username}` : ""} 👋
          </h1>
          <p className="text-muted text-sm mt-1">Ready to become interview-ready?</p>
        </div>
        <Link to="/app/analyze" className="btn-primary">
          <Plus size={16} /> New Interview Analysis
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={20} className="animate-spin text-primary" />
        </div>
      ) : reports.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-sm text-muted mb-4">Run your first analysis to see your dashboard fill up.</p>
          <Link to="/app/analyze" className="btn-primary inline-flex">
            <Plus size={16} /> New Interview Analysis
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((s, i) => {
              const Icon = statIcons[i];
              return (
                <div key={s.label} className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-8 w-8 rounded-lg bg-card2 border border-border grid place-items-center">
                      <Icon size={15} className="text-primary" />
                    </div>
                  </div>
                  <p className="font-display text-2xl font-bold tabular-nums">
                    {s.value}
                    {s.suffix && <span className="text-muted text-base">{s.suffix}</span>}
                  </p>
                  <p className="text-xs text-muted mt-1">{s.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-sm">Recent Analyses</p>
                <Link to="/app/reports" className="text-xs text-primary flex items-center gap-1 hover:underline">
                  View all <ChevronRight size={13} />
                </Link>
              </div>
              <div className="divide-y divide-border mt-3">
                {recent.map((r) => (
                  <Link
                    key={r._id}
                    to={`/app/reports/${r._id}`}
                    className="flex items-center justify-between py-3.5 group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        {r.jobDescription?.split("\n")[0]?.replace(/^Role:\s*/, "") || "Interview Analysis"}
                      </p>
                      <p className="text-xs text-muted">{formatDate(r.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold tabular-nums">{r.matchScore ?? "—"}%</span>
                      <ChevronRight size={15} className="text-muted" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="card p-6 flex flex-col">
              <p className="font-semibold text-sm mb-4">Career Score Trend</p>
              <div className="flex-1 min-h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C5CFC" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#7C5CFC" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" hide />
                    <Tooltip
                      contentStyle={{ background: "#15171D", border: "1px solid #24262D", borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: "#8A8F98" }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#7C5CFC" strokeWidth={2} fill="url(#trend)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted mt-2">Across your last {trendData.length} analyses</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
