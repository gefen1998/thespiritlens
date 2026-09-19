import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toneIcons } from "@/lib/toneIcons";
import { cn } from "@/lib/utils";

// The check-in options, tiled asymmetrically like How We Feel / Headspace's
// tool grids — a few full-width feature rows with a description, the rest
// compact square tiles with just the label. Feature rows stay on the app's
// soft card radius; tiles go sharper (rounded-lg), so the page isn't one
// radius applied to everything. Each card carries an icon, oversized and
// faint in the corner, the way every reference tile does.
export default function FeelingSlip({ label, sub, tone = "open", selected, dimmed, onClick, size = "feature" }) {
  const pigment = `var(--pigment-${tone})`;
  const isTile = size === "tile";
  const Icon = toneIcons[tone];

  return (
    <Card
      onClick={onClick}
      role="button"
      aria-pressed={selected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className={cn(
        "press relative cursor-pointer select-none overflow-hidden border-0 text-right transition-all duration-500 h-full",
        isTile ? "rounded-lg" : "rounded-3xl",
        dimmed ? "opacity-30 scale-[0.98]" : "opacity-100"
      )}
      style={{
        backgroundColor: `hsl(${pigment} / ${selected ? 1 : 0.92})`,
        boxShadow: selected
          ? `0 16px 32px -14px hsl(${pigment} / 0.55)`
          : `0 10px 24px -16px hsl(${pigment} / 0.4)`,
      }}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.25}
        className={cn(
          "absolute text-white/[0.16] pointer-events-none",
          isTile ? "-bottom-3 -left-3 w-16 h-16" : "-bottom-5 -left-5 w-28 h-28"
        )}
      />
      <CardContent
        className={cn(
          "relative",
          isTile ? "flex h-full min-h-[7.5rem] flex-col justify-between px-4 py-4" : "px-6 py-5"
        )}
      >
        {isTile ? (
          <>
            <Icon strokeWidth={1.5} className="w-5 h-5 text-white/85" />
            <span className="block t-small font-semibold leading-snug text-white">{label}</span>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <span className="block t-row text-white">{label}</span>
              <Icon strokeWidth={1.5} className="w-6 h-6 shrink-0 text-white/85" />
            </div>
            {sub && <span className="mt-1.5 block t-small text-white/80">{sub}</span>}
          </>
        )}
      </CardContent>
    </Card>
  );
}
