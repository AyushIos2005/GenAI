import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertTriangle } from "lucide-react";
import api from "../lib/api.js";

const steps = [
  "Reading your resume",
  "Understanding job requirements",
  "Comparing your skills",
  "Generating interview questions",
  "Building preparation plan",
];

export default function Processing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(0);
  const [error, setError] = useState("");
  const started = useRef(false);

  const submission = location.state;

  useEffect(() => {
    // No file in state means the user landed here directly (e.g. refresh) — bounce back.
    if (!submission?.file) {
      navigate("/app/analyze", { replace: true });
      return;
    }
    if (started.current) return;
    started.current = true;

    const formData = new FormData();
    formData.append("resume", submission.file);
    formData.append("selfDescription", submission.selfDescription);
    formData.append("jobDescription", submission.jobDescription);

    // Animate through the step list while the real request is in flight,
    // and only navigate once both are done.
    const stepTimer = setInterval(() => {
      setActive((a) => (a < steps.length - 1 ? a + 1 : a));
    }, 900);

    api
      .post("/interview", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        clearInterval(stepTimer);
        setActive(steps.length);
        const id = data.interviewReport?._id;
        setTimeout(() => {
          navigate(id ? `/app/reports/${id}` : "/app/reports", { replace: true });
        }, 500);
      })
      .catch((err) => {
        clearInterval(stepTimer);
        setError(err.message);
      });

    return () => clearInterval(stepTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-red-400/10 border border-red-400/30 grid place-items-center">
            <AlertTriangle size={24} className="text-red-400" />
          </div>
          <h1 className="font-display text-xl font-bold mb-2">Analysis failed</h1>
          <p className="text-sm text-muted mb-6">{error}</p>
          <button onClick={() => navigate("/app/analyze")} className="btn-primary mx-auto">
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="relative mx-auto mb-8 h-16 w-16">
          <motion.div
            className="absolute inset-0 rounded-2xl bg-brand-gradient"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            style={{ opacity: 0.25 }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <Loader2 size={26} className="animate-spin text-primary" />
          </div>
        </div>

        <h1 className="font-display text-xl font-bold mb-1">Analyzing your profile…</h1>
        <p className="text-sm text-muted mb-8">This usually takes about 20 seconds.</p>

        <div className="card p-5 text-left space-y-4">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full grid place-items-center shrink-0 border border-border bg-card2">
                <AnimatePresence mode="wait" initial={false}>
                  {i < active ? (
                    <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check size={13} className="text-primary" />
                    </motion.div>
                  ) : i === active ? (
                    <motion.div key="active" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Loader2 size={13} className="text-primary" />
                    </motion.div>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />
                  )}
                </AnimatePresence>
              </div>
              <span className={`text-sm ${i <= active ? "text-white" : "text-muted"}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
