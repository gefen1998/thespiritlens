import React from "react";
import { X } from "lucide-react";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import AudioTransport from "@/components/audio/AudioTransport";
import { useLang } from "@/lib/i18n";

/** Full-screen guided-meditation player, in the spirit of Headspace. */
export default function GuidedAudioPlayer({ tool, onClose, onFinish, onReadInstead }) {
  const p = useAudioPlayer();
  const { audio } = tool;
  const { lang, dir, t } = useLang();

  return (
    <div dir={dir} lang={lang} className="relative min-h-screen max-w-md mx-auto flex flex-col px-6 pt-5 pb-8 overflow-hidden">
      {/* Soft blurred wash of the cover behind everything */}
      <img src={audio.coverUrl} alt="" aria-hidden="true" className="absolute inset-0 w-full h-[55%] object-cover opacity-30 blur-2xl scale-110 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4F1EA]/80 to-[#F4F1EA] pointer-events-none" />

      <audio src={audio.url} onEnded={onFinish} {...p.audioProps} />

      <div className="relative flex items-center justify-between">
        <button onClick={onClose} aria-label={t("סגירה", "Close")} className="press w-11 h-11 rounded-full bg-[#FBFAF7]/80 text-[#4A4943] grid place-items-center">
          <X className="w-5 h-5" strokeWidth={2} />
        </button>
        <span className="text-[13px] font-semibold text-[#6B6A63]">{tool.duration}</span>
      </div>

      <div className="relative mt-6 mx-auto w-full aspect-square max-w-[300px] rounded-[36px] overflow-hidden">
        <img src={audio.coverUrl} alt={audio.title} className={`w-full h-full object-cover object-right origin-right transition-transform duration-[4000ms] ${p.playing ? "scale-105" : "scale-100"}`} />
      </div>

      <div className="relative mt-7 text-start">
        <h1 className="text-[26px] font-bold leading-tight text-[#16161A]">{audio.title}</h1>
        <p className="mt-1 text-[14px] text-[#6B6A63]">{tool.description}</p>
      </div>

      <div className="relative mt-6">
        <AudioTransport p={p} />
      </div>

      <div className="relative mt-auto pt-8 flex items-center justify-between text-[14px] font-semibold">
        <button onClick={onReadInstead} className="text-[#6B6A63] underline underline-offset-4">{t("לתרגול בכתב", "Read instead")}</button>
        <button onClick={onFinish} className="press h-11 px-6 rounded-full bg-[#E7E5DF] text-[#16161A]">{t("סיימתי", "Done")}</button>
      </div>
    </div>
  );
}