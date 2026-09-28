import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import FocusHeader from "@/components/FocusHeader";
import { useLang } from "@/lib/i18n";

const CYCLES = 4;

function speak(text, en) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  if (localStorage.getItem("sl_voice_muted") === "1") return;
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
      { label: t("שאיפה", "Inhale"), hint: t("דרך האף", "Through the nose"), dur: 4, scale: 1 },
      { label: t("החזקה", "Hold"), hint: t("בעדינות", "Gently"), dur: 7, scale: 1 },
      { label: t("נשיפה", "Exhale"), hint: t("לאט, דרך הפה", "Slowly, through the mouth"), dur: 8, scale: 0.6 },
    ];
    const cycles = Array.from({ length: CYCLES }, (_, c) => P.map((p) => ({ ...p, cycle: c + 1 }))).flat();
    return [{ text: tool.steps[0].text, dur: 9, scale: 0.6 }, ...cycles, { text: tool.steps[1].text, dur: 10, scale: 0.6 }];
  }, [tool, lang]);

  const [i, setI] = useState(0);
  const [left, setLeft] = useState(seq[0].dur);
  const [running, setRunning] = useState(true);
  const s = seq[i];

  useEffect(() => {
    setLeft(s.dur);
    speak(s.text || s.label, en);
  }, [i]);

  useEffect(() => {
    if (!running) { window.speechSynthesis?.cancel(); return; }
    const id = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(id);
  }, [running, i]);

  useEffect(() => {
    if (left > 0) return;
    if (i === seq.length - 1) onComplete({});
    else setI(i + 1);
  }, [left]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  return (
    <div className="min-h-screen flex flex-col pb-10">
      <FocusHeader kicker={s.cycle ? t(`סבב ${s.cycle} מתוך ${CYCLES}`, `Round ${s.cycle} of ${CYCLES}`) : ""} title={tool.name} to="/" />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
        <div className="relative grid place-items-center w-[15.5rem] h-[15.5rem]">
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: `hsl(var(--pigment-${tone}) / 0.16)` }}
            animate={{ scale: running ? s.scale : undefined }}
            transition={{ duration: s.dur, ease: "easeInOut" }}
          />
          <div className="relative text-center">
            {s.label ? (
              <>
                <p className="t-title text-foreground">{s.label}</p>
                <p className="text-[40px] font-bold tabular-nums text-foreground leading-none mt-1">{Math.max(left, 1)}</p>
                <p className="t-small text-muted-foreground mt-1">{s.hint}</p>
              </>
            ) : null}
          </div>
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