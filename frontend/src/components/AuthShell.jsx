import { Link } from "react-router-dom";
import { Compass, ShieldCheck, Sparkles, Target } from "lucide-react";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-bg flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-border">
        <div className="absolute inset-0 bg-brand-gradient opacity-[0.12]" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-brand-gradient">
              <Compass size={18} className="text-white" />
            </div>
            <span className="font-display font-bold tracking-tight">
              CareerPilot <span className="text-primary">AI</span>
            </span>
          </Link>

          <div className="max-w-sm">
            <h2 className="font-display text-3xl font-bold leading-tight mb-4">
              Walk into every interview already prepared.
            </h2>
            <div className="space-y-4 mt-8">
              {[
                { icon: Target, text: "Know your match score before you apply." },
                { icon: Sparkles, text: "Get questions tailored to the real job description." },
                { icon: ShieldCheck, text: "Your resume stays private, always." },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-card2 border border-border grid place-items-center shrink-0">
                    <Icon size={15} className="text-primary" />
                  </div>
                  <p className="text-sm text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted">© {new Date().getFullYear()} CareerPilot AI</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-brand-gradient">
              <Compass size={18} className="text-white" />
            </div>
            <span className="font-display font-bold tracking-tight">
              CareerPilot <span className="text-primary">AI</span>
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold mb-1.5">{title}</h1>
          <p className="text-sm text-muted mb-8">{subtitle}</p>
          {children}
          {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
