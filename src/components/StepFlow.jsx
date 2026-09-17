import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// רכיב גנרי להרצת שלבים עוקבים: טקסט / קלט / בחירה.
// steps: [{ kind: 'text'|'input'|'choice', key?, text, placeholder?, optional?, multiline?, options?, letter?, title? }]
// onComplete(values) — נקראת בסיום עם אוסף הערכים שנאספו.
export default function StepFlow({ steps, onComplete, intro, backLabel = "הקודם", nextLabel = "הבא", finishLabel = "סיום", storageKey }) {
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState(() => {
    if (storageKey) {
      try {
        const saved = sessionStorage.getItem(storageKey);
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [draft, setDraft] = useState("");

  const step = steps[index];
  const isLast = index === steps.length - 1;

  const persist = (next) => {
    const updated = { ...values };
    if (step.kind === "input" && draft.trim()) updated[step.key] = draft.trim();
    if (step.kind === "choice" && step.options) {
      // choice handled via direct click
    }
    setValues(updated);
    if (storageKey) {
      try { sessionStorage.setItem(storageKey, JSON.stringify(updated)); } catch {}
    }
    if (isLast) {
      onComplete(updated);
    } else {
      setIndex(next ?? index + 1);
      setDraft("");
    }
  };

  const goNext = () => persist(index + 1);

  const goBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      setDraft(values[steps[index - 1]?.key] || "");
    }
  };

  const handleChoice = (option) => {
    const updated = { ...values, [step.key]: option.value };
    if (option.route) updated[`_route_${step.key}`] = option.route;
    setValues(updated);
    if (storageKey) {
      try { sessionStorage.setItem(storageKey, JSON.stringify(updated)); } catch {}
    }
    if (isLast) {
      onComplete(updated);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col fade-in" key={index}>
      {intro && index === 0 && (
        <p className="body-lead text-[1.1875rem] text-muted-foreground mb-10 reveal">{intro}</p>
      )}

      <div className="flex-1 flex flex-col justify-center min-h-[40vh]">
        {step.letter && (
          <div className="flex justify-center mb-10">
            <span className="display-hero text-[5rem] text-primary soft-pulse">{step.letter}</span>
          </div>
        )}
        {step.title && (
          <h2 className="display-xl text-[1.875rem] sm:text-[2.25rem] text-center text-foreground mb-5">{step.title}</h2>
        )}
        <p className="body-lead text-[1.25rem] sm:text-[1.5rem] text-foreground text-center max-w-lg mx-auto tracking-tight">{step.text}</p>

        {step.kind === "input" && (
          <div className="mt-10 max-w-lg w-full mx-auto">
            {step.multiline ? (
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={step.placeholder}
                rows={5}
                className="w-full rounded-2xl bg-card elev-card px-5 py-4 text-[1.125rem] leading-relaxed text-foreground placeholder:text-muted-foreground/50 border border-transparent focus:outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/10 transition-all duration-300 resize-none"
              />
            ) : (
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={step.placeholder}
                className="w-full rounded-2xl bg-card elev-card px-5 py-4 text-[1.125rem] text-foreground placeholder:text-muted-foreground/50 border border-transparent focus:outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/10 transition-all duration-300"
              />
            )}
          </div>
        )}

        {step.kind === "choice" && (
          <div className="mt-10 space-y-3 max-w-lg w-full mx-auto">
            {step.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleChoice(opt)}
                className={cn(
                  "w-full text-right rounded-2xl bg-card elev-card px-6 py-5 text-[1.125rem] font-medium tracking-tight text-foreground",
                  "hover:elev-card-hover hover:-translate-y-0.5 active:scale-[0.985] transition-all duration-500 ease-apple"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {step.kind !== "choice" && (
        <div className="flex items-center justify-between mt-10">
          <div>
            {index > 0 && (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                {backLabel}
              </button>
            )}
          </div>
          <button
            onClick={goNext}
            className={cn(
              "rounded-full px-9 py-3.5 text-[1.0625rem] font-medium tracking-tight",
              "bg-primary text-primary-foreground transition-all duration-500 ease-apple hover:brightness-110 active:scale-[0.97]"
            )}
          >
            {isLast ? finishLabel : nextLabel}
          </button>
        </div>
      )}

      {step.kind === "choice" && index > 0 && (
        <div className="mt-8">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {backLabel}
          </button>
        </div>
      )}
    </div>
  );
}