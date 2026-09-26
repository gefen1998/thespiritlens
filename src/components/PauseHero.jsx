import React from "react";
import { Sparkles } from "lucide-react";

const WINGS_URL =
  "https://media.base44.com/images/public/6aa5ba6278746a9e6313ec62/b888de778_wings-mark.png";

// Wings mark tinted ochre (black → ochre, white → transparent via blend modes),
// with the chosen emotion's breathing form and its inner pattern on top.
export default function PauseHero({ tint, wash, blob, rotation = "0deg", Icon = Sparkles }) {
  const counterRot = rotation.startsWith("-") ? rotation.slice(1) : `-${rotation}`;
  return (
    <div className="relative grid place-items-center h-[230px] shrink-0" aria-hidden="true">
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-[320px] h-[225px] pointer-events-none"
        style={{
          backgroundColor: "#B08A3C",
          opacity: 0.22,
          WebkitMask: `url(${WINGS_URL}) center / contain no-repeat`,
          mask: `url(${WINGS_URL}) center / contain no-repeat`,
        }}
      />

      <div
        className="ring-breathe relative grid place-items-center w-[168px] h-[168px]"
        style={{ backgroundColor: tint, borderRadius: blob }}
      >
        <div
          className="grid place-items-center w-[78px] h-[78px]"
          style={{ backgroundColor: wash, borderRadius: blob, transform: `rotate(${rotation})` }}
        >
          <span style={{ transform: `rotate(${counterRot})` }}>
            <Icon className="w-8 h-8 text-white/95" strokeWidth={1.4} />
          </span>
        </div>
      </div>
    </div>
  );
}