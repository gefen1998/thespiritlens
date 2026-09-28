import React from "react";
import { Play, Pause, RotateCcw, RotateCw, Volume1, Volume2, VolumeX } from "lucide-react";

const fmt = (s) => `${Math.floor((s || 0) / 60)}:${String(Math.floor((s || 0) % 60)).padStart(2, "0")}`;

function SkipButton({ Icon, onClick, label }) {
  return (
    <button onClick={onClick} aria-label={label} className="press relative w-14 h-14 grid place-items-center text-[#16161A]">
      <Icon className="w-9 h-9" strokeWidth={1.4} />
      <span className="absolute text-[10px] font-bold pt-0.5">15</span>
    </button>
  );
}

/** Headspace-style transport: scrubber, skip ±15s, big play, speed and volume. */
export default function AudioTransport({ p }) {
  const VolIcon = p.volume === 0 ? VolumeX : p.volume < 0.5 ? Volume1 : Volume2;
  return (
    <div dir="ltr" className="w-full">
      <input
        type="range" min={0} max={p.duration || 0} step={0.1} value={p.time}
        onChange={(e) => p.seek(Number(e.target.value))}
        aria-label="מיקום בהקלטה"
        className="w-full h-1 accent-[#16161A] cursor-pointer"
      />
      <div className="mt-1.5 flex justify-between text-[12px] text-[#6B6A63] tabular-nums">
        <span>{fmt(p.time)}</span>
        <span>-{fmt(p.duration - p.time)}</span>
      </div>

      <div className="mt-5 flex items-center justify-center gap-8">
        <SkipButton Icon={RotateCcw} onClick={() => p.skip(-15)} label="15 שניות אחורה" />
        <button
          onClick={p.toggle}
          aria-label={p.playing ? "השהיה" : "האזנה"}
          className="press w-[76px] h-[76px] rounded-full bg-[#16161A] text-[#FBFAF7] grid place-items-center"
        >
          {p.playing ? <Pause className="w-8 h-8" fill="currentColor" strokeWidth={0} /> : <Play className="w-8 h-8 ml-1" fill="currentColor" strokeWidth={0} />}
        </button>
        <SkipButton Icon={RotateCw} onClick={() => p.skip(15)} label="15 שניות קדימה" />
      </div>

      <div className="mt-7 flex items-center gap-4">
        <button
          onClick={p.cycleSpeed}
          aria-label="מהירות ניגון"
          className="press h-9 min-w-[64px] px-3 rounded-full bg-[#E7E5DF] text-[#16161A] text-[13px] font-bold tabular-nums"
        >
          {p.speed}x
        </button>
        <VolIcon className="w-5 h-5 text-[#4A4943] shrink-0" strokeWidth={1.8} />
        <input
          type="range" min={0} max={1} step={0.01} value={p.volume}
          onChange={(e) => p.setVolume(Number(e.target.value))}
          aria-label="עוצמת שמע"
          className="flex-1 h-1 accent-[#16161A] cursor-pointer"
        />
      </div>
    </div>
  );
}