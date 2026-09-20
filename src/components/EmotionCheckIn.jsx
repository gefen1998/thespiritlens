import React from "react";
import { toneIcons } from "@/lib/toneIcons";
import { guidedChoices } from "@/lib/spiritContent";

export default function EmotionCheckIn({ selected, onSelect }) {
  return (
    <div className="scroll-x-quiet -mx-6 flex gap-3.5 overflow-x-auto px-6 py-1" style={{ scrollSnapType: "x mandatory" }}>
      {guidedChoices.map((choice) => {
        const pigment = `var(--pigment-${choice.tone})`;
        const form = `var(--form-${choice.tone})`;
        const on = selected?.id === choice.id;
        return (
          <button
            key={choice.id}
            onClick={() => onSelect(choice)}
            className="press flex w-[5.75rem] shrink-0 flex-col items-center gap-2 select-none"
            style={{ scrollSnapAlign: "start" }}
          >
            <span
              className="relative grid h-[5.75rem] w-[5.75rem] place-items-center rounded-full transition-all duration-200"
              style={{
                backgroundColor: on ? `hsl(${pigment} / 0.22)` : "#dfd9ce",
                transform: on ? "scale(1.03)" : "scale(1)",
              }}
            >
              <span
                className="w-12 h-12 transition-transform duration-200"
                style={{
                  backgroundColor: `hsl(${pigment} / ${on ? 1 : 0.9})`,
                  borderRadius: form,
                }}
              />
              {on && (
                <span
                  className="absolute top-2 left-2 w-2 h-2 rounded-full ring-2 ring-background"
                  style={{ backgroundColor: `hsl(${pigment})` }}
                />
              )}
            </span>
            <span
              className={`text-xs text-center leading-snug line-clamp-2 ${
                on ? "font-bold text-foreground" : "text-foreground/75 font-medium"
              }`}
            >
              {choice.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}