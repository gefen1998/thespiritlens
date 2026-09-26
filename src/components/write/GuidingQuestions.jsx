import React, { useState } from "react";
import { ChevronDown, Lightbulb } from "lucide-react";

const QUESTIONS = [
  "איפה היית ומה קרה באותו רגע?",
  "מי היה שם?",
  "מה ראית? מה שמעת?",
  "מה הרגשת בגוף ובנפש?",
  "מה חשבת באותו רגע?",
  "מה היה שונה מהדרך שבה היית מגיב בעבר?",
  "האם היה כלי, משפט, אדם או תהליך שליווה אותך?",
  "מה השתנה בך בעקבות אותו רגע?",
];

export default function GuidingQuestions() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5 border-y border-[#DDD9CE] text-right">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full h-12 flex items-center gap-2 text-[15px] font-semibold text-[#4A4943]"
      >
        <Lightbulb className="w-4 h-4 text-[#B08A3E]" strokeWidth={1.8} />
        <span className="flex-1">שאלות מנחות לכתיבה</span>
        <ChevronDown className={`w-4 h-4 text-[#8C8B84] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="pb-3 space-y-1.5 text-[14.5px] leading-[1.55] text-[#6B6A63]">
          {QUESTIONS.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      )}
    </div>
  );
}