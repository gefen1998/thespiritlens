import React from "react";
import { Link } from "react-router-dom";

export const TOOL_CARD_META = {
  "gentle-exhale": {
    line1: "נשיפה",
    line2: "שקטה",
    time: "01:00",
    bg: "#d8e5d8",
    pebble: "#98b499",
    pebbleRadius: "48% 52% 56% 44% / 46% 54% 46% 54%",
  },
  "ground-touch": {
    line1: "מגע",
    line2: "בקרקע",
    time: "01:00",
    bg: "#e6e2d8",
    pebble: "#a89f92",
    pebbleRadius: "56% 44% 48% 52% / 52% 46% 54% 48%",
  },
  "return-to-senses": {
    line1: "חזרה",
    line2: "אל החושים",
    time: "03:00",
    bg: "#d2dfec",
    pebble: "#8ca6bf",
    pebbleRadius: "44% 56% 52% 48% / 54% 48% 52% 46%",
  },
  "body-scan": {
    line1: "סריקת",
    line2: "גוף",
    time: "05:00",
    bg: "#e6e2d8",
    pebble: "#a89f92",
    pebbleRadius: "52% 48% 44% 56% / 48% 54% 46% 52%",
  },
  "light-beam": {
    line1: "קרן",
    line2: "אור",
    time: "05:00",
    bg: "#eedfc4",
    pebble: "#cbb58a",
    pebbleRadius: "50% 50% 54% 46% / 46% 54% 46% 54%",
  },
  "meaning-choice": {
    line1: "משמעות",
    line2: "ובחירה",
    time: "03:00",
    bg: "#e3dbe7",
    pebble: "#b3a0ba",
    pebbleRadius: "46% 54% 48% 52% / 52% 48% 54% 46%",
  },
  "word-for-path": {
    line1: "מילה",
    line2: "לדרך",
    time: "01:00",
    bg: "#e6e2d8",
    pebble: "#a89f92",
    pebbleRadius: "54% 46% 52% 48% / 48% 52% 46% 54%",
  },
  "gratitude-moment": {
    line1: "רגע של",
    line2: "הודיה",
    time: "01:00",
    bg: "#eedfc4",
    pebble: "#cbb58a",
    pebbleRadius: "50% 50% 46% 54% / 54% 46% 54% 46%",
  },
  "anchoring": {
    line1: "עוגן",
    line2: "פנימי",
    time: "03:00",
    bg: "#d2dfec",
    pebble: "#8ca6bf",
    pebbleRadius: "48% 52% 54% 46% / 46% 54% 48% 52%",
  },
};

export default function EditorialCard({ tool }) {
  if (!tool) return null;
  const meta = TOOL_CARD_META[tool.id] || {
    line1: tool.name,
    line2: "",
    time: "01:00",
    bg: "#e6e2d8",
    pebble: "#a89f92",
    pebbleRadius: "50% 50% 50% 50%",
  };

  return (
    <Link
      to={`/tool/${tool.id}`}
      className="press group relative flex flex-col justify-between min-h-[175px] sm:min-h-[190px] p-4.5 rounded-[22px] transition-transform select-none"
      style={{ backgroundColor: meta.bg }}
    >
      {/* Title block */}
      <div className="flex flex-col text-right">
        <span className="font-bold text-lg sm:text-xl text-foreground leading-tight">
          {meta.line1}
        </span>
        {meta.line2 && (
          <span className="font-medium text-sm sm:text-base text-foreground/50 leading-tight mt-0.5">
            {meta.line2}
          </span>
        )}
      </div>

      {/* Organic stone / pebble texture */}
      <div className="my-auto py-2 flex items-center justify-center">
        <div
          className="w-20 h-20 sm:w-22 sm:h-22 transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundColor: meta.pebble,
            borderRadius: meta.pebbleRadius,
          }}
        />
      </div>

      {/* Digital duration */}
      <div className="w-full flex justify-end">
        <span className="text-xs font-medium tabular-nums text-foreground/50">
          {meta.time}
        </span>
      </div>
    </Link>
  );
}