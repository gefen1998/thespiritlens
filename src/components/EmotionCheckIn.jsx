import React from "react";
import { toneIcons } from "@/lib/toneIcons";
import { guidedChoices } from "@/lib/spiritContent";

// The check-in, ported from the editorial import: a horizontally scrolling
// row of circles, each holding a smaller organic blob in its own pigment and
// shape, with a selection pip when chosen — not the vertical stack of cards
// this screen used to be.
export default function EmotionCheckIn({ selected, onSelect }) {
  return (
    <div className="scroll-x-quiet -mx-6 flex gap-3 overflow-x-auto px-6" style={{ scrollSnapType: "x mandatory" }}>
      {guidedChoices.map((choice) => {
        const pigment = `var(--pigment-${choice.tone})`;
        const form = `var(--form-${choice.tone})`;
        const Icon = toneIcons[choice.tone];
        const on = selected?.id === choice.id;
        return (
          <button
            key={choice.id}
            onClick={() => onSelect(choice)}
            className="press flex w-[7.75rem] shrink-0 flex-col items-center gap-2.5"
            style={{ scrollSnapAlign: "center" }}
          >
            <span
              className="relative grid h-[7.75rem] w-[7.75rem] place-items-center rounded-full transition-colors duration-300"
              style={{ backgroundColor: on ? `hsl(${pigment} / 0.16)` : "hsl(var(--secondary))" }}
            >
              <span
                className="grid h-14 w-14 place-items-center"
                style={{ backgroundColor: `hsl(${pigment} / ${on ? 1 : 0.85})`, borderRadius: form }}
              >
                <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </span>
              {on && (
                <span
                  className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full"
                  style={{ backgroundColor: `hsl(${pigment})` }}
                />
              )}
            </span>
            <span className={`t-small text-center leading-snug ${on ? "font-semibold text-foreground" : "text-foreground/80"}`}>
              {choice.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
