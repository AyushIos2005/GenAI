import { Check } from "lucide-react";
import { prepPlan } from "../data/mock.js";

export default function Preparation() {
  const done = prepPlan.filter((d) => d.done).length;
  const pct = Math.round((done / prepPlan.length) * 100);

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold">7-Day Preparation Plan</h1>
        <p className="text-sm text-muted mt-1">A focused daily plan built from your skill gaps.</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Preparation Progress</p>
          <p className="text-sm font-semibold tabular-nums">{pct}%</p>
        </div>
        <div className="h-2 rounded-full bg-card2 overflow-hidden">
          <div className="h-full bg-brand-gradient rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-muted mt-2">{done} / {prepPlan.length} Days Completed</p>
      </div>

      <div className="relative pl-8">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
        <div className="space-y-6">
          {prepPlan.map((d) => (
            <div key={d.day} className="relative">
              <div
                className={`absolute -left-8 top-0.5 h-8 w-8 rounded-full grid place-items-center border ${
                  d.done ? "bg-brand-gradient border-transparent" : "bg-card2 border-border"
                }`}
              >
                {d.done ? (
                  <Check size={14} className="text-white" />
                ) : (
                  <span className="text-xs font-semibold text-muted">{d.day}</span>
                )}
              </div>
              <div className="card p-5 ml-2">
                <p className="text-xs text-muted mb-1">DAY {String(d.day).padStart(2, "0")}</p>
                <p className="font-semibold text-sm mb-3">{d.focus}</p>
                <ul className="space-y-1.5">
                  {d.tasks.map((t) => (
                    <li key={t} className="text-sm text-muted flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-muted shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
