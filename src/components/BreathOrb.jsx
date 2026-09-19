import React from "react";

// The lens: concentric rings around a lit core, breathing.
export default function BreathOrb({ size = 180, tone = "var(--flame)" }) {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute rounded-full breath-ring"
          style={{
            inset: "-26%",
            background: `radial-gradient(circle, hsl(${tone} / 0.16), hsl(${tone} / 0.04) 45%, transparent 68%)`,
            filter: "blur(4px)",
            transition: "background 900ms ease",
          }}
        />
        <div
          className="absolute inset-0 rounded-full breath-ring"
          style={{
            border: `1.5px solid hsl(${tone} / 0.55)`,
            boxShadow: `0 0 34px hsl(${tone} / 0.16), inset 0 0 28px hsl(${tone} / 0.08)`,
            transition: "border-color 900ms ease, box-shadow 900ms ease",
          }}
        />
        <div
          className="absolute rounded-full breath-ring-inner"
          style={{
            inset: "18%",
            border: `1px solid hsl(${tone} / 0.32)`,
            background: `radial-gradient(circle at 46% 42%, hsl(${tone} / 0.30), hsl(var(--background) / 0.4) 60%, transparent 78%)`,
            transition: "border-color 900ms ease, background 900ms ease",
          }}
        />
      </div>
    </div>
  );
}
