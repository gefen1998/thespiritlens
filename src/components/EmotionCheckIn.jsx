import React from "react";
import { toneIcons } from "@/lib/toneIcons";
import { guidedChoices } from "@/lib/spiritContent";

export default function EmotionCheckIn({ selected, onSelect }) {
  return (
    <div
      className="scroll-x-quiet -mx-6 flex gap-3.5 overflow-x-auto px-6 py-1 select-none"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {guidedChoices.map((choice) => {
        const pigment = `var(--pigment-${choice.tone})`;
        const form = `var(--form-${choice.tone})`;
        const Icon = toneIcons[choice.tone];
        const on = selected?.id === choice.id;
        return (
          <button
            key={choice.id}
            onClick={() => onSelect(choice)}
            className="press flex w-[6.2rem] shrink-0 flex-col items-center gap-2.5 select-none"
            style={{ scrollSnapAlign: "start" }}
          >
            <span
              className="relative grid h-[6.2rem] w-[6.2rem] place-items-center rounded-full transition-all duration-200"
              style={{
                backgroundColor: on ? `hsl(${pigment} / 0.22)` : "#E7E5DF",
                transform: on ? "scale(1.03)" : "scale(1)",
              }}
            >
              <span
                className="grid h-14 w-14 place-items-center transition-transform duration-200"
                style={{
                  backgroundColor: `hsl(${pigment} / ${on ? 1 : 0.95})`,
                  borderRadius: form,
                }}
              >
                {Icon && (
                  <Icon
                    className="w-[23px] h-[23px] text-white/95"
                    strokeWidth={1.35}
                  />
                )}
              </span>
              {on && (
                <span
                  className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full ring-2 ring-background"
                  style={{ backgroundColor: `hsl(${pigment})` }}
                />
              )}
            </span>
            <span
              className={`text-[15px] text-center leading-snug ${
                on ? "font-bold text-foreground" : "text-foreground font-medium"
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