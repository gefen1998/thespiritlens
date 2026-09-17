import React from "react";

export default function BreathOrb({ size = 180, subtle = true }) {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <div
        className="relative breath-ring rounded-full"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at 38% 32%, rgba(201,178,126,0.28), rgba(107,122,130,0.10) 60%, transparent 72%)",
          boxShadow: subtle
            ? "0 0 60px 10px rgba(201,178,126,0.10)"
            : "0 0 80px 16px rgba(201,178,126,0.18)",
        }}
      >
        <div
          className="absolute inset-6 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 42% 36%, rgba(253,251,247,0.6), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}