import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download, Plus, ArrowUpRight, ChevronRight, Bot, Loader2, AlertTriangle } from "lucide-react";
import ScoreRing from "../components/ui/ScoreRing.jsx";
import QuestionAccordion from "../components/ui/QuestionAccordion.jsx";
import api from "../lib/api.js";

const severityColor = {
  low: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  medium: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  high: "text-red-400 border-red-400/30 bg-red-400/10",
};

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function Report() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    api
      .get(`/interview/report/${id}`)
      .then(({ data }) => {
        if (!cancelled) setReport(data.interviewReport);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await api.post(`/interview/resume/pdf/${id}`, null, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message || "Could not download the resume PDF.");
    } finally {
      setDownloading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={22} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertTriangle size={22} className="text-red-400 mb-3" />
        <p className="text-sm text-muted mb-4">{error || "Report not found."}</p>
        <Link to="/app/reports" className="btn-secondary">Back to reports</Link>
      </div>
    );
  }

  const score = report.matchScore ?? 0;
  const matchLabel = score >= 75 ? "Strong Match" : score >= 50 ? "Good Match" : "Needs Work";

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Interview Analysis</h1>
          <p className="text-sm text-muted mt-1">
            Generated {formatDate(report.createdAt)}
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleDownload} disabled={downloading} className="btn-secondary disabled:opacity-60">
            {downloading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />} Download Resume
          </button>
          <Link to="/app/analyze" className="btn-primary">
            <Plus size={15} /> New Analysis
          </Link>
        </div>
      </div>

      {/* A. Match Score */}
      <section className="card p-8 flex flex-col md:flex-row items-center gap-8">
        <ScoreRing score={score} />
        <div className="flex-1 text-center md:text-left">
          <span className="pill mb-2">{matchLabel}</span>
          <p className="text-sm text-muted max-w-md leading-relaxed">
            Your profile matches <span className="text-white font-semibold">{score}%</span> of the job
            requirements. Review the skill gaps and questions below to close the distance.
          </p>
          <Link
            to="/app/analyze/practice"
            className="inline-flex items-center gap-1.5 text-sm text-primary mt-4 hover:underline"
          >
            <Bot size={15} /> Try an AI mock interview <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* B. Skill Gap Analysis */}
      {report.skillGaps?.length > 0 && (
        <section className="card p-6">
          <p className="font-semibold text-sm mb-5">Skill Gap Analysis</p>
          <div className="space-y-2">
            {report.skillGaps.map((g) => (
              <div key={g.skill} className="flex items-center justify-between rounded-lg border border-border bg-card2 px-3 py-2">
                <span className="text-sm">{g.skill}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${severityColor[g.severity] || severityColor.medium}`}>
                  {g.severity}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* C. Technical Questions */}
      {report.technicalQuestions?.length > 0 && (
        <section>
          <p className="font-semibold text-sm mb-4">Technical Questions</p>
          <div className="space-y-2.5">
            {report.technicalQuestions.map((q, i) => (
              <QuestionAccordion key={q.question} index={i} question={q.question} meta={q.intention}>
                <p><span className="text-white font-medium">Suggested answer: </span>{q.answer}</p>
              </QuestionAccordion>
            ))}
          </div>
        </section>
      )}

      {/* D. Behavioral Questions */}
      {report.behavioralQuestions?.length > 0 && (
        <section>
          <p className="font-semibold text-sm mb-4">Behavioral Questions</p>
          <div className="space-y-2.5">
            {report.behavioralQuestions.map((q, i) => (
              <QuestionAccordion key={q.question} index={i} question={q.question} meta={q.intention}>
                <p><span className="text-white font-medium">Suggested answer: </span>{q.answer}</p>
              </QuestionAccordion>
            ))}
          </div>
        </section>
      )}

      {/* Prep plan teaser */}
      {report.preparationPlan?.length > 0 && (
        <section className="card p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-semibold text-sm mb-1">{report.preparationPlan.length}-Day Preparation Plan</p>
            <p className="text-xs text-muted">Personalized from your skill gaps</p>
          </div>
          <Link to="/app/preparation" className="btn-secondary">
            View plan <ArrowUpRight size={15} />
          </Link>
        </section>
      )}
    </div>
  );
}
