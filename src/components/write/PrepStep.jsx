import React from "react";

const ANCHOR_CHIPS = [
  "אדוני עוז לעמו ייתן",
  "ובחרת בחיים",
  "גם כי אלך בגיא צלמוות",
  "אין ייאוש בעולם כלל",
  "אני כאן",
  "עם ישראל חי",
];

export default function PrepStep({ formData, setField }) {
  return (
    <div className="mt-6 space-y-4">
      <div className="p-5 rounded-[26px] bg-[#2B3149] text-right">
        <p className="text-[18px] font-bold text-[#F8F7F4] leading-[1.45]">
          מה המשפט שעלה לך בתרגול כוח המדמה של קרן אור מונחית?
        </p>
        <p className="mt-2 text-[14px] text-[#F8F7F4]/70 leading-relaxed">
          אותו משפט שצף מתוכך. אפשר לכתוב אותו כאן, והוא ילווה אותך לאורך הדרך.
        </p>
        <input
          value={formData.lightSentence || ""}
          onChange={(e) => setField("lightSentence", e.target.value)}
          placeholder="המשפט שלי..."
          className="mt-4 w-full h-14 rounded-[18px] bg-white/10 border border-white/15 px-4 text-[16px] text-[#F8F7F4] placeholder:text-[#F8F7F4]/45 focus:outline-none focus:ring-2 focus:ring-white/30 text-right"
        />
      </div>

      <div className="p-5 rounded-[26px] bg-[#FBFAF7] text-right">
        <p className="text-[18px] font-bold text-[#16161A] leading-[1.45]">
          יש פסוק, מילה או משפט שמחזקים אותך?
        </p>
        <p className="mt-1.5 text-[14px] text-[#6B6A63]">משהו שחוזרים אליו בזמנים קשים.</p>
        <input
          value={formData.anchor || ""}
          onChange={(e) => setField("anchor", e.target.value)}
          placeholder="לכתוב כאן..."
          className="mt-4 w-full h-14 rounded-[18px] bg-[#FBFAF7] border border-[#DDD9CE] px-4 text-[16px] text-[#16161A] placeholder:text-[#8E8B83] focus:outline-none focus:ring-2 focus:ring-[#B35C44]/40 text-right"
        />
        <p className="mt-3 text-[12.5px] text-[#7E7B73]">למשל:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {ANCHOR_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setField("anchor", chip)}
              className={`h-10 px-4 rounded-full text-[14px] font-medium transition-all active:scale-95 ${
                formData.anchor === chip ? "bg-[#B0654A] text-[#FBFAF7]" : "bg-[#ECE7DE] text-[#4A4943] hover:bg-[#E3DDD2]"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}