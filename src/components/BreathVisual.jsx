import React from "react";
import { motion } from "framer-motion";

// Headspace-style breathing orb: soft layered halos that swell on the inhale
// and sink on the exhale, with a ring tracing the phase.
//
// The motion is deliberately unhurried: a pure sine ease (slowest at BOTH
// ends, unlike an ease-out, which snaps at the boundary), the halos moving a
// beat apart from one another so the shape never changes as one solid block,
// and the hold kept alive by a faint drift instead of freezing mid-breath.
const R = 46;
const C = 2 * Math.PI * R;
const FLOW = [0.37, 0, 0.63, 1];
const HALOS = [1.16, 1.07, 1];

export default function BreathVisual({ phase = "inhale", dur = 4, left, running = true, tone = "open", children }) {
  const big = phase === "inhale" || phase === "hold";
  const color = `hsl(var(--pigment-${tone})`;
  const glide = { duration: running ? dur : 0, ease: FLOW };
  const progress = left != null ? 1 - Math.max(0, left - 1) / dur : 0;

  return (
    <div className="relative grid place-items-center w-[17rem] h-[17rem]">
      {HALOS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute inset-6 rounded-full"
          style={{ backgroundColor: `${color} / ${0.09 + i * 0.09})` }}
          initial={{ scale: 0.6 * s }}
          animate={{ scale: (big ? 1 : 0.6) * s }}
          // Each halo trails the one inside it by a fraction of the phase, so
          // the layers breathe as a stack rather than a single disc.
          transition={{ ...glide, delay: running ? i * dur * 0.055 : 0 }}
        />
      ))}

      {/* Keeps the hold feeling like an alive pause, not a stopped animation. */}
      {phase === "hold" && running && (
        <motion.span
          className="absolute inset-3 rounded-full"
          style={{ backgroundColor: `${color} / 0.06)` }}
          animate={{ scale: [0.98, 1.05, 0.98], opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: Math.max(dur, 3), times: [0, 0.5, 1], repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {phase === "hold" && running && (
        <motion.span
          className="absolute inset-6 rounded-full border-2"
          style={{ borderColor: `${color} / 0.45)` }}
          animate={{ scale: [1, 1.1], opacity: [0.55, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <motion.span
        className="absolute w-24 h-24 rounded-full"
        style={{ backgroundColor: `${color} / 0.9)`, boxShadow: `0 0 60px ${color} / 0.45)` }}
        initial={{ scale: 0.8 }}
        animate={{ scale: running ? (big ? 1.22 : 0.82) : undefined }}
        transition={glide}
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