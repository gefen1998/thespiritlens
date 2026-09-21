import React from "react";
import { Link } from "react-router-dom";
import {
  Wind,
  Brain,
  Waves,
  Sun,
  Anchor,
  Compass,
  Heart,
  Sparkles,
  Activity,
  Feather,
} from "lucide-react";
import { toneIcons } from "@/lib/toneIcons";
import { toolTone } from "@/lib/spiritContent";

export const TOOL_CARD_META = {
  "gentle-exhale": {
    line1: "נשיפה",
    line2: "שקטה",
    time: "01:00",
    bg: "#CFD8C6",
    pebble: "#6E8C63",
    textDark: "#3A4A33",
    textMuted: "#6E8C63",
    pebbleRadius: "46% 54% 58% 42% / 48% 52% 48% 52%",
    icon: Wind,
  },
  "ground-touch": {
    line1: "מגע",
    line2: "בקרקע",
    time: "01:00",
    bg: "#D6D1C6",
    pebble: "#7C7263",
    textDark: "#463F35",
    textMuted: "#7C7263",
    pebbleRadius: "58% 42% 46% 54% / 54% 46% 54% 46%",
    icon: Compass,
  },
  "return-to-senses": {
    line1: "חזרה",
    line2: "אל החושים",
    time: "03:00",
    bg: "#C7D2DC",
    pebble: "#5A7387",
    textDark: "#2F404B",
    textMuted: "#5A7387",
    pebbleRadius: "42% 58% 54% 46% / 56% 44% 56% 44%",
    icon: Waves,
  },
  "body-scan": {
    line1: "סריקת",
    line2: "גוף",
    time: "05:00",
    bg: "#D6D1C6",
    pebble: "#7C7263",
    textDark: "#463F35",
    textMuted: "#7C7263",
    pebbleRadius: "54% 46% 42% 58% / 46% 54% 46% 54%",
    icon: Activity,
  },
  "anchoring": {
    line1: "ניגון",
    line2: "כעוגן",
    time: "03:00",
    bg: "#C9CBDA",
    pebble: "#4E5680",
    textDark: "#2B3049",
    textMuted: "#4E5680",
    pebbleRadius: "50% 50% 56% 44% / 44% 56% 44% 56%",
    icon: Anchor,
  },
  "light-beam": {
    line1: "קרן",
    line2: "אור",
    time: "05:00",
    bg: "#E6D8B8",
    pebble: "#B08A3C",
    textDark: "#5F4A1C",
    textMuted: "#8F6F2E",
    pebbleRadius: "48% 52% 52% 48% / 52% 48% 52% 48%",
    icon: Sun,
  },
  "word-for-path": {
    line1: "מילה",
    line2: "לדרך",
    time: "01:00",
    bg: "#D8CBD8",
    pebble: "#7A5C7D",
    textDark: "#463149",
    textMuted: "#7A5C7D",
    pebbleRadius: "56% 44% 50% 50% / 50% 50% 50% 50%",
    icon: Feather,
  },
  "gratitude-moment": {
    line1: "רגע",
    line2: "של הודיה",
    time: "01:00",
    bg: "#E6D8B8",
    pebble: "#B08A3C",
    textDark: "#5F4A1C",
    textMuted: "#8F6F2E",
    pebbleRadius: "52% 48% 46% 54% / 54% 46% 54% 46%",
    icon: Heart,
  },
  "nesheama": {
    line1: "ארבעה",
    line2: "שערים",
    time: "04:00",
    bg: "#CFD8C6",
    pebble: "#6E8C63",
    textDark: "#3A4A33",
    textMuted: "#6E8C63",
    pebbleRadius: "46% 54% 58% 42% / 48% 52% 48% 52%",
    icon: Sparkles,
  },
  "meaning-choice": {
    line1: "משמעות",
    line2: "ובחירה",
    time: "03:00",
    bg: "#D8CBD8",
    pebble: "#7A5C7D",
    textDark: "#463149",
    textMuted: "#7A5C7D",
    pebbleRadius: "46% 54% 48% 52% / 52% 48% 54% 46%",
    icon: Compass,
  },
  "thought-release": {
    line1: "לשחרר",
    line2: "",
    time: "02:00",
    bg: "#C9CBDA",
    pebble: "#4E5680",
    textDark: "#2B3049",
    textMuted: "#4E5680",
    pebbleRadius: "50% 50% 50% 50%",
    icon: Feather,
  },
  "thought-meeting": {
    line1: "מה המחשבה",
    line2: "מבקשת ממני?",
    time: "03:00",
    bg: "#C9CBDA",
    pebble: "#4E5680",
    textDark: "#2B3049",
    textMuted: "#4E5680",
    pebbleRadius: "50% 50% 50% 50%",
    icon: Brain,
  },
  "emotion-space": {
    line1: "לתת מקום",
    line2: "לרגש",
    time: "03:00",
    bg: "#D8CBD8",
    pebble: "#7A5C7D",
    textDark: "#463149",
    textMuted: "#7A5C7D",
    pebbleRadius: "50% 50% 50% 50%",
    icon: Heart,
  },
  "strengthening-memory": {
    line1: "זיכרון",
    line2: "שמחזק",
    time: "03:00",
    bg: "#D6D1C6",
    pebble: "#7C7263",
    textDark: "#463F35",
    textMuted: "#7C7263",
    pebbleRadius: "52% 48% 50% 50% / 48% 52% 50% 50%",
    icon: Sparkles,
  },
};

export function getToolIcon(toolId) {
  if (toolId && TOOL_CARD_META[toolId]?.icon) {
    return TOOL_CARD_META[toolId].icon;
  }
  const tone = toolTone(toolId || "");
  return toneIcons[tone] || Sparkles;
}

export default function EditorialCard({ tool, showTime = true }) {
  if (!tool) return null;
  const meta = TOOL_CARD_META[tool.id] || {
    line1: tool.name,
    line2: "",
    time: tool.duration || "01:00",
    bg: "#D6D1C6",
    pebble: "#7C7263",
    textDark: "#463F35",
    textMuted: "#7C7263",
    pebbleRadius: "50% 50% 50% 50%",
  };

  const Icon = meta.icon || getToolIcon(tool.id);

  return (
    <Link
      to={`/tool/${tool.id}`}
      className="press group relative flex flex-col justify-between h-[148px] sm:h-[158px] p-3.5 sm:p-4 rounded-[20px] overflow-hidden select-none transition-transform"
      style={{ backgroundColor: meta.bg }}
    >
      {/* Top right: Title and Subtitle */}
      <div className="text-right z-10">
        <span
          className="block font-bold text-[16px] sm:text-[17px] leading-tight"
          style={{ color: meta.textDark }}
        >
          {meta.line1}
        </span>
        {meta.line2 && (
          <span
            className="block font-medium text-[13px] sm:text-[14px] leading-tight mt-0.5"
            style={{ color: meta.textMuted }}
          >
            {meta.line2}
          </span>
        )}
      </div>

      {/* The organic pebble texture on the left side of the card with pattern icon */}
      <div className="absolute left-2.5 bottom-2.5 w-[62px] h-[62px] flex items-center justify-center pointer-events-none z-0">
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundColor: meta.pebble,
            borderRadius: meta.pebbleRadius,
          }}
        >
          {Icon && (
            <Icon
              className="w-6 h-6 text-white/90 drop-shadow-sm"
              strokeWidth={1.4}
            />
          )}
        </div>
      </div>

      {/* Bottom right: Duration aligned under the text */}
      {showTime && (
        <div className="text-right z-10 mt-auto">
          <span
            className="text-[11.5px] sm:text-xs font-normal tabular-nums"
            style={{ color: meta.textMuted }}
          >
            {meta.time}
          </span>
        </div>
      )}
    </Link>
  );
}