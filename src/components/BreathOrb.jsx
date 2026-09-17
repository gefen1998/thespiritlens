import React from "react";

// כדור זכוכית זוהר — אלמנט החתימה של המרחב.
export default function BreathOrb({ size = 260, tone = "dark" }) {
  const isDark = tone === "dark";
  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      {/* bloom */}
      <div
        className="absolute rounded-full soft-pulse"
        style={{
          width: size * 2.1,
          height: size * 2.1,
          background: isDark
            ? "radial-gradient(circle, rgba(90,140,255,0.20) 0%, rgba(40,80,200,0.08) 38%, transparent 68%)"
            : "radial-gradient(circle, rgba(0,122,255,0.10) 0%, transparent 62%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="relative breath-ring rounded-full"
        style={{
          width: size,
          height: size,
          background: isDark
            ? "radial-gradient(circle at 34% 26%, rgba(255,255,255,0.92) 0%, rgba(190,214,255,0.55) 16%, rgba(70,110,190,0.30) 46%, rgba(18,26,48,0.65) 78%, rgba(6,8,16,0.9) 100%)"
            : "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.98) 0%, rgba(236,240,248,0.7) 22%, rgba(196,204,220,0.32) 54%, rgba(150,160,178,0.16) 100%)",
          boxShadow: isDark
            ? "inset 0 1px 2px rgba(255,255,255,0.55), inset 0 -20px 50px rgba(10,14,30,0.75), 0 40px 120px -30px rgba(80,130,255,0.45)"
            : "inset 0 2px 5px rgba(255,255,255,0.95), inset 0 -16px 40px rgba(130,140,160,0.20), 0 30px 80px -24px rgba(60,70,95,0.30)",
        }}
      >
        {/* specular highlight */}
        <div
          className="absolute rounded-full"
          style={{
            top: "11%",
            left: "18%",
            width: "36%",
            height: "24%",
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, transparent 72%)",
            filter: "blur(3px)",
          }}
        />
        {/* rim light */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: isDark
              ? "inset 0 0 0 1px rgba(255,255,255,0.10)"
              : "inset 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        />
      </div>
    </div>
  );
}