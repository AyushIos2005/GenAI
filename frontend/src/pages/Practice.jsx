import { Mic, Bot } from "lucide-react";
import { user } from "../data/mock.js";

export default function Practice() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center">
        <div className="h-12 w-12 rounded-2xl bg-brand-gradient grid place-items-center mx-auto mb-4">
          <Bot size={22} className="text-white" />
        </div>
        <h1 className="font-display text-xl font-bold">AI Interviewer</h1>
        <p className="text-xs text-muted mt-1">Practice out loud, in real time.</p>
      </div>

      <div className="card p-6">
        <p className="text-sm leading-relaxed">
          Hi {user.name}, let's begin.
          <br />
          <br />
          Tell me about yourself and your experience with React.
        </p>
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold">
          <Mic size={16} /> Start Recording
        </button>
      </div>

      <p className="text-center text-xs text-muted">
        Voice input, live feedback, and a full interview score are coming soon.
      </p>
    </div>
  );
}
