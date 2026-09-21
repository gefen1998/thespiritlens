import React from "react";
import { useNavigate } from "react-router-dom";
import BottomTabs from "@/components/BottomTabs";

const CHAPTERS = [
  {
    letter: "נ",
    title: "נשימה ונוכחות",
    note: "חזרה עדינה אל הגוף ואל הרגע הזה.",
    page: 41,
    bg: "#CFD8C6", // sage tint
    ink: "#3A4A33",
    shape: "46% 54% 58% 42% / 48% 52% 48% 52%",
  },
  {
    letter: "ש",
    title: "שקט פנימי והתבוננות",
    note: "לשים לב למה שנוכח, בלי למהר לשנות.",
    page: 68,
    bg: "#C7D2DC", // dusk tint
    ink: "#2F404B",
    shape: "58% 42% 46% 54% / 54% 46% 54% 46%",
  },
  {
    letter: "מ",
    title: "משמעות ובחירה",
    note: "מה נמצא בידי, ומה נכון לבחור עכשיו.",
    page: 96,
    bg: "#C9CBDA", // indigo tint
    ink: "#2B3049",
    shape: "50% 50% 56% 44% / 44% 56% 44% 56%",
  },
  {
    letter: "ה",
    title: "הכרת תודה",
    note: "להכיר בדבר אחד קטן שתומך בנו.",
    page: 124,
    bg: "#E6D8B8", // ochre tint
    ink: "#5F4A1C",
    shape: "52% 48% 46% 54% / 54% 46% 54% 46%",
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
            <p>תרגול קצר בארבעה שלבים, על פי מודל עדשת הרוח.</p>
            <p>כל שלב נמצא גם בספר, בעמוד של האות.</p>
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
                className="w-12 h-12 flex items-center justify-center shrink-0 font-bold text-xl select-none transition-transform group-hover:scale-105"
                style={{ backgroundColor: c.bg, color: c.ink, borderRadius: c.shape }}
              >
                {c.letter}
              </span>

              {/* Title & Page */}
              <div className="flex-1 min-w-0">
                <span className="block text-[16px] sm:text-[17px] font-bold text-[#16161A] leading-tight">
                  {c.title}
                </span>
                <span className="block text-[12.5px] text-[#6B6A63] mt-0.5 leading-snug">
                  {c.note}
                </span>
                <span className="block text-[11.5px] text-[#8C8B84] mt-0.5 tabular-nums">
                  עמוד {c.page}
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>

      <BottomTabs />
    </div>
  );
}