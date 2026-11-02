import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import FocusHeader from "@/components/FocusHeader";
import BreathVisual from "@/components/BreathVisual";
import { useLang } from "@/lib/i18n";
import { playClip, stopVered } from "@/lib/veredVoice";
import { startPad, stopPad, breathCue, pauseSound, resumeSound } from "@/lib/breathSound";

const CYCLES = 4;

const BASE = "https://base44.app/api/apps/6aa5ba6278746a9e6313ec62/files/mp/public/6aa5ba6278746a9e6313ec62/";
const VERED = {
  intro: BASE + "cee4041f9_vered-478-intro-v6.mp3",
  outro: BASE + "5cfea3b80_vered-478-outro-v5.mp3",
  inhale: BASE + "84caec176_vered-478-inhale-v7.mp3",
  hold: BASE + "5a67fa188_vered-478-hold-v7.mp3",
  exhale: BASE + "febcd830e_vered-478-exhale-v7.mp3",
};
const current = { pause: () => stopVered() };
const stopAll = stopVered;

function speak(text, en, key) {
  stopAll();
  window.speechSynthesis?.cancel();
  if (localStorage.getItem("sl_voice_muted") === "1") return;
  if (!en && VERED[key]) {
    playClip(VERED[key]);
    return;
  }
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = en ? "en-US" : "he-IL";
  u.rate = 0.8;
  window.speechSynthesis.speak(u);
}

/** Timed 4-7-8 breathing: intro, four exact cycles, closing line. */
export default function Breath478({ tool, tone = "open", onComplete }) {
  const { lang, t } = useLang();
  const en = lang === "en";
  const seq = useMemo(() => {
    const P = [
      { key: "inhale", label: t("שאיפה", "Inhale"), hint: t("דרך האף", "Through the nose"), dur: 4, scale: 1 },
      { key: "hold", label: t("החזקה", "Hold"), hint: t("בעדינות", "Gently"), dur: 7, scale: 1 },
      { key: "exhale", label: t("נשיפה", "Exhale"), hint: t("לאט, דרך הפה", "Slowly, through the mouth"), dur: 8, scale: 0.6 },
    ];
    const cycles = Array.from({ length: CYCLES }, (_, c) => P.map((p) => ({ ...p, cycle: c + 1 }))).flat();
    return [{ key: "intro", text: tool.steps[0].text, dur: 12, scale: 0.6 }, ...cycles, { key: "outro", text: tool.steps[1].text, dur: 10, scale: 0.6 }];
  }, [tool, lang]);

  const [i, setI] = useState(0);
  const [left, setLeft] = useState(seq[0].dur);
  const [running, setRunning] = useState(true);
  const s = seq[i];

  useEffect(() => {
    setLeft(s.dur);
    speak(s.text || s.label, en, s.key);
    if (s.label) breathCue(s.key, s.dur);
    else if (s.key === "outro") breathCue("hold");
  }, [i]);

  useEffect(() => {
    if (!running) { current?.pause(); window.speechSynthesis?.cancel(); pauseSound(); return; }
    resumeSound();
    const id = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(id);
  }, [running, i]);

  useEffect(() => {
    if (left > 0) return;
    if (i === seq.length - 1) onComplete({});
    else setI(i + 1);
  }, [left]);

  useEffect(() => {
    startPad();
    return () => { current?.pause(); window.speechSynthesis?.cancel(); stopPad(); };
  }, []);

  const big = s.key === "inhale" || s.key === "hold";
  return (
    <div className="relative isolate min-h-screen flex flex-col pb-10 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: `radial-gradient(circle at 50% 45%, hsl(var(--pigment-${tone}) / 0.28), transparent 70%)` }}
        animate={{ opacity: running ? (big ? 1 : 0.35) : 0.35 }}
        transition={{ duration: running ? s.dur : 0.4, ease: [0.45, 0, 0.35, 1] }}
      />
      <FocusHeader kicker={s.cycle ? t(`סבב ${s.cycle} מתוך ${CYCLES}`, `Round ${s.cycle} of ${CYCLES}`) : ""} title={tool.name} to="/" />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
        <BreathVisual phase={s.label ? s.key : "exhale"} dur={s.dur} left={s.label ? left : null} running={running} tone={tone}>
          {s.label ? (
            <>
              <p className="t-row">{s.label}</p>
              <p className="text-[34px] font-bold tabular-nums leading-none mt-0.5">{Math.max(left, 1)}</p>
            </>
          ) : null}
        </BreathVisual>
        {s.label && <p className="t-small text-muted-foreground -mt-4">{s.hint}</p>}
        <div className="flex gap-2" aria-hidden="true">
          {Array.from({ length: CYCLES }, (_, c) => (
            <span key={c} className={`h-1.5 rounded-full transition-all duration-500 ${s.cycle === c + 1 ? "w-6 bg-foreground/60" : (s.cycle || (s.key === "outro" ? CYCLES + 1 : 0)) > c + 1 ? "w-1.5 bg-foreground/40" : "w-1.5 bg-foreground/15"}`} />
          ))}
        </div>
        {s.text && <p className="t-practice text-foreground text-center max-w-md text-balance">{s.text}</p>}
      </div>
      <div className="flex items-center justify-center gap-4 px-6">
        <button onClick={() => setRunning((r) => !r)} aria-label={running ? t("עצור", "Pause") : t("המשך", "Resume")} className="press grid place-items-center w-14 h-14 rounded-full bg-primary text-primary-foreground">
          {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button onClick={() => onComplete({})} className="press h-14 px-6 rounded-full bg-secondary text-foreground t-row">{t("לסיים", "Finish")}</button>
      </div>
    </div>
  );
}