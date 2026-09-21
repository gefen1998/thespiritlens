import React, { useState } from "react";
import { Search } from "lucide-react";
import BottomTabs from "@/components/BottomTabs";
import EditorialCard, { TOOL_CARD_META } from "@/components/EditorialCard";
import ToolListRow from "@/components/ToolListRow";
import ViewToggle from "@/components/ViewToggle";
import { tools } from "@/lib/spiritContent";

const VIEW_KEY = "sl_tools_view";

const SECTIONS = [
  {
    id: "body",
    title: "הרגעת הגוף",
    tools: [
      "gentle-exhale",
      "return-to-senses",
      "ground-touch",
      "body-scan",
      "light-beam",
      "anchoring",
    ],
  },
  {
    id: "thought",
    title: "מחשבה",
    tools: ["thought-meeting"],
  },
  {
    id: "emotion",
    title: "מתן מקום לרגש",
    tools: ["emotion-space"],
  },
  {
    id: "spirit",
    title: "חיזוק הרוח",
    tools: [
      "light-beam",
      "gratitude-moment",
      "word-for-path",
      "meaning-choice",
      "strengthening-memory",
      "anchoring",
    ],
  },
];

export default function Tools() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem(VIEW_KEY) === "grid" ? "grid" : "list";
    } catch {
      return "list";
    }
  });
  const q = query.trim().toLowerCase();

  const changeView = (next) => {
    setView(next);
    try {
      localStorage.setItem(VIEW_KEY, next);
    } catch {}
  };

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
    <div dir="rtl" lang="he" className="min-h-screen bg-background text-foreground flex flex-col justify-between overflow-x-hidden">
      <div className="max-w-md mx-auto w-full px-6 pt-6 pb-28">
        {/* Title */}
        <div className="text-right">
          <h1 className="leading-[1.1]">
            <span className="block text-[32px] sm:text-[36px] font-bold text-[#6B6A63]">
              אוסף
            </span>
            <span className="block text-[34px] sm:text-[38px] font-bold text-[#16161A] mt-0.5">
              הכלים
            </span>
          </h1>

          <div className="mt-2.5 text-[13px] text-[#6B6A63] leading-relaxed">
            <p>הכלים מאורגנים לפי ארבעה שערים.</p>
            <p>בחרו את מה שנכון לכם עכשיו.</p>
          </div>
        </div>

        {/* Search + view toggle */}
        <div className="mt-4 flex items-center gap-2">
          <div className="relative flex flex-1 items-center h-11 rounded-full bg-[#E7E5DF] px-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש"
              className="w-full bg-transparent border-0 outline-none text-sm font-medium text-[#16161A] placeholder:text-[#6B6A63] pr-7 text-right"
            />
            <Search className="absolute right-4 w-4 h-4 text-[#6B6A63] pointer-events-none" strokeWidth={1.8} />
          </div>
          <ViewToggle value={view} onChange={changeView} />
        </div>

        {/* Sections */}
        <div className="space-y-5 mt-5">
          {visibleSections.map((sec) => (
            <div key={sec.id}>
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-2.5">
                <h2 className="text-[17px] font-bold text-[#16161A]">
                  {sec.title}
                </h2>
                <span className="text-[17px] font-normal text-[#6B6A63] tabular-nums">
                  {sec.toolIds.length}
                </span>
              </div>

              {view === "grid" ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {sec.toolIds.map((id) => (
                    <EditorialCard key={id} tool={tools[id]} />
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-[#D8D5CC] border-y border-[#D8D5CC]">
                  {sec.toolIds.map((id) => (
                    <ToolListRow key={id} tool={tools[id]} category={sec.title} />
                  ))}
                </div>
              )}
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