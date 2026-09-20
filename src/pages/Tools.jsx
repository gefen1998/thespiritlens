import React, { useState } from "react";
import { Search } from "lucide-react";
import BottomTabs from "@/components/BottomTabs";
import EditorialCard, { TOOL_CARD_META } from "@/components/EditorialCard";
import { tools } from "@/lib/spiritContent";

const SECTIONS = [
  {
    id: "breath",
    title: "נשימה",
    tools: ["gentle-exhale", "ground-touch"],
  },
  {
    id: "quiet",
    title: "שקט",
    tools: ["return-to-senses", "body-scan", "light-beam"],
  },
  {
    id: "meaning",
    title: "משמעות",
    tools: ["meaning-choice", "word-for-path"],
  },
  {
    id: "gratitude",
    title: "הודיה",
    tools: ["gratitude-moment", "anchoring"],
  },
];

export default function Tools() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const matches = (toolId) => {
    if (!q) return true;
    const t = tools[toolId];
    const meta = TOOL_CARD_META[toolId];
    const textToSearch = [
      t?.name,
      t?.description,
      meta?.line1,
      meta?.line2,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return textToSearch.includes(q);
  };

  const visibleSections = SECTIONS.map((sec) => ({
    ...sec,
    toolIds: sec.tools.filter(matches),
  })).filter((sec) => sec.toolIds.length > 0);

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div className="max-w-md mx-auto w-full px-6 pt-12 pb-32">
        {/* Title */}
        <div className="text-right">
          <h1 className="leading-tight">
            <span className="block text-4xl sm:text-5xl font-bold text-muted-foreground/60">
              אוסף
            </span>
            <span className="block text-4xl sm:text-5xl font-bold text-foreground mt-0.5">
              הכלים
            </span>
          </h1>

          <div className="mt-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>תשעה תרגולים קצרים, נלווים לספר.</p>
            <p>אפשר לבחור לפי תחושה או לפי זמן.</p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <label className="flex items-center gap-2.5 h-12 px-4.5 rounded-full bg-secondary/80 text-muted-foreground cursor-text">
            <Search className="w-4 h-4 text-muted-foreground/75 shrink-0" strokeWidth={1.8} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש"
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-sm font-medium text-foreground placeholder:text-muted-foreground/80 text-right"
            />
          </label>
        </div>

        {/* Sections */}
        <div className="space-y-8 mt-8">
          {visibleSections.map((sec) => (
            <div key={sec.id}>
              {/* Section Header */}
              <div className="flex items-baseline gap-2 mb-3">
                <h2 className="text-2xl font-bold text-foreground">
                  {sec.title}
                </h2>
                <span className="text-2xl font-normal text-muted-foreground/60 tabular-nums">
                  {sec.toolIds.length}
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {sec.toolIds.map((id) => (
                  <EditorialCard key={id} tool={tools[id]} />
                ))}
              </div>
            </div>
          ))}

          {visibleSections.length === 0 && (
            <p className="mt-8 text-sm text-muted-foreground text-center">
              אין תרגול בשם הזה. אפשר לנקות את החיפוש ולעיין באוסף.
            </p>
          )}
        </div>
      </div>

      <BottomTabs />
    </div>
  );
}