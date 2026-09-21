import React from "react";
import { guidedChoices } from "@/lib/spiritContent";

export default function EmotionCheckIn({ selected, onSelect }) {
  return (
    <div
      className="scroll-x-quiet -mx-6 flex gap-3.5 overflow-x-auto px-6 py-2 select-none"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {guidedChoices.map((choice) => {
        const on = selected?.id === choice.id;
        const rot = choice.rotation || "0deg";

        return (
          <button
            key={choice.id}
            onClick={() => onSelect(choice)}
            className="press flex w-[5.75rem] sm:w-[6rem] shrink-0 flex-col items-center gap-2 select-none text-center"
            style={{ scrollSnapAlign: "start" }}
            aria-pressed={on}
          >
            {/* Outer Circle with tint background */}
            <span
              className="relative grid h-[5.75rem] w-[5.75rem] sm:h-[6rem] sm:w-[6rem] place-items-center rounded-full transition-transform duration-200"
              style={{
                backgroundColor: choice.tint,
                transform: on ? "scale(1.02)" : "scale(1)",
              }}
            >
              {/* Inner Organic Blob with wash color - clean organic shape without icon */}
              <span
                className="grid h-12 w-12 sm:h-13 sm:w-13 transition-transform duration-300"
                style={{
                  backgroundColor: choice.wash,
                  borderRadius: choice.blob,
                  transform: `rotate(${rot})`,
                }}
              />

              {/* Selection Dot: var(--accent) / #B08A3C */}
              {on && (
                <span
                  className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full ring-2 ring-white/80 shadow-xs"
                  style={{ backgroundColor: "var(--accent, #B08A3C)" }}
                  aria-hidden="true"
                />
              )}
            </span>

            {/* Label below the circle */}
            <span
              className={`text-[14.5px] leading-snug transition-colors ${
                on ? "font-bold text-[#16161A]" : "font-medium text-[#46453F]"
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