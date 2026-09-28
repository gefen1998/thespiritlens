import React from "react";
import { Link } from "react-router-dom";
import { Play, Music2 } from "lucide-react";
import { tools } from "@/lib/spiritContent";
import { useLang } from "@/lib/i18n";

export default function PlaylistHomeCard() {
  const { t } = useLang();
  const cover = tools.anchoring.playlist.coverUrl;

  return (
    <div className="mt-8">
      <p className="text-[13px] font-medium text-[#6B6A63] mb-2.5 text-start">
        {t("פסקול מלווה לספר", "A soundtrack for the book")}
      </p>
      <Link
        to="/tool/anchoring"
        className="press group relative block h-[190px] rounded-[28px] overflow-hidden bg-[#E7E5DF] select-none"
      >
        <img src={cover} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16161A]/80 via-[#16161A]/20 to-transparent" />
        <div className="relative z-10 h-full flex items-end justify-between gap-3 p-5">
          <div className="text-start">
            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#F1F0EC]/85">
              <Music2 className="w-3.5 h-3.5" strokeWidth={2} />
              {t("ניגון כעוגן", "Melody as anchor")}
            </span>
            <span className="block mt-1 text-[22px] font-bold leading-tight text-[#F8F7F4]">
              {t("ניגונים להאזנה", "Melodies to listen to")}
            </span>
            <span className="block mt-0.5 text-[12.5px] text-[#E7E5DF]/85">
              {t("שירים וניגונים לחיזוק הנפש והרוח", "Songs and melodies to strengthen soul and spirit")}
            </span>
          </div>
          <span className="shrink-0 grid place-items-center w-12 h-12 rounded-full bg-[#F8F7F4] text-[#16161A] shadow-md">
            <Play className="w-5 h-5 fill-current ms-0.5" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    </div>
  );
}