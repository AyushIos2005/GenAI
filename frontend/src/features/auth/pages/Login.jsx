import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import AccessCard from "../../../components/AccessCard.jsx";
import "../services/auth.form.scss";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen-center">
      <AccessCard eyebrow="access · sign in" title="Enter your credentials" ledState={error ? "error" : "idle"}>
        <form className="form" onSubmit={onSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@company.com"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              required
            />
          </label>

          {error && <p className="alert">{error}</p>}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Checking…" : "Sign in"}
          </button>
        </form>

        <p className="switch-line">
          No badge yet? <Link to="/register">Request access</Link>
        </p>
      </AccessCard>
    </div>
  );
}
