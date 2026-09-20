import React from "react";
import { useNavigate } from "react-router-dom";
import BottomTabs from "@/components/BottomTabs";
import { site } from "@/lib/spiritContent";

const CHAPTERS = [
  {
    letter: "נ",
    title: "נשימה ונוכחות",
    page: 41,
    bg: "#d7e4d8", // soft sage green
  },
  {
    letter: "ש",
    title: "שקט פנימי והתבוננות",
    page: 68,
    bg: "#cfe0ee", // soft sky blue
  },
  {
    letter: "מ",
    title: "משמעות ובחירה",
    page: 96,
    bg: "#e2d9e6", // soft lavender/lilac
  },
  {
    letter: "ה",
    title: "הכרת תודה",
    page: 124,
    bg: "#eedebb", // soft amber/sand
  },
];

export default function Book() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div className="max-w-md mx-auto w-full px-6 pt-6 pb-24">
        {/* Title */}
        <div className="text-right">
          <h1 className="leading-[1.1]">
            <span className="block text-[32px] sm:text-[36px] font-bold text-[#8c877e]">
              ארבעה
            </span>
            <span className="block text-[34px] sm:text-[38px] font-bold text-[#1f1c19] mt-0.5">
              שערים
            </span>
          </h1>

          <div className="mt-2.5 text-[13px] text-[#78736a] leading-relaxed">
            <p>מודל נשמ״ה, כפי שהוא מופיע בספר.</p>
            <p>לכל שער עמוד משלו, ואפשר לכתוב בו בכתב יד.</p>
          </div>
        </div>

        {/* Divider above items */}
        <div className="border-t border-[#ded8cb] mt-4" />

        {/* List of 4 gates */}
        <div className="divide-y divide-[#ded8cb] border-b border-[#ded8cb]">
          {CHAPTERS.map((c) => (
            <button
              key={c.letter}
              onClick={() => navigate("/tool/nesheama")}
              className="press w-full flex items-center gap-4 py-3 sm:py-3.5 text-right transition-colors group"
            >
              {/* Circular badge */}
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-xl text-[#201e1b] select-none transition-transform group-hover:scale-105"
                style={{ backgroundColor: c.bg }}
              >
                {c.letter}
              </span>

              {/* Title & Page */}
              <div className="flex-1 min-w-0">
                <span className="block text-[16px] sm:text-[17px] font-bold text-[#201e1b] leading-tight">
                  {c.title}
                </span>
                <span className="block text-[12px] text-[#78736a] mt-0.5 tabular-nums">
                  עמוד {c.page}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Credit line below items */}
        <p className="mt-3.5 text-[11.5px] sm:text-[12px] text-[#8c877e] leading-relaxed text-right">
          {site.footerCredit}.
        </p>
      </div>

      <BottomTabs />
    </div>
  );
}