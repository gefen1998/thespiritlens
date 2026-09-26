import React from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function PlaylistControls({ title, playing, onPrev, onToggle, onNext }) {
  return (
    <div className="mt-3 px-1">
      <p className="text-[11px] text-[#A8A69D] text-right">{playing ? "מתנגן עכשיו" : "השיר הנוכחי"}</p>
      <p className="text-[14px] font-semibold leading-snug text-right truncate mt-0.5">
        {title || "לחצו על הפעלה כדי להתחיל"}
      </p>
      <div dir="ltr" className="mt-3 flex items-center justify-center gap-5">
        <button onClick={onPrev} aria-label="השיר הקודם" className="press w-10 h-10 rounded-full bg-white/10 grid place-items-center">
          <SkipBack className="w-[18px] h-[18px]" strokeWidth={1.8} />
        </button>
        <button onClick={onToggle} aria-label={playing ? "השהיה" : "הפעלה"} className="press w-12 h-12 rounded-full bg-[#F1F0EC] text-[#16161A] grid place-items-center">
          {playing ? <Pause className="w-5 h-5" strokeWidth={2} /> : <Play className="w-5 h-5 ml-0.5" strokeWidth={2} />}
        </button>
        <button onClick={onNext} aria-label="השיר הבא" className="press w-10 h-10 rounded-full bg-white/10 grid place-items-center">
          <SkipForward className="w-[18px] h-[18px]" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}