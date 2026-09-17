import React from "react";

// כדור הנשימה — אובייקט "מוצר" בסגנון Apple: זכוכית, עומק, השתקפות.
// variant: "ink" (על רקע שחור) | "light" (על רקע בהיר)
export default function BreathOrb({ size = 220, variant = "ink" }) {
  const onInk = variant === "ink";

  return (
    <div className="relative flex items-center justify-center orb-drift" aria-hidden="true">
      {/* הילה חיצונית רחבה */}
      <div
        className="absolute rounded-full soft-pulse"
        style={{
          width: size * 2.1,
          height: size * 2.1,
          background: onInk
            ? "radial-gradient(circle, rgba(80,140,255,0.20), rgba(140,110,255,0.10) 42%, transparent 68%)"
            : "radial-gradient(circle, rgba(0,113,227,0.14), rgba(120,100,240,0.07) 44%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* הכדור */}
      <div
        className="relative rounded-full breath-ring"
        style={{
          width: size,
          height: size,
          background: onInk
            ? "radial-gradient(circle at 32% 26%, #7fb2ff 0%, #2f6fe0 26%, #1b3f96 58%, #0a1330 88%)"
            : "radial-gradient(circle at 32% 26%, #ffffff 0%, #a8c8ff 22%, #2f6fe0 62%, #14307a 92%)",
          boxShadow: onInk
            ? "0 0 90px 6px rgba(60,120,255,0.35), inset 0 -18px 40px rgba(0,0,0,0.55), inset 0 10px 24px rgba(255,255,255,0.16)"
            : "0 26px 70px -18px rgba(20,48,122,0.45), inset 0 -18px 40px rgba(0,0,0,0.30), inset 0 10px 24px rgba(255,255,255,0.55)",
        }}
      >
        {/* השתקפות ספקולרית עליונה */}
        <div
          className="absolute rounded-full"
          style={{
            top: "6%",
            left: "14%",
            width: "52%",
            height: "34%",
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.85), rgba(255,255,255,0.18) 55%, transparent 78%)",
            filter: "blur(6px)",
          }}
        />
        {/* נגיעת אור תחתונה — אור חוזר */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: "8%",
            right: "18%",
            width: "40%",
            height: "22%",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(140,190,255,0.45), transparent 72%)",
            filter: "blur(10px)",
          }}
        />
        {/* קו מתאר זכוכיתי */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: onInk
              ? "inset 0 0 0 1px rgba(255,255,255,0.16)"
              : "inset 0 0 0 1px rgba(255,255,255,0.55)",
          }}
        />
      </div>
    </div>
  );
}