import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function QuestionAccordion({ index, question, meta, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card2 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 px-4 py-4 text-left"
      >
        <span className="text-xs font-mono text-muted mt-0.5 shrink-0">{String(index + 1).padStart(2, "0")}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{question}</p>
          {meta && <p className="text-xs text-muted mt-1">{meta}</p>}
        </div>
        <ChevronDown
          size={16}
          className={`text-muted shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-4 pb-4 pl-10 text-sm text-muted leading-relaxed border-t border-border pt-3">{children}</div>}
    </div>
  );
}
