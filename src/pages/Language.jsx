import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SpiritWingsWatermark } from "@/components/SpiritWings";

const OPTIONS = [
  { id: "he", label: "עברית" },
  { id: "en", label: "English" },
];

export default function Language() {
  const navigate = useNavigate();
  const { lang, dir, setLang, t } = useLang();
  const Back = dir === "rtl" ? ChevronRight : ChevronLeft;

  const choose = (id) => {
    setLang(id);
    navigate("/");
  };

  return (
    <div dir={dir} lang={lang} className="relative min-h-screen max-w-md mx-auto px-6 pt-6 pb-10 flex flex-col overflow-hidden">
      <button
        onClick={() => navigate(-1)}
        className="press self-start h-11 px-4 rounded-full bg-[#E7E5DF] hover:bg-[#D8D5CC] text-[#16161A] text-[14px] font-semibold flex items-center gap-1.5 relative z-10"
      >
        <Back className="w-4 h-4" strokeWidth={2} />
        {t("חזרה", "Back")}
      </button>

      <SpiritWingsWatermark
        className="absolute top-[15%] inset-x-0 w-full max-w-md mx-auto h-[36vh] min-h-[260px] pointer-events-none"
        color="#C9B48E"
        opacity={0.5}
        showEye={false}
        fit="100% 100%"
      />

      <div className="mt-auto relative z-10">
        <h1 className="text-[30px] font-bold leading-tight text-[#16161A]">
          {t("באיזו שפה נמשיך?", "Which language?")}
        </h1>
        <p className="text-[30px] font-bold leading-tight text-[#A5A39B]" dir={lang === "en" ? "rtl" : "ltr"}>
          {t("Which language?", "באיזו שפה נמשיך?")}
        </p>

        <div className="mt-7 space-y-3">
          {OPTIONS.map((o) => {
            const on = lang === o.id;
            return (
              <button
                key={o.id}
                onClick={() => choose(o.id)}
                aria-pressed={on}
                className={`press w-full h-[68px] px-6 rounded-[24px] flex items-center justify-between text-[17px] font-bold transition-colors ${
                  on ? "bg-[#16161A] text-[#FBFAF7]" : "bg-[#DDD9D0] text-[#16161A] hover:bg-[#D3CFC5]"
                }`}
              >
                <span>{o.label}</span>
                {on && <Check className="w-5 h-5" strokeWidth={2} />}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[12.5px] text-[#6B6A63]">
          {t("אפשר לשנות בכל רגע דרך סמל הגלובוס בעמוד הבית.", "You can change this anytime via the globe icon on the home page.")}
        </p>
      </div>
    </div>
  );
}