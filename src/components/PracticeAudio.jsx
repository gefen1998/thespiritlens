import React, { useRef, useState } from "react";
import { Headphones, Play, Pause } from "lucide-react";

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** A quiet listening bar for a single guided recording, styled like PracticePlaylist. */
export default function PracticeAudio({ audio }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => (playing ? ref.current.pause() : ref.current.play());
  const seek = (e) => {
    ref.current.currentTime = Number(e.target.value);
    setTime(ref.current.currentTime);
  };

  return (
    <div dir="rtl" className="w-full rounded-[20px] bg-[#16161A] text-[#F1F0EC] shadow-[0_4px_20px_rgba(0,0,0,0.18)] px-4 py-3.5">
      <audio
        ref={ref}
        src={audio.url}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      />
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-9 h-9 rounded-full bg-white/10 shrink-0">
          <Headphones className="w-[17px] h-[17px]" strokeWidth={1.7} />
        </span>
        <span className="flex-1 min-w-0 text-right">
          <span className="block text-[14px] font-semibold leading-tight">{audio.title}</span>
          <span className="block text-[12px] text-[#A8A69D] leading-snug mt-0.5">{audio.note}</span>
        </span>
        <button
          onClick={toggle}
          aria-label={playing ? "השהיה" : "האזנה"}
          className="press w-11 h-11 rounded-full bg-[#F1F0EC] text-[#16161A] grid place-items-center shrink-0"
        >
          {playing ? <Pause className="w-[18px] h-[18px]" strokeWidth={2} /> : <Play className="w-[18px] h-[18px] -scale-x-100" strokeWidth={2} />}
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3 text-[11px] text-[#A8A69D] tabular-nums">
        <span>{fmt(time)}</span>
        <input
          type="range"
          dir="ltr"
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          onChange={seek}
          aria-label="מיקום בהקלטה"
          className="flex-1 h-1 accent-[#C9A868] cursor-pointer"
        />
        <span>{fmt(duration)}</span>
      </div>
    </div>
  );
}