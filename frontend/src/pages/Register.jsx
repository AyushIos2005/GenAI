import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import AuthShell from "../components/AuthShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form.username, form.email, form.password);
      navigate("/app/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start turning your resume into an interview strategy."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-white font-medium hover:text-primary">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}
        <div>
          <label className="label" htmlFor="username">Username</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="username"
              required
              placeholder="ayushverma"
              className="input pl-10"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input pl-10"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="input pl-10"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full mt-2 disabled:opacity-60">
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <>Create account <ArrowRight size={16} /></>}
        </button>
      </form>
    </AuthShell>
  );
}
