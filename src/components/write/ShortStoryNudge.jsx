import React, { useEffect, useRef } from "react";
import { PenLine } from "lucide-react";

/** Gentle invitation to deepen a short story before moving on - never blocks. */
export default function ShortStoryNudge({ onAddMore, onContinue }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div ref={ref} className="rise-in mt-6 p-5 rounded-[24px] bg-[#FBFAF7] border border-[#E3D6B8] text-right">
      <p className="text-[17px] leading-[1.6] text-[#16161A]">
        הסיפור שלך כבר משמעותי. אולי נעמיק עוד רגע אחד, תחושה או פרט קטן?
      </p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-[#6B6A63]">
        דווקא הפרטים הקטנים נשארים בלב.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={onAddMore}
          className="press h-11 px-5 rounded-full bg-[#16161A] text-white text-[15px] font-bold flex items-center gap-2"
        >
          <PenLine className="w-4 h-4" strokeWidth={2} />
          אוסיף עוד
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="text-[14px] font-medium text-[#6B6A63] hover:text-[#16161A] transition-colors"
        >
          להמשיך כך - הסיפור שלם
        </button>
      </div>
    </div>
  );
}