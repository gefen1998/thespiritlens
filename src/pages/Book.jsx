import React from "react";
import { useNavigate } from "react-router-dom";
import BottomTabs from "@/components/BottomTabs";
import { site } from "@/lib/spiritContent";

const CHAPTERS = [
  {
    letter: "נ",
    title: "נשימה ונוכחות",
    page: 41,
    bg: "#CFD8C6", // sage tint
    ink: "#3A4A33",
  },
  {
    letter: "ש",
    title: "שקט פנימי והתבוננות",
    page: 68,
    bg: "#C7D2DC", // dusk tint
    ink: "#2F404B",
  },
  {
    letter: "מ",
    title: "משמעות ובחירה",
    page: 96,
    bg: "#D8CBD8", // mauve tint
    ink: "#463149",
  },
  {
    letter: "ה",
    title: "הכרת תודה",
    page: 124,
    bg: "#E6D8B8", // ochre tint
    ink: "#5F4A1C",
  },
];

export default function Book() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-background text-foreground flex flex-col justify-between overflow-x-hidden">
      <div className="max-w-md mx-auto w-full px-6 pt-6 pb-28">
        {/* Title */}
        <div className="text-right">
          <h1 className="leading-[1.1]">
            <span className="block text-[32px] sm:text-[36px] font-bold text-[#6B6A63]">
              ארבעה
            </span>
            <span className="block text-[34px] sm:text-[38px] font-bold text-[#16161A] mt-0.5">
              שערים
            </span>
          </h1>

          <div className="mt-2.5 text-[13px] text-[#6B6A63] leading-relaxed">
            <p>מודל נשמ״ה, כפי שהוא מופיע בספר.</p>
            <p>לכל שער עמוד משלו, ואפשר לכתוב בו בכתב יד.</p>
          </div>
        </div>

        {/* Divider above items */}
        <div className="border-t border-[#D8D5CC] mt-4" />

        {/* List of 4 gates */}
        <div className="divide-y divide-[#D8D5CC] border-b border-[#D8D5CC]">
          {CHAPTERS.map((c) => (
            <button
              key={c.letter}
              onClick={() => navigate("/tool/nesheama")}
              className="press w-full flex items-center gap-4 py-3 sm:py-3.5 text-right transition-colors group"
            >
              {/* Circular badge */}
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-xl select-none transition-transform group-hover:scale-105"
                style={{ backgroundColor: c.bg, color: c.ink }}
              >
                {c.letter}
              </span>

              {/* Title & Page */}
              <div className="flex-1 min-w-0">
                <span className="block text-[16px] sm:text-[17px] font-bold text-[#16161A] leading-tight">
                  {c.title}
                </span>
                <span className="block text-[12px] text-[#6B6A63] mt-0.5 tabular-nums">
                  עמוד {c.page}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Credit line below items */}
        <p className="mt-3.5 text-[11.5px] sm:text-[12px] text-[#6B6A63] leading-relaxed text-right">
          {site.footerCredit}.
        </p>
      </div>

      <BottomTabs />
    </div>
  );
}