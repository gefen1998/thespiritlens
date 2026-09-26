import React from "react";
import { CornerWingMotif } from "@/components/SpiritWings";

// Saved design — not in use right now (removed from the page per client request).
export default function LightSentenceCard({ value, onChange }) {
  return (
    <div className="relative overflow-hidden p-6 rounded-[26px] bg-[#B0654A] text-right">
      <CornerWingMotif className="left-0 top-2 w-24 h-40" color="#FBFAF7" opacity={0.16} />
      <div className="relative">
        <span className="text-[12px] font-semibold text-[#FBFAF7]/75">מתוך התרגול</span>
        <p className="mt-2 text-[20px] font-bold text-[#FBFAF7] leading-[1.45]">
          מה המשפט שעלה לך בתרגול כוח המדמה של קרן אור מונחית?
        </p>
        <p className="mt-2 text-[15px] text-[#FBFAF7]/80 leading-[1.7]">
          אותו משפט שצף מתוכך — כתוב אותו כאן. הוא ילווה אותך לאורך הדרך.
        </p>
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="המשפט שלי..."
          className="mt-5 w-full h-14 rounded-[18px] bg-[#FBFAF7]/15 border-none px-5 text-[16px] text-[#FBFAF7] placeholder:text-[#FBFAF7]/55 focus:outline-none focus:ring-2 focus:ring-[#FBFAF7]/35 text-right"
        />
      </div>
    </div>
  );
}