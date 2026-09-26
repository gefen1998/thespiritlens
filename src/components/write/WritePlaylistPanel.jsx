import React from "react";
import { X } from "lucide-react";
import PlaylistControls from "@/components/PlaylistControls";

/** Small floating card with the cover, current track and skip controls. Stays mounted so music keeps playing. */
export default function WritePlaylistPanel({ open, playlist, player, onClose }) {
  return (
    <div
      role="dialog"
      aria-label={playlist.title}
      aria-hidden={!open}
      className={`absolute top-[56px] left-0 w-[264px] rounded-[20px] bg-[#16161A] text-[#F1F0EC] p-3 shadow-[0_8px_28px_rgba(0,0,0,0.22)] transition-all duration-200 origin-top-left ${
        open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[13px] font-semibold">{playlist.title}</span>
        <button onClick={onClose} aria-label="סגירת הנגן" className="w-7 h-7 rounded-full bg-white/10 grid place-items-center">
          <X className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
      <div className="relative rounded-[14px] overflow-hidden bg-black h-[120px]">
        <div ref={player.containerRef} className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0" />
        {playlist.coverUrl && (
          <img src={playlist.coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none" />
        )}
      </div>
      <PlaylistControls
        title={player.title}
        playing={player.playing}
        onPrev={player.prev}
        onToggle={player.toggle}
        onNext={player.next}
      />
    </div>
  );
}