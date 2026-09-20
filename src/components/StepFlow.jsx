import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import FocusHeader from "@/components/FocusHeader";
import BreathRing from "@/components/BreathRing";
import ActionButton from "@/components/ActionButton";
import ChoiceCard from "@/components/ChoiceCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { letterTone } from "@/lib/spiritContent";
import { cn } from "@/lib/utils";

const ORDINALS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שביעי", "שמיני"];
const CYCLE = 11, INHALE = 4.5, HOLD = 1;

function phaseOf(elapsed) {
  const p = elapsed % CYCLE;
  if (p < INHALE) return { label: "שאיפה", hint: "לאט, דרך האף" };
  if (p < INHALE + HOLD) return { label: "החזקה", hint: "רגע אחד" };
  return { label: "נשיפה", hint: "ארוכה מן השאיפה" };
}

// רכיב גנרי להרצת שלבים עוקבים: טקסט / קלט / בחירה.
// tool: the full tool record (name, mode, steps, audioNote) — StepFlow derives
// its own header/labels from it rather than taking them as separate props.
// onComplete(values) — נקראת בסיום עם אוסף הערכים שנאספו.
export default function StepFlow({ tool, tone = "open", onComplete, storageKey }) {
  const { steps } = tool;
  const isBreath = tool.mode === "breath";
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
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const lastTick = useRef(Date.now());

  useEffect(() => {
    if (!isBreath) return;
    const id = setInterval(() => {
      const now = Date.now();
      const dt = Math.min(2, (now - lastTick.current) / 1000);
      lastTick.current = now;
      if (running) setElapsed((e) => e + dt);
    }, 250);
    return () => clearInterval(id);
  }, [isBreath, running]);

  const step = steps[index];
  const isLast = index === steps.length - 1;
  const pigment = `var(--pigment-${tone})`;

  const persist = (next) => {
    const updated = { ...values };
    if (step.kind === "input" && draft.trim()) updated[step.key] = draft.trim();
    setValues(updated);
    if (storageKey) {
      try { sessionStorage.setItem(storageKey, JSON.stringify(updated)); } catch {}
    }
    if (isLast) onComplete(updated);
    else {
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
    if (isLast) onComplete(updated);
    else setIndex(index + 1);
  };

  const inputClasses =
    "h-auto w-full rounded-lg border-2 border-transparent bg-secondary/70 px-5 py-4 t-practice text-foreground text-right shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-flame/50 transition-colors";

  const nextLabel = isLast ? "לסיים" : "הבא";
  const stepCount = `${index + 1}/${steps.length}`;

  if (isBreath) {
    const phase = phaseOf(elapsed);
    return (
      <div className="min-h-screen flex flex-col pb-10">
        <FocusHeader kicker={phase.label} title={tool.name} />
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
          <BreathRing tone={tone} running={running} hint={phase.hint} />
          <p className="t-practice text-foreground text-center max-w-md text-balance">{step.text}</p>
        </div>
        <div className="flex items-center gap-2.5 px-6">
          <button
            onClick={() => setRunning((r) => !r)}
            aria-label={running ? "עצור" : "המשך"}
            className="press grid place-items-center w-[3.6rem] h-[3.6rem] shrink-0 rounded-full text-primary-foreground"
            style={{ backgroundColor: "hsl(var(--primary))" }}
          >
            {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={goNext}
            className="press flex flex-1 items-center justify-between min-h-[3.6rem] px-5 rounded-full bg-secondary text-foreground"
          >
            <span className="t-row font-semibold">{nextLabel}</span>
            <span className="t-small text-muted-foreground tabular-nums">{stepCount}</span>
          </button>
        </div>
      </div>
    );
  }

  const ordinal = steps.length > 1 ? `שלב ${ORDINALS[index] || index + 1}` : "תרגול";

  return (
    <div className="min-h-screen flex flex-col pb-10">
      <FocusHeader kicker={ordinal} title={tool.name} />
      <div className="flex-1 px-6 pt-8">
        {tool.audioNote && index === 0 && <p className="t-lead text-muted-foreground mb-8">{tool.audioNote}</p>}

        {step.letter && (() => {
          const letterHue = letterTone[step.letter] ?? tone;
          return (
            <div className="flex items-center gap-3 mb-5">
              <span
                className="grid place-items-center w-12 h-12 shrink-0 font-serif text-2xl text-white"
                style={{ backgroundColor: `hsl(var(--pigment-${letterHue}))`, borderRadius: `var(--form-${letterHue})` }}
              >
                {step.letter}
              </span>
              <span className="t-row text-foreground">{step.title}</span>
            </div>
          );
        })()}

        <p className="t-practice text-foreground text-balance">{step.text}</p>

        {step.kind === "input" && (
          <div className="mt-6">
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
            {step.optional && <p className="mt-3 t-micro text-muted-foreground">אפשר גם להמשיך בלי לכתוב</p>}
          </div>
        )}

        {step.kind === "choice" && (
          <div className="mt-6">
            {step.options.map((opt) => (
              <ChoiceCard key={opt.value} label={opt.label} onClick={() => handleChoice(opt)} />
            ))}
          </div>
        )}
      </div>

      {step.kind !== "choice" && (
        <div className="flex items-center gap-2.5 px-6 mt-6">
          <button
            onClick={goBack}
            disabled={index === 0}
            aria-label="הקודם"
            className="press grid place-items-center w-[3.6rem] h-[3.6rem] shrink-0 rounded-full bg-secondary text-foreground disabled:opacity-35"
          >
            <ArrowRight className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>
          <ActionButton onClick={goNext} className="flex-1 justify-between">
            <span>{nextLabel}</span>
            <span className="opacity-60 t-small tabular-nums font-normal">{stepCount}</span>
          </ActionButton>
        </div>
      )}
    </div>
  );
}
