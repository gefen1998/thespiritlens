import React from "react";

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
  return (
    <div className="mt-4 p-5 rounded-[26px] bg-[#FBFAF7] text-right">
      <p className="text-[17px] font-bold text-[#16161A]">שאלות מנחות:</p>
      <ul className="mt-3 space-y-3">
        {QUESTIONS.map((q) => (
          <li key={q} className="flex items-start gap-2.5 text-[16px] leading-[1.6] text-[#4A4943]">
            <span className="mt-[0.6em] w-1.5 h-1.5 shrink-0 rounded-full bg-[#C4A968]" />
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}