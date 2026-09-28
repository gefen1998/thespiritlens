import React, { useState } from "react";
import { Search } from "lucide-react";
import BottomTabs from "@/components/BottomTabs";
import EditorialCard, { TOOL_CARD_META } from "@/components/EditorialCard";
import ToolListRow from "@/components/ToolListRow";
import ViewToggle from "@/components/ViewToggle";
import { tools as heTools } from "@/lib/spiritContent";
import { localizeTools } from "@/lib/spiritContentEn";
import { useLang } from "@/lib/i18n";

const VIEW_KEY = "sl_tools_view";

const SECTIONS = [
  {
    id: "body",
    title: "הרגעת הגוף",
    titleEn: "Calming the body",
    tools: [
      "gentle-exhale",
      "return-to-senses",
      "ground-touch",
      "body-scan",
    ],
  },
  {
    id: "thought",
    title: "מחשבה",
    titleEn: "Thought",
    tools: ["thought-meeting"],
  },
  {
    id: "emotion",
    title: "מתן מקום לרגש",
    titleEn: "Making room for feeling",
    tools: ["emotion-space"],
  },
  {
    id: "spirit",
    title: "חיזוק הרוח",
    titleEn: "Strengthening the spirit",
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
  const { lang, dir, t: tx } = useLang();
  const tools = localizeTools(heTools, lang);
  const secTitle = (sec) => (lang === "en" ? sec.titleEn : sec.title);
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
    <div dir={dir} lang={lang} className="min-h-screen bg-background text-foreground flex flex-col justify-between overflow-x-hidden">
      <div className="max-w-md mx-auto w-full px-6 pt-6 pb-28">
        {/* Title */}
        <div className="text-start">
          <h1 className="leading-[1.1]">
            <span className="block text-[32px] sm:text-[36px] font-bold text-[#6B6A63]">
              {tx("אוסף", "The collection")}
            </span>
            <span className="block text-[34px] sm:text-[38px] font-bold text-[#16161A] mt-0.5">
              {tx("הכלים", "of tools")}
            </span>
          </h1>

          <div className="mt-2.5 text-[13px] text-[#6B6A63] leading-relaxed">
            <p>{tx("הכלים מאורגנים לפי ארבעה שערים.", "The tools are organized by four gates.")}</p>
            <p>{tx("בחרו את מה שנכון לכם עכשיו.", "Choose what feels right for you now.")}</p>
          </div>
        </div>

        {/* Search + view toggle */}
        <div className="mt-4 flex items-center gap-2">
          <div className="relative flex flex-1 items-center h-11 rounded-full bg-[#E7E5DF] px-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tx("חיפוש", "Search")}
              className="w-full bg-transparent border-0 outline-none text-sm font-medium text-[#16161A] placeholder:text-[#6B6A63] pe-7 text-start"
            />
            <Search className="absolute end-4 w-4 h-4 text-[#6B6A63] pointer-events-none" strokeWidth={1.8} />
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
                  {secTitle(sec)}
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
                    <ToolListRow key={id} tool={tools[id]} category={secTitle(sec)} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {visibleSections.length === 0 && (
            <p className="mt-8 text-sm text-muted-foreground text-center">
              {tx("אין תרגול בשם הזה. אפשר לנקות את החיפוש ולעיין באוסף.", "No practice by that name. Clear the search to browse the collection.")}
            </p>
          )}
        </div>
      </div>

      <BottomTabs />
    </div>
  );
}