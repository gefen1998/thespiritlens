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
      <div className="max-w-md mx-auto w-full px-6 pt-12 pb-32">
        {/* Title */}
        <div className="text-right">
          <h1 className="leading-tight">
            <span className="block text-4xl sm:text-5xl font-bold text-muted-foreground/60">
              ארבעה
            </span>
            <span className="block text-4xl sm:text-5xl font-bold text-foreground mt-0.5">
              שערים
            </span>
          </h1>

          <div className="mt-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>מודל נשמ״ה, כפי שהוא מופיע בספר.</p>
            <p>לכל שער עמוד משלו, ואפשר לכתוב בו בכתב יד.</p>
          </div>
        </div>

        {/* Divider above items */}
        <div className="border-t border-border/80 mt-7" />

        {/* List of 4 gates */}
        <div className="divide-y divide-border/80 border-b border-border/80">
          {CHAPTERS.map((c) => (
            <button
              key={c.letter}
              onClick={() => navigate("/tool/nesheama")}
              className="press w-full flex items-center gap-5 py-5 text-right transition-colors group"
            >
              {/* Circular badge */}
              <span
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-serif text-2xl text-foreground select-none transition-transform group-hover:scale-105"
                style={{ backgroundColor: c.bg }}
              >
                {c.letter}
              </span>

              {/* Title & Page */}
              <div className="flex-1 min-w-0">
                <span className="block text-lg sm:text-xl font-bold text-foreground leading-snug">
                  {c.title}
                </span>
                <span className="block text-sm text-muted-foreground/80 mt-1 tabular-nums">
                  עמוד {c.page}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Credit line below items */}
        <p className="mt-7 text-xs sm:text-sm text-muted-foreground/80 leading-relaxed text-right">
          {site.footerCredit}.
        </p>
      </div>

      <BottomTabs />
    </div>
  );
}