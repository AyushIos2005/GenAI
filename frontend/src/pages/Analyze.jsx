import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText, X, ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";

const steps = ["Resume", "Job", "Analyze"];

export default function Analyze() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [noJD, setNoJD] = useState(false);
  const [job, setJob] = useState({ title: "", company: "", description: "" });
  const [selfDescription, setSelfDescription] = useState("");
  const inputRef = useRef(null);

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  function handleFile(f) {
    if (f.type !== "application/pdf") return;
    if (f.size > 3 * 1024 * 1024) return;
    setFile(f);
  }

  const canNext =
    (step === 0 && file) ||
    (step === 1 && job.title && (noJD || job.description) && selfDescription.trim().length > 0) ||
    step === 2;

  function handleAnalyze() {
    // The backend expects a single jobDescription string and a resume file.
    // We fold title/company into the description so nothing the user typed is lost.
    const jobDescriptionParts = [
      job.title && `Role: ${job.title}`,
      job.company && `Company: ${job.company}`,
      noJD ? "No formal job description was provided." : job.description,
    ].filter(Boolean);

    navigate("/app/analyze/processing", {
      state: {
        file,
        selfDescription,
        jobDescription: jobDescriptionParts.join("\n\n"),
        jobTitle: job.title,
        jobCompany: job.company,
      },
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-bold mb-1">New Interview Analysis</h1>
      <p className="text-muted text-sm mb-8">Three steps to your personalized interview report.</p>

      {/* Stepper */}
      <div className="flex items-center mb-10">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`h-9 w-9 rounded-full grid place-items-center text-sm font-semibold border transition-colors ${
                  i < step
                    ? "bg-brand-gradient border-transparent text-white"
                    : i === step
                    ? "border-primary text-primary bg-card2"
                    : "border-border text-muted bg-card2"
                }`}
              >
                {i < step ? <Check size={16} /> : String(i + 1).padStart(2, "0")}
              </div>
              <span className={`text-xs ${i <= step ? "text-white" : "text-muted"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px flex-1 mx-3 ${i < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="card p-6 md:p-8">
        {step === 0 && (
          <div>
            <p className="font-semibold text-sm mb-1">Upload your resume</p>
            <p className="text-xs text-muted mb-5">PDF only, maximum 3 MB.</p>

            {!file ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={`rounded-xl border-2 border-dashed px-6 py-14 text-center cursor-pointer transition-colors ${
                  dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <UploadCloud size={30} className="mx-auto text-primary mb-3" />
                <p className="text-sm font-medium">Drag and drop your resume here</p>
                <p className="text-xs text-muted mt-1">or click to browse · PDF, up to 3 MB</p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card2 px-4 py-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/15 grid place-items-center shrink-0">
                  <FileText size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button onClick={() => setFile(null)} className="text-muted hover:text-white p-1">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="label">Job Title</label>
              <input
                className="input"
                placeholder="e.g. Full Stack Developer"
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Company (optional)</label>
              <input
                className="input"
                placeholder="e.g. Nimbus Labs"
                value={job.company}
                onChange={(e) => setJob({ ...job, company: e.target.value })}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label !mb-0">Job Description</label>
                <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noJD}
                    onChange={(e) => setNoJD(e.target.checked)}
                    className="accent-primary"
                  />
                  I don't have a job description
                </label>
              </div>
              <textarea
                className="input min-h-[140px] resize-none disabled:opacity-40"
                placeholder="Paste the job description here..."
                disabled={noJD}
                value={job.description}
                onChange={(e) => setJob({ ...job, description: e.target.value })}
              />
            </div>
            <div>
              <label className="label">About you</label>
              <textarea
                className="input min-h-[100px] resize-none"
                placeholder="A couple of sentences about your background and experience..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="font-semibold text-sm mb-5">Review your details</p>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-card2 px-4 py-3 flex items-center gap-3">
                <FileText size={16} className="text-primary" />
                <span className="text-sm">{file?.name || "No resume uploaded"}</span>
              </div>
              <div className="rounded-lg border border-border bg-card2 px-4 py-3">
                <p className="text-sm font-medium">{job.title || "Untitled role"}</p>
                {job.company && <p className="text-xs text-muted mt-0.5">{job.company}</p>}
                <p className="text-xs text-muted mt-2 line-clamp-3">
                  {noJD ? "No job description provided." : job.description || "—"}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card2 px-4 py-3">
                <p className="text-xs text-muted mb-1">About you</p>
                <p className="text-sm line-clamp-3">{selfDescription || "—"}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => (step === 0 ? navigate("/app/dashboard") : setStep(step - 1))}
          className="btn-secondary"
        >
          <ArrowLeft size={16} /> {step === 0 ? "Cancel" : "Back"}
        </button>

        {step < 2 ? (
          <button disabled={!canNext} onClick={() => setStep(step + 1)} className="btn-primary disabled:opacity-40 disabled:pointer-events-none">
            Continue <ArrowRight size={16} />
          </button>
        ) : (
          <button onClick={handleAnalyze} className="btn-primary">
            <Sparkles size={16} /> Analyze
          </button>
        )}
      </div>
    </div>
  );
}
