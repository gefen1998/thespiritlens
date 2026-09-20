import React from "react";

// The breath-mode practice visual, ported from the editorial import: a ring
// that scales through the breath cycle with a dot orbiting it, rather than
// the concentric-glow BreathOrb used elsewhere — a distinct, busier motion
// for the one screen where someone is actively pacing their breathing.
export default function BreathRing({ tone = "open", running = true, hint }) {
  const pigment = `var(--pigment-${tone})`;
  const playState = running ? "running" : "paused";

  return (
    <div className="relative grid place-items-center w-[15.5rem] h-[15.5rem] mx-auto">
      <span
        className="ring-breathe absolute grid place-items-center w-full h-full rounded-full"
        style={{ backgroundColor: `hsl(${pigment} / 0.14)`, animationPlayState: playState }}
      >
        <span className="w-[4.6rem] h-[4.6rem] rounded-full bg-background" />
      </span>
      <span
        className="ring-orbit absolute w-[13rem] h-[13rem]"
        style={{ animationPlayState: playState }}
      >
        <span
          className="absolute top-1/2 -left-2 w-3.5 h-3.5 -mt-1.5 rounded-full"
          style={{ backgroundColor: `hsl(${pigment})` }}
        />
      </span>
      {hint && <span className="relative z-10 t-small text-muted-foreground">{hint}</span>}
    </div>
  );
}
