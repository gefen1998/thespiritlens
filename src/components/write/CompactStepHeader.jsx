import React from "react";
import { X } from "lucide-react";

export default function CompactStepHeader({ title, stepNumber, onClose }) {
  return (
    <div className="sticky top-0 z-10 -mx-6 px-6 py-3 bg-[#F4F1EA] flex items-center justify-between">
      <p className="text-[14px]">
        <span className="font-bold text-[#16161A]">{title}</span>
        <span className="mx-1.5 text-[#9C9A91]">·</span>
        <span className="text-[#6B6A63]">{stepNumber}</span>
      </p>
      <button
        onClick={onClose}
        aria-label="סגירה"
        className="w-11 h-11 shrink-0 rounded-full bg-[#E5E1D8] hover:bg-[#DDD9CE] text-[#4A4943] grid place-items-center transition-colors"
      >
        <X className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  );
}