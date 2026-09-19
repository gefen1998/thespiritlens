import React from "react";
import { Link } from "react-router-dom";
import { toneIcons } from "@/lib/toneIcons";

// The 2-column tool tile from the editorial import: tinted per pigment, an
// oversized decorative blob (the tone's own organic --form shape, not a
// generic rounded square) bleeding off the bottom corner, two stacked lines
// of bold text, a clock reading. Used on both the home quick-grid and the
// library grid so the two screens read as one system.
export default function EditorialCard({ tool, tone = "open" }) {
  const pigment = `var(--pigment-${tone})`;
  const form = `var(--form-${tone})`;
  const Icon = toneIcons[tone];
  const [line1, line2] = splitName(tool.name);

  return (
    <Link
      to={`/tool/${tool.id}`}
      className="press relative flex min-h-[11.5rem] flex-col justify-between overflow-hidden rounded-[18px] p-4"
      style={{ backgroundColor: `hsl(${pigment} / 0.14)` }}
    >
      <div className="relative z-10 flex flex-col gap-0.5">
        <span className="t-row leading-[1.15]" style={{ color: `hsl(${pigment})` }}>
          {line1}
        </span>
        {line2 && (
          <span className="t-row leading-[1.15] opacity-40" style={{ color: `hsl(${pigment})` }}>
            {line2}
          </span>
        )}
      </div>
      <Icon
        aria-hidden="true"
        strokeWidth={1.1}
        className="absolute bottom-8 left-3 w-20 h-20 opacity-45"
        style={{ color: `hsl(${pigment})`, borderRadius: form }}
      />
      <span className="relative z-10 t-small tabular-nums opacity-60" style={{ color: `hsl(${pigment})` }}>
        {tool.duration}
      </span>
    </Link>
  );
}

// The editorial layout wants two stacked lines per card (a short name, a
// dimmer second line); most of our tool names are one clause, so split on
// the first natural break and fall back to the whole name on one line.
function splitName(name) {
  const breakChars = [" — ", " – ", ": "];
  for (const sep of breakChars) {
    const i = name.indexOf(sep);
    if (i > 0) return [name.slice(0, i), name.slice(i + sep.length)];
  }
  const words = name.split(" ");
  if (words.length <= 2) return [name, null];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
