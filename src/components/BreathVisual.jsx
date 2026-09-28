import React from "react";
import { motion } from "framer-motion";

// Headspace-style breathing orb: soft layered halos that swell on the inhale,
// shimmer while holding, and sink on the exhale, with a ring tracing the phase.
const R = 46;
const C = 2 * Math.PI * R;

export default function BreathVisual({ phase = "inhale", dur = 4, left, running = true, tone = "open", children }) {
  const big = phase === "inhale" || phase === "hold";
  const scale = !running ? undefined : big ? 1 : 0.55;
  const color = `hsl(var(--pigment-${tone})`;
  const ease = { duration: running ? dur : 0, ease: [0.45, 0, 0.35, 1] };
  const progress = left != null ? 1 - Math.max(0, left - 1) / dur : 0;

  return (
    <div className="relative grid place-items-center w-[17rem] h-[17rem]">
      {[1.18, 1.08, 1].map((s, i) => (
        <motion.span
          key={i}
          className="absolute inset-6 rounded-full"
          style={{ backgroundColor: `${color} / ${0.1 + i * 0.1})` }}
          initial={{ scale: 0.55 }}
          animate={{ scale: scale && scale * s }}
          transition={{ ...ease, delay: running ? i * 0.12 : 0 }}
        />
      ))}
      {phase === "hold" && running && (
        <motion.span
          className="absolute inset-6 rounded-full border-2"
          style={{ borderColor: `${color} / 0.5)` }}
          animate={{ scale: [1, 1.12], opacity: [0.7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.span
        className="absolute w-24 h-24 rounded-full"
        style={{ backgroundColor: `${color} / 0.9)`, boxShadow: `0 0 60px ${color} / 0.45)` }}
        initial={{ scale: 0.8 }}
        animate={{ scale: !running ? undefined : big ? 1.25 : 0.8 }}
        transition={ease}
      />
      {left != null && (
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90 pointer-events-none">
          <circle cx="50" cy="50" r={R} fill="none" stroke="hsl(var(--foreground) / 0.08)" strokeWidth="1.2" />
          <circle cx="50" cy="50" r={R} fill="none" stroke={`${color})`} strokeWidth="1.6" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C * (1 - progress)} style={{ transition: "stroke-dashoffset 1s linear" }} />
        </svg>
      )}
      <div className="relative text-center text-white drop-shadow-sm">{children}</div>
    </div>
  );
}