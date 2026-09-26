import React from "react";
import { ArrowRight } from "lucide-react";

export default function BackTextButton({ onClick, disabled = false, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="חזרה"
      className={`press shrink-0 flex items-center gap-1.5 h-[3.5rem] px-2 text-[16px] font-medium text-[#4A4943] disabled:opacity-30 disabled:pointer-events-none ${className}`}
    >
      <ArrowRight className="w-[18px] h-[18px]" strokeWidth={1.75} />
      חזרה
    </button>
  );
}