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
    tools: ["return-to-senses", "body-scan", "anchoring"],
  },
  {
    id: "meaning",
    title: "משמעות",
    tools: ["light-beam", "word-for-path"],
  },
  {
    id: "gratitude",
    title: "הכרת תודה",
    tools: ["gratitude-moment", "nesheama"],
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
      <div className="max-w-md mx-auto w-full px-5 pt-8 pb-32">
        {/* Title */}
        <div className="text-right">
          <h1 className="leading-tight">
            <span className="block text-[36px] font-bold text-[#8f9499] leading-none">
              אוסף
            </span>
            <span className="block text-[36px] font-bold text-[#191c1f] leading-none mt-1">
              הכלים
            </span>
          </h1>

          <div className="mt-4 text-[14px] text-[#6b6d70] leading-[1.5]">
            <p>תשעה תרגולים קצרים, נלווים לספר.</p>
            <p>אפשר לבחור לפי תחושה או לפי זמן.</p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5">
          <div className="relative flex items-center h-12 rounded-full bg-[#e8e4db] px-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש"
              className="w-full bg-transparent border-0 outline-none text-sm font-medium text-[#191c1f] placeholder:text-[#888b90] pr-7 text-right"
            />
            <Search className="absolute right-4 w-4 h-4 text-[#888b90] pointer-events-none" strokeWidth={1.8} />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-7 mt-7">
          {visibleSections.map((sec) => (
            <div key={sec.id}>
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-[20px] font-bold text-[#1f1c19]">
                  {sec.title}
                </h2>
                <span className="text-[20px] font-normal text-[#8c8985] tabular-nums">
                  {sec.toolIds.length}
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3">
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