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
        <p className="font-display text-xl leading-relaxed text-foreground/80 mb-8 rise-in">{intro}</p>
      )}

      <div className="flex-1 flex flex-col justify-center min-h-[40vh]">
        {step.letter && (
          <div className="flex justify-center mb-8">
            <span className="font-display text-6xl text-gold/70 soft-pulse">{step.letter}</span>
          </div>
        )}
        {step.title && <h2 className="font-display text-2xl text-center text-foreground mb-4">{step.title}</h2>}
        <p className="font-body text-lg leading-relaxed text-foreground/85 text-center max-w-md mx-auto">{step.text}</p>

        {step.kind === "input" && (
          <div className="mt-8 max-w-md w-full mx-auto">
            {step.multiline ? (
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={step.placeholder}
                rows={5}
                className="w-full rounded-2xl border border-border bg-card/70 px-5 py-4 text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 transition resize-none"
              />
            ) : (
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={step.placeholder}
                className="w-full rounded-2xl border border-border bg-card/70 px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15 transition"
              />
            )}
          </div>
        )}

        {step.kind === "choice" && (
          <div className="mt-8 space-y-3 max-w-md w-full mx-auto">
            {step.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleChoice(opt)}
                className={cn(
                  "w-full text-right rounded-2xl border border-border bg-card/60 px-5 py-4 text-lg text-foreground",
                  "hover:border-gold/40 hover:bg-card transition-all duration-300"
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
              "rounded-full px-8 py-3.5 text-lg font-medium transition-all duration-300",
              "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
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