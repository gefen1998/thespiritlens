import React from "react";
import {
  Wind,
  Moon,
  Waves,
  Heart,
  Compass,
  Anchor,
  Sparkles,
} from "lucide-react";
import { guidedChoices } from "@/lib/spiritContent";

export const EMOTION_ICONS = {
  calm: Wind,
  tired: Moon,
  stressed: Waves,
  sad: Heart,
  restless: Compass,
  heavy: Anchor,
  grateful: Sparkles,
};

export default function EmotionCheckIn({ selected, onSelect }) {
  // Background color of the "לפנות מקום" container
  const defaultRingBg = "rgba(22, 22, 26, 0.06)";

  return (
    <div
      className="scroll-x-quiet -mx-6 flex gap-3.5 overflow-x-auto px-6 pb-2 pt-0 select-none"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {guidedChoices.map((choice) => {
        const on = selected?.id === choice.id;
        const rot = choice.rotation || "0deg";
        const counterRot = rot.startsWith("-") ? rot.slice(1) : `-${rot}`;
        const Icon = EMOTION_ICONS[choice.id] || Sparkles;

        // Resting state: identical to "לפנות מקום" background; Active/Selected state: emotion tint color
        const ringBg = on ? choice.tint : defaultRingBg;

        return (
          <button
            key={choice.id}
            onClick={() => onSelect(choice)}
            className="press flex w-[5.75rem] sm:w-[6rem] shrink-0 flex-col items-center gap-2 select-none text-center"
            style={{ scrollSnapAlign: "start" }}
            aria-pressed={on}
          >
            {/* Outer Ring Circle: matches 'לפנות מקום' by default, turns into emotion tint on selection */}
            <span
              className="relative grid h-[5.75rem] w-[5.75rem] sm:h-[6rem] sm:w-[6rem] place-items-center rounded-full transition-colors duration-250"
              style={{
                backgroundColor: ringBg,
                transform: on ? "scale(1.02)" : "scale(1)",
              }}
            >
              {/* Inner Organic Blob with wash color & icon pattern */}
              <span
                className="grid h-12 w-12 sm:h-13 sm:w-13 place-items-center transition-transform duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                style={{
                  backgroundColor: choice.wash,
                  borderRadius: choice.blob,
                  transform: `rotate(${rot})`,
                }}
              >
                {Icon && (
                  <span style={{ transform: `rotate(${counterRot})` }}>
                    <Icon
                      className="w-5 h-5 text-white/95 drop-shadow-xs"
                      strokeWidth={1.5}
                    />
                  </span>
                )}
              </span>

              {/* Selection Dot: solid filled ochre dot as in reference */}
              {on && (
                <span
                  className="absolute top-0.5 left-1.5 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "#B08A3C" }}
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