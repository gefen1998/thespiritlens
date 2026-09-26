import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function GateMoments({ moments, selected, onChange }) {
  const [open, setOpen] = useState(selected.length > 0);
  const toggle = (m) => onChange(selected.includes(m) ? selected.filter((x) => x !== m) : [...selected, m]);

  return (
    <div className="mx-3 -mt-2 pt-4 pb-2 px-4 rounded-b-[20px] bg-[#EFE6CF] text-right">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 py-1 text-[14px] font-medium text-[#6B5320]"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2} />
        {open ? "הסתר רגעים" : `בחר רגעים ספציפיים (אופציונלי)${selected.length ? ` · ${selected.length}` : ""}`}
      </button>
      {open && (
        <div className="pt-1">
          {moments.map((m) => {
            const on = selected.includes(m);
            return (
              <button key={m} type="button" onClick={() => toggle(m)} className="w-full flex items-center gap-3 py-2 text-right">
                <span className={`w-6 h-6 shrink-0 rounded-full grid place-items-center ${on ? "bg-[#16161A] text-white" : "border-2 border-[#C9BC9A]"}`}>
                  {on && <Check className="w-3 h-3" strokeWidth={2.5} />}
                </span>
                <span className={`text-[15px] ${on ? "font-semibold text-[#16161A]" : "text-[#2C2B26]"}`}>{m}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}