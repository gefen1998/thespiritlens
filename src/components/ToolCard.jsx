import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toneIcons } from "@/lib/toneIcons";
import { cn } from "@/lib/utils";

// feature = full-width row with description (the first tool in a gate);
// tile = compact square in the 2-col grid, label + duration only. Feature
// keeps the soft card radius, tiles go sharper — the same split as the
// check-in grid, so the two screens read as one system.
export default function ToolCard({ tool, tone = "open", size = "feature" }) {
  const pigment = `var(--pigment-${tone})`;
  const isTile = size === "tile";
  const Icon = toneIcons[tone];

  return (
    <Link to={`/tool/${tool.id}`} className="block h-full">
      <Card
        className={cn(
          "press relative overflow-hidden border-0 transition-transform h-full",
          isTile ? "rounded-lg" : "rounded-3xl"
        )}
        style={{ backgroundColor: `hsl(${pigment} / 0.12)` }}
      >
        <Icon
          aria-hidden="true"
          strokeWidth={1.25}
          className={cn("absolute pointer-events-none", isTile ? "-bottom-3 -left-3 w-14 h-14" : "-bottom-4 -left-4 w-20 h-20")}
          style={{ color: `hsl(${pigment} / 0.18)` }}
        />
        <CardContent
          className={cn(
            "relative",
            isTile ? "flex h-full min-h-[7rem] flex-col justify-between px-4 py-4" : "px-5 py-4"
          )}
        >
          {isTile ? (
            <>
              <Icon strokeWidth={1.5} className="w-5 h-5" style={{ color: `hsl(${pigment})` }} />
              <div>
                <h3 className="t-small font-semibold leading-snug" style={{ color: `hsl(${pigment})` }}>
                  {tool.name}
                </h3>
                <span className="mt-0.5 block t-micro text-muted-foreground/70">{tool.duration}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Icon strokeWidth={1.5} className="w-5 h-5 shrink-0" style={{ color: `hsl(${pigment})` }} />
                  <h3 className="t-row" style={{ color: `hsl(${pigment})` }}>
                    {tool.name}
                  </h3>
                </div>
                <Badge
                  variant="secondary"
                  className="shrink-0 rounded-md border-0 t-micro font-medium shadow-none"
                  style={{ backgroundColor: `hsl(${pigment} / 0.16)`, color: `hsl(${pigment})` }}
                >
                  {tool.duration}
                </Badge>
              </div>
              <p className="mt-1.5 t-small text-foreground/70">{tool.description}</p>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
