import React from "react";
import { Link } from "react-router-dom";

export const TOOL_CARD_META = {
  "gentle-exhale": {
    line1: "נשיפה",
    line2: "שקטה",
    time: "01:00",
    bg: "#d6e5d6",
    pebble: "#8fae92",
    textDark: "#223827",
    textMuted: "#6b866f",
    pebbleRadius: "46% 54% 58% 42% / 48% 52% 48% 52%",
  },
  "ground-touch": {
    line1: "מגע",
    line2: "בקרקע",
    time: "01:00",
    bg: "#e6e2d8",
    pebble: "#a89f92",
    textDark: "#28231d",
    textMuted: "#7a7268",
    pebbleRadius: "58% 42% 46% 54% / 54% 46% 54% 46%",
  },
  "return-to-senses": {
    line1: "חזרה",
    line2: "אל החושים",
    time: "03:00",
    bg: "#d0dfed",
    pebble: "#89a5bf",
    textDark: "#1a3048",
    textMuted: "#617c97",
    pebbleRadius: "42% 58% 54% 46% / 56% 44% 56% 44%",
  },
  "body-scan": {
    line1: "סריקת",
    line2: "גוף",
    time: "05:00",
    bg: "#e6e2d8",
    pebble: "#a89f92",
    textDark: "#28231d",
    textMuted: "#7a7268",
    pebbleRadius: "54% 46% 42% 58% / 46% 54% 46% 54%",
  },
  "anchoring": {
    line1: "ניגון",
    line2: "כעוגן",
    time: "03:00",
    bg: "#d7dced",
    pebble: "#838ea9",
    textDark: "#272b4c",
    textMuted: "#6c7295",
    pebbleRadius: "50% 50% 56% 44% / 44% 56% 44% 56%",
  },
  "light-beam": {
    line1: "קרן",
    line2: "אור",
    time: "05:00",
    bg: "#f3e5c8",
    pebble: "#ceaa61",
    textDark: "#4e3810",
    textMuted: "#8a7140",
    pebbleRadius: "48% 52% 52% 48% / 52% 48% 52% 48%",
  },
  "word-for-path": {
    line1: "מילה",
    line2: "לדרך",
    time: "01:00",
    bg: "#e4d9e7",
    pebble: "#a388ab",
    textDark: "#382440",
    textMuted: "#7a6383",
    pebbleRadius: "56% 44% 50% 50% / 50% 50% 50% 50%",
  },
  "gratitude-moment": {
    line1: "רגע",
    line2: "של הודיה",
    time: "01:00",
    bg: "#f3e5c8",
    pebble: "#ceaa61",
    textDark: "#4e3810",
    textMuted: "#8a7140",
    pebbleRadius: "52% 48% 46% 54% / 54% 46% 54% 46%",
  },
  "nesheama": {
    line1: "ארבעה",
    line2: "שערים",
    time: "04:00",
    bg: "#d6e5d6",
    pebble: "#8fae92",
    textDark: "#223827",
    textMuted: "#6b866f",
    pebbleRadius: "46% 54% 58% 42% / 48% 52% 48% 52%",
  },
  "meaning-choice": {
    line1: "משמעות",
    line2: "ובחירה",
    time: "03:00",
    bg: "#e4d9e7",
    pebble: "#a388ab",
    textDark: "#382440",
    textMuted: "#7a6383",
    pebbleRadius: "46% 54% 48% 52% / 52% 48% 54% 46%",
  },
};

export default function EditorialCard({ tool }) {
  if (!tool) return null;
  const meta = TOOL_CARD_META[tool.id] || {
    line1: tool.name,
    line2: "",
    time: tool.duration || "01:00",
    bg: "#e6e2d8",
    pebble: "#a89f92",
    textDark: "#28231d",
    textMuted: "#7a7268",
    pebbleRadius: "50% 50% 50% 50%",
  };

  return (
    <Link
      to={`/tool/${tool.id}`}
      className="press group relative flex flex-col justify-between h-[168px] p-4 rounded-[22px] overflow-hidden select-none transition-transform"
      style={{ backgroundColor: meta.bg }}
    >
      {/* Top right: Title and Subtitle */}
      <div className="text-right z-10">
        <span
          className="block font-bold text-[17px] leading-tight"
          style={{ color: meta.textDark }}
        >
          {meta.line1}
        </span>
        {meta.line2 && (
          <span
            className="block font-medium text-[14px] leading-tight mt-0.5"
            style={{ color: meta.textMuted }}
          >
            {meta.line2}
          </span>
        )}
      </div>

      {/* The organic pebble texture on the left side of the card */}
      <div className="absolute left-3 bottom-3 w-[72px] h-[72px] flex items-center justify-center pointer-events-none z-0">
        <div
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundColor: meta.pebble,
            borderRadius: meta.pebbleRadius,
          }}
        />
      </div>

      {/* Bottom right: Duration aligned under the text */}
      <div className="text-right z-10 mt-auto">
        <span
          className="text-xs font-normal tabular-nums"
          style={{ color: meta.textMuted }}
        >
          {meta.time}
        </span>
      </div>
    </Link>
  );
}