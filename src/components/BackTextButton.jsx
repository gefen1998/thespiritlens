import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function BackTextButton({ onClick, disabled = false, className = "" }) {
  const { dir, t } = useLang();
  const Arrow = dir === "rtl" ? ArrowRight : ArrowLeft;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={t("חזרה", "Back")}
      className={`press shrink-0 flex items-center gap-1.5 h-[3.5rem] px-2 text-[16px] font-medium text-[#4A4943] disabled:opacity-30 disabled:pointer-events-none ${className}`}
    >
      <Arrow className="w-[18px] h-[18px]" strokeWidth={1.75} />
      {t("חזרה", "Back")}
    </button>
  );
}