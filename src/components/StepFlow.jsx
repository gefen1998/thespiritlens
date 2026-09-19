import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import BreathOrb from "@/components/BreathOrb";
import ActionButton from "@/components/ActionButton";
import ChoiceCard from "@/components/ChoiceCard";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toneIcons } from "@/lib/toneIcons";
import { cn } from "@/lib/utils";

// רכיב גנרי להרצת שלבים עוקבים: טקסט / קלט / בחירה.
// steps: [{ kind: 'text'|'input'|'choice', key?, text, placeholder?, optional?, multiline?, options?, letter?, title? }]
// onComplete(values) — נקראת בסיום עם אוסף הערכים שנאספו.
export default function StepFlow({
  steps,
  onComplete,
  intro,
  label,
  tone = "open",
  backLabel = "הקודם",
  nextLabel = "הבא",
  finishLabel = "סיום",
  storageKey,
}) {
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
  const pigment = `var(--pigment-${tone})`;
  const Icon = toneIcons[tone];

  const persist = (next) => {
    const updated = { ...values };
    if (step.kind === "input" && draft.trim()) updated[step.key] = draft.trim();
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

  const inputClasses =
    "h-auto w-full rounded-lg border-2 border-transparent bg-card px-5 py-4 t-practice text-foreground text-right shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-flame/50 transition-colors";

  return (
    <div className="flex-1 flex flex-col pb-24">
      <Progress
        value={((index + 1) / steps.length) * 100}
        className="h-1 bg-border/50 [&>div]:bg-flame [&>div]:transition-all [&>div]:duration-700"
      />
      {label && <p className="mt-5 t-micro text-muted-foreground text-right">{label}</p>}

      <div
        className="relative mt-5 flex-1 flex flex-col overflow-hidden rounded-3xl px-6 py-8 sm:px-10"
        style={{ backgroundColor: `hsl(${pigment} / 0.08)` }}
        key={index}
      >
        <Icon
          aria-hidden="true"
          strokeWidth={1.25}
          className="absolute -bottom-8 -left-8 w-40 h-40 pointer-events-none"
          style={{ color: `hsl(${pigment} / 0.10)` }}
        />
        <div className="relative fade-in flex-1 flex flex-col justify-center items-start text-right">
          {intro && index === 0 && <p className="t-lead text-muted-foreground max-w-md mb-10">{intro}</p>}

          {step.letter && (
            <div className="mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center soft-pulse"
                style={{ backgroundColor: `hsl(${pigment})` }}
              >
                <span className="font-display text-3xl font-bold leading-none text-white">{step.letter}</span>
              </div>
            </div>
          )}

          {step.title && <h2 className="t-title text-foreground mb-4">{step.title}</h2>}

          <p className="t-practice text-foreground max-w-md text-balance">{step.text}</p>

          {step.kind === "input" && (
            <div className="mt-10 w-full max-w-md">
              {step.multiline ? (
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={step.placeholder}
                  rows={3}
                  className={cn(inputClasses, "resize-none leading-relaxed")}
                />
              ) : (
                <Input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={step.placeholder}
                  className={inputClasses}
                />
              )}
              {step.optional && (
                <p className="mt-3 t-micro text-muted-foreground">אפשר גם להמשיך בלי לכתוב</p>
              )}
            </div>
          )}

          {step.kind === "choice" && (
            <div className="mt-10 w-full max-w-md">
              {step.options.map((opt) => (
                <ChoiceCard key={opt.value} label={opt.label} onClick={() => handleChoice(opt)} />
              ))}
            </div>
          )}

          {!step.letter && step.kind === "text" && (
            <div className="mt-10 self-center">
              <BreathOrb size={72} tone={pigment} />
            </div>
          )}
        </div>
      </div>

      {step.kind !== "choice" && (
        <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background via-background/95 to-transparent pt-8">
          <div className="max-w-xl mx-auto px-5 pb-6 flex items-center justify-between gap-4">
            {index > 0 ? (
              <button
                onClick={goBack}
                className="flex items-center gap-1 t-small text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
                {backLabel}
              </button>
            ) : (
              <span />
            )}
            <ActionButton onClick={goNext}>{isLast ? finishLabel : nextLabel}</ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
