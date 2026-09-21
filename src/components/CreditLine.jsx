import React from "react";
import { site } from "@/lib/spiritContent";

export default function CreditLine({ className = "" }) {
  return (
    <div dir="rtl" lang="he" className={`text-center px-6 ${className}`}>
      <p className="text-[11px] leading-relaxed text-[#8C8B84]">
        {site.footerCredit}.
      </p>
      <p className="text-[11px] leading-relaxed text-[#8C8B84]">
        {site.copyright}
      </p>
    </div>
  );
}