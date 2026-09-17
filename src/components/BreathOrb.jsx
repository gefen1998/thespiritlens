import React from "react";

export default function BreathOrb({ size = 180 }) {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <div
        className="relative breath-ring rounded-full"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, rgba(240,242,247,0.6) 22%, rgba(200,205,215,0.28) 52%, rgba(150,158,170,0.14) 74%, rgba(120,128,140,0.06) 100%)",
          boxShadow:
            "inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -10px 30px rgba(120,128,140,0.18), 0 24px 60px -16px rgba(60,70,90,0.28)",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            top: "14%",
            left: "20%",
            width: "34%",
            height: "26%",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 78%, rgba(0,122,255,0.10) 0%, transparent 50%)",
          }}
        />
      </div>
    </div>
  );
}