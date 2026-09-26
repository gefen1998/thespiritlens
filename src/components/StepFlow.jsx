import React, { useEffect, useRef, useState, useCallback } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import BackTextButton from "@/components/BackTextButton";
import FocusHeader from "@/components/FocusHeader";
import BreathRing from "@/components/BreathRing";
import ActionButton from "@/components/ActionButton";
import ChoiceCard from "@/components/ChoiceCard";
import PracticePlaylist from "@/components/PracticePlaylist";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { letterTone } from "@/lib/spiritContent";
import { cn } from "@/lib/utils";

const ORDINALS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שביעי", "שמיני"];
const BREATH_CYCLE = 11;
const INHALE = 4.5;
const HOLD = 1;

function phaseOf(elapsed) {
  const p = elapsed % BREATH_CYCLE;
  if (p < INHALE) return { label: "שאיפה", hint: "לאט, דרך האף" };
  if (p < INHALE + HOLD) return { label: "החזקה", hint: "רגע אחד" };
  return { label: "נשיפה", hint: "ארוכה מן השאיפה" };
}

function calculateStepDuration(text, isBreath) {
  if (isBreath) return BREATH_CYCLE;
  if (!text) return 10;
  const words = text.trim().split(/\s+/).length;
  // Calm pace: ~1.25s per word spoken softly + 5-6s of silent meditation reflection
  return Math.max(9, Math.min(22, Math.ceil(words * 1.25) + 5));
}

function speakHebrew(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    if (!text) return;
    const cleanText = text.replace(/[\n\r]+/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "he-IL";
    utterance.rate = 0.86; // Meditative, calm cadence
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const heVoice = voices.find((v) => v.lang.startsWith("he") || v.lang.includes("IL"));
    if (heVoice) utterance.voice = heVoice;

    window.speechSynthesis.speak(utterance);
  } catch {}
}

function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

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
  const [stepElapsed, setStepElapsed] = useState(0);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem("sl_voice_muted") === "1";
    } catch {
      return false; // Default: unmuted voice narration
    }
  });

  const lastTick = useRef(Date.now());
  const autoAdvanceTriggered = useRef(false);

  const step = steps[index];
  const isLast = index === steps.length - 1;
  const canAutoAdvance = step.kind !== "input" && step.kind !== "choice";
  const currentDuration = calculateStepDuration(step.text, isBreath);

  // Narration playback function
  const triggerNarration = useCallback((text) => {
    if (isMuted || !running) {
      stopSpeaking();
      return;
    }
    speakHebrew(text);
  }, [isMuted, running]);

  // Handle step narration
  useEffect(() => {
    autoAdvanceTriggered.current = false;
    setStepElapsed(0);

    const textToRead = (index === 0 && tool.audioNote)
      ? `${tool.audioNote}. ${step.text}`
      : step.text;

    triggerNarration(textToRead);

    return () => {
      stopSpeaking();
    };
  }, [index, isMuted, running, step.text, tool.audioNote, triggerNarration]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Timer loop
  useEffect(() => {
    if (!running) {
      stopSpeaking();
      return;
    }

    lastTick.current = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const dt = Math.min(0.5, (now - lastTick.current) / 1000);
      lastTick.current = now;

      if (canAutoAdvance) {
        setStepElapsed((prev) => {
          const next = prev + dt;
          return next;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [running, canAutoAdvance]);

  const persist = useCallback((next) => {
    stopSpeaking();
    const updated = { ...values };
    if (step.kind === "input" && draft.trim()) updated[step.key] = draft.trim();
    setValues(updated);
    if (storageKey) {
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {}
    }
    if (isLast) {
      onComplete(updated);
    } else {
      setIndex(next ?? index + 1);
      setDraft("");
      setStepElapsed(0);
      autoAdvanceTriggered.current = false;
    }
  }, [draft, index, isLast, onComplete, step.key, step.kind, storageKey, values]);

  // Auto-advance watcher
  useEffect(() => {
    if (canAutoAdvance && running && stepElapsed >= currentDuration && !autoAdvanceTriggered.current) {
      autoAdvanceTriggered.current = true;
      persist(index + 1);
    }
  }, [canAutoAdvance, currentDuration, index, persist, running, stepElapsed]);

  const goNext = () => {
    autoAdvanceTriggered.current = true;
    persist(index + 1);
  };

  const goBack = () => {
    if (index > 0) {
      stopSpeaking();
      autoAdvanceTriggered.current = false;
      setIndex(index - 1);
      setDraft(values[steps[index - 1]?.key] || "");
      setStepElapsed(0);
    }
  };

  const handleChoice = (option) => {
    stopSpeaking();
    const updated = { ...values, [step.key]: option.value };
    if (option.route) updated[`_route_${step.key}`] = option.route;
    setValues(updated);
    if (storageKey) {
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {}
    }
    if (isLast) onComplete(updated);
    else {
      setIndex(index + 1);
      setStepElapsed(0);
      autoAdvanceTriggered.current = false;
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sl_voice_muted", next ? "1" : "0");
      } catch {}
      if (next) {
        stopSpeaking();
      } else if (running) {
        const textToRead = (index === 0 && tool.audioNote)
          ? `${tool.audioNote}. ${step.text}`
          : step.text;
        speakHebrew(textToRead);
      }
      return next;
    });
  };

  const inputClasses =
    "h-auto w-full rounded-lg border-2 border-transparent bg-secondary/70 px-5 py-4 t-practice text-foreground text-right shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-flame/50 transition-colors";

  const nextLabel = isLast ? "לסיים" : "הבא";
  const stepCount = `${index + 1}/${steps.length}`;
  const progressPercent = canAutoAdvance
    ? Math.min(100, Math.max(0, (stepElapsed / currentDuration) * 100))
    : 0;

  // Header Mute Action Button
  const headerActions = (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? "הפעלת קריינות" : "השתקת קריינות"}
      title={isMuted ? "הפעלת קריינות" : "השתקת קריינות"}
      className="press grid place-items-center w-10 h-10 rounded-full bg-secondary text-foreground"
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
      ) : (
        <Volume2 className="w-4 h-4 text-foreground" strokeWidth={1.75} />
      )}
    </button>
  );

  if (isBreath) {
    const phase = phaseOf(stepElapsed);
    return (
      <div className="min-h-screen flex flex-col pb-10">
        <FocusHeader kicker={phase.label} title={tool.name} to="/" actions={headerActions} />
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
          <BreathRing tone={tone} running={running} hint={phase.hint} />
          <p className="t-practice text-foreground text-center max-w-md text-balance">{step.text}</p>
        </div>

        {/* Breath Mode Navigation Bar */}
        <div className="flex items-center gap-2.5 px-6">
          <BackTextButton onClick={goBack} disabled={index === 0} />

          <button
            onClick={() => setRunning((r) => !r)}
            aria-label={running ? "עצור" : "המשך"}
            className="press grid place-items-center w-[3.5rem] h-[3.5rem] shrink-0 rounded-full text-primary-foreground shadow-sm"
            style={{ backgroundColor: "hsl(var(--primary))" }}
          >
            {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          <button
            onClick={goNext}
            className="press relative flex flex-1 items-center justify-between min-h-[3.5rem] px-5 rounded-full bg-secondary text-foreground overflow-hidden"
          >
            {/* Subtle animated progress bar filling up automatically */}
            <div
              className="absolute inset-y-0 right-0 bg-primary/12 transition-[width] ease-linear pointer-events-none"
              style={{
                width: `${progressPercent}%`,
                transitionDuration: running ? "150ms" : "0ms",
              }}
            />
            <span className="relative z-10 t-row font-semibold">
              {nextLabel} {!running && <span className="text-xs font-normal opacity-60">(מושהה)</span>}
            </span>
            <span className="relative z-10 t-small text-muted-foreground tabular-nums">{stepCount}</span>
          </button>
        </div>
      </div>
    );
  }

  const ordinal = steps.length > 1 ? `שלב ${ORDINALS[index] || index + 1}` : "תרגול";

  return (
    <div className="min-h-screen flex flex-col pb-10">
      <FocusHeader kicker={ordinal} title={tool.name} to="/" actions={headerActions} />
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

        {tool.playlist && (
          <div className="mt-6 mb-2">
            <PracticePlaylist playlist={tool.playlist} />
          </div>
        )}
      </div>

      {/* Navigation Controls for Non-Choice Steps */}
      {step.kind !== "choice" && (
        <div className="flex items-center gap-2.5 px-6 mt-6">
          <BackTextButton onClick={goBack} disabled={index === 0} />

          {canAutoAdvance && (
            <button
              onClick={() => setRunning((r) => !r)}
              aria-label={running ? "עצור" : "המשך"}
              className="press grid place-items-center w-[3.5rem] h-[3.5rem] shrink-0 rounded-full text-primary-foreground shadow-sm"
              style={{ backgroundColor: "hsl(var(--primary))" }}
            >
              {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          )}

          <button
            onClick={goNext}
            className="press relative flex flex-1 items-center justify-between min-h-[3.5rem] px-5 rounded-full bg-secondary text-foreground overflow-hidden"
          >
            {canAutoAdvance && (
              <div
                className="absolute inset-y-0 right-0 bg-primary/12 transition-[width] ease-linear pointer-events-none"
                style={{
                  width: `${progressPercent}%`,
                  transitionDuration: running ? "150ms" : "0ms",
                }}
              />
            )}
            <span className="relative z-10 t-row font-semibold">
              {nextLabel} {!running && canAutoAdvance && <span className="text-xs font-normal opacity-60">(מושהה)</span>}
            </span>
            <span className="relative z-10 t-small text-muted-foreground tabular-nums">{stepCount}</span>
          </button>
        </div>
      )}
    </div>
  );
}