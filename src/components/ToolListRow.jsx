import React from "react";
import { Link } from "react-router-dom";
import { TOOL_CARD_META, getToolIcon } from "@/components/EditorialCard";

const FALLBACK = {
  pebble: "#7C7263",
  textMuted: "#7C7263",
  pebbleRadius: "52% 48% 60% 40% / 46% 54% 46% 54%",
  rotation: "-10deg",
};

export default function ToolListRow({ tool, category }) {
  if (!tool) return null;
  const meta = TOOL_CARD_META[tool.id] || FALLBACK;
  const Icon = meta.icon || getToolIcon(tool.id);
  const time = meta.time || tool.duration || "01:00";
  const rot = meta.rotation || FALLBACK.rotation || "0deg";

  return (
    <Link
      to={`/tool/${tool.id}`}
      className="press group flex items-center gap-3.5 py-3 text-right select-none"
    >
      {/* Organic pigment mark */}
      <span
        className="w-[38px] h-[38px] shrink-0 grid place-items-center transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundColor: meta.pebble || FALLBACK.pebble,
          borderRadius: meta.pebbleRadius || FALLBACK.pebbleRadius,
          transform: `rotate(${rot})`,
        }}
      >
        {Icon && (
          <span style={{ transform: `rotate(${rot.startsWith("-") ? rot.slice(1) : `-${rot}`})` }}>
            <Icon className="w-[17px] h-[17px] text-white/90" strokeWidth={1.4} />
          </span>
        )}
      </span>

      {/* Title + description */}
      <span className="flex-1 min-w-0">
        <span className="block text-[16px] font-bold text-[#16161A] leading-tight">
          {tool.name}
        </span>
        {tool.description && (
          <span className="block text-[12.5px] text-[#6B6A63] leading-snug mt-0.5">
            {tool.description}
          </span>
        )}
      </span>

      {/* Time + category */}
      <span className="shrink-0 text-left">
        <span className="block text-[12px] text-[#6B6A63] tabular-nums">{time}</span>
        {category && (
          <span className="block text-[11.5px] text-[#8C8B84] mt-0.5">{category}</span>
        )}
      </span>
    </Link>
  );
}