import React from "react";
import { Quote, Check } from "lucide-react";
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
    <div className="mt-6 text-right">
      <h1 className="text-[32px] font-bold leading-[1.2]">
        <span className="block text-[#A9A69D]">לפני שכותבים,</span>
        <span className="block text-[#16161A]">יש פסוק, מילה או משפט שמחזקים אותך?</span>
      </h1>
      <p className="mt-3 text-[16px] text-[#6B6A63]">משהו שאתה חוזר אליו בזמנים קשים.</p>

      <div className="relative overflow-hidden mt-6 p-6 min-h-[190px] rounded-[28px] bg-[#E8D9B5]">
        <CornerWingMotif className="left-0 top-6 w-20 h-40" color="#C9A868" opacity={0.45} />
        <div className="relative">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B5320]">
            <Quote className="w-3.5 h-3.5 fill-current" strokeWidth={0} />
            המשפט שילווה אותך בכתיבה
          </span>
          <textarea
            rows={2}
            value={formData.anchor || ""}
            onChange={(e) => setField("anchor", e.target.value)}
            placeholder="כתבו כאן או בחרו מלמטה..."
            className="mt-3 w-full bg-transparent border-none resize-none p-0 text-[26px] font-medium leading-snug text-[#5E4A1E] placeholder:text-[#9C8A63] focus:outline-none text-right"
          />
        </div>
      </div>

      <p className="mt-7 pb-2 text-[13px] text-[#6B6A63] border-b border-[#D6D2C8]">למשל:</p>
      <div>
        {ANCHOR_CHIPS.map((chip) => {
          const on = formData.anchor === chip;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => setField("anchor", on ? "" : chip)}
              className="w-full flex items-center justify-between gap-3 py-4 border-b border-[#D6D2C8] text-right"
            >
              <span className={`text-[17px] ${on ? "font-bold text-[#16161A]" : "text-[#2C2B26]"}`}>{chip}</span>
              <span className={`w-8 h-8 shrink-0 rounded-full grid place-items-center ${on ? "bg-[#16161A] text-white" : "border-2 border-[#B5B2A9]"}`}>
                {on && <Check className="w-4 h-4" strokeWidth={2.5} />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}