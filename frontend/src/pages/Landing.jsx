import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Compass,
  Target,
  MessagesSquare,
  Brain,
  PuzzleIcon,
  CalendarCheck2,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import ScoreRing from "../components/ui/ScoreRing.jsx";

const features = [
  { icon: Brain, title: "AI Resume Analysis", desc: "Parses your resume and understands your real experience, not just keywords." },
  { icon: Target, title: "Job Match Score", desc: "See exactly how well you fit a role before you apply or walk into the room." },
  { icon: MessagesSquare, title: "Technical Questions", desc: "Role-specific questions with the reasoning behind every ideal answer." },
  { icon: PuzzleIcon, title: "Behavioral Questions", desc: "STAR-ready prompts that map to what the interviewer is really testing." },
  { icon: Compass, title: "Skill Gap Detection", desc: "A precise list of what's missing between your resume and the job." },
  { icon: CalendarCheck2, title: "7-Day Preparation Plan", desc: "A day-by-day plan that turns gaps into a study routine you'll finish." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid place-items-center h-8 w-8 rounded-lg bg-brand-gradient">
            <Compass size={18} className="text-white" />
          </div>
          <span className="font-display font-bold tracking-tight">
            CareerPilot <span className="text-primary">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-muted hover:text-white transition-colors px-3 py-2">
            Log in
          </Link>
          <Link to="/register" className="btn-primary">
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Personal AI Interview Coach
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
            Your AI-Powered
            <br />
            Interview <span className="bg-brand-gradient bg-clip-text text-transparent">Coach</span>.
          </h1>
          <p className="mt-5 text-muted text-base sm:text-lg max-w-md leading-relaxed">
            Turn your resume into a personalized interview preparation strategy —
            match score, skill gaps, real questions, and a 7-day plan.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/register" className="btn-primary text-[15px] px-6 py-3">
              Analyze My Resume <ArrowRight size={16} />
            </Link>
            <button className="btn-secondary text-[15px] px-6 py-3">
              <PlayCircle size={16} /> View Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card p-6 relative"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-semibold">Interview Analysis</p>
              <p className="text-xs text-muted">Full Stack Developer · Nimbus Labs</p>
            </div>
            <span className="pill">Strong Match</span>
          </div>
          <div className="flex justify-center py-4">
            <ScoreRing score={82} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            {["React", "Docker", "AWS"].map((s, i) => (
              <div key={s} className="rounded-lg border border-border bg-card2 px-3 py-2 text-center">
                <p className="text-xs text-muted">{s}</p>
                <p className="text-sm font-semibold mt-0.5">{[92, 48, 55][i]}%</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="font-display text-2xl font-bold text-center mb-2">
          Everything you need before you walk in
        </h2>
        <p className="text-muted text-center mb-12 text-sm">
          One upload turns into a complete preparation strategy.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-5 hover:border-primary/40 transition-colors">
              <div className="h-9 w-9 rounded-lg bg-card2 border border-border grid place-items-center mb-4">
                <Icon size={17} className="text-primary" />
              </div>
              <p className="font-semibold text-sm mb-1.5">{title}</p>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <p className="text-center text-xs text-muted">
          CareerPilot AI — Resume Analyzer + Job Match + Question Generator + Preparation Planner.
        </p>
      </footer>
    </div>
  );
}
