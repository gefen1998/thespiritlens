import React from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { useLang } from "@/lib/i18n";

const COVER = "https://media.base44.com/images/public/6aa5ba6278746a9e6313ec62/bc64df6d4_PHOTO-2026-09-20-16-06-55.jpg";

export default function PlaylistHomeCard() {
  const { t } = useLang();

  return (
    <div className="mt-8">
      <p className="text-[13px] font-medium text-[#6B6A63] mb-2.5 text-start">
        {t("פסקול מלווה לספר", "A soundtrack for the book")}
      </p>
      <Link
        to="/tool/anchoring"
        aria-label={t("ניגונים להאזנה", "Melodies to listen to")}
        className="press group relative block aspect-[1024/566] rounded-[28px] overflow-hidden bg-[#EFECE4] shadow-[0_2px_10px_rgba(0,0,0,0.06)] select-none"
      >
        <img src={COVER} alt={t("חוסן של אמת - פסקול מלווה לספר", "Resilience of Truth - a soundtrack for the book")} className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute bottom-4 left-4 grid place-items-center w-12 h-12 rounded-full bg-[#16161A] text-[#F8F7F4] shadow-md">
          <Play className="w-5 h-5 fill-current ms-0.5" strokeWidth={1.5} />
        </span>
      </Link>
    </div>
  );
}