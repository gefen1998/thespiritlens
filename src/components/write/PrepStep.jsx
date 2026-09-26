import React from "react";
import { CornerWingMotif } from "@/components/SpiritWings";

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
    <div className="mt-6">
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
            value={formData.lightSentence || ""}
            onChange={(e) => setField("lightSentence", e.target.value)}
            placeholder="המשפט שלי..."
            className="mt-5 w-full h-14 rounded-[18px] bg-[#FBFAF7]/15 border-none px-5 text-[16px] text-[#FBFAF7] placeholder:text-[#FBFAF7]/55 focus:outline-none focus:ring-2 focus:ring-[#FBFAF7]/35 text-right"
          />
        </div>
      </div>

      <div className="mt-8 text-right">
        <p className="text-[22px] font-bold text-[#16161A] leading-[1.4]">
          יש פסוק, מילה או משפט שמחזקים אותך?
        </p>
        <p className="mt-2 text-[15px] text-[#6B6A63]">משהו שאתה חוזר אליו בזמנים קשים.</p>
        <input
          value={formData.anchor || ""}
          onChange={(e) => setField("anchor", e.target.value)}
          placeholder="כתוב כאן..."
          className="mt-4 w-full h-14 rounded-[18px] bg-[#E3DFD6] border-none px-5 text-[16px] text-[#16161A] placeholder:text-[#8E8B83] focus:outline-none focus:ring-2 focus:ring-[#B35C44]/40 text-right"
        />
        <p className="mt-5 text-[12.5px] font-medium text-[#6B6A63]">למשל:</p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {ANCHOR_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setField("anchor", chip)}
              className={`h-12 px-5 rounded-full text-[15px] transition-all active:scale-95 ${
                formData.anchor === chip ? "bg-[#B0654A] text-[#FBFAF7]" : "bg-[#DAD6CD] text-[#4A4943] hover:bg-[#D2CEC4]"
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