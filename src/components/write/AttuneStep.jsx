import React from "react";
import { CornerWingMotif } from "@/components/SpiritWings";

const MOMENT_EXAMPLES = [
  "רגע של אומץ",
  "שיחה עם בן משפחה",
  "רגע של פחד",
  "חיבוק",
  "החלטה שקיבלת",
  "משפט שנאמר לך",
  "רגע של שינוי",
  "רגע של חסד",
  "מפגש לא צפוי",
  "פרידה",
  "נשימה עמוקה",
  "רגע של משמעות",
];

export default function AttuneStep() {
  return (
    <div className="mt-6 text-right">
      <span className="text-[13px] font-semibold text-[#8C7440]">התכווננות</span>
      <h1 className="mt-1 text-[28px] font-bold leading-[1.25] text-[#16161A]">בחר רגע אחד משמעותי.</h1>
      <p className="mt-3 text-[18px] leading-[1.6] text-[#4A4943]">
        לא את כל התקופה — רגע אחד חי, אחד שנשאר איתך.
      </p>

      <div className="relative overflow-hidden mt-6 p-5 rounded-[26px] bg-[#FBFAF7]">
        <CornerWingMotif className="left-0 bottom-4 w-16 h-32" color="#C9A868" opacity={0.25} />
        <p className="relative text-[14px] font-semibold text-[#6B6A63]">זה יכול להיות:</p>
        <ul className="relative mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
          {MOMENT_EXAMPLES.map((m) => (
            <li key={m} className="flex items-center gap-2 text-[15px] text-[#2C2B26]">
              <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#C4A968]" />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}