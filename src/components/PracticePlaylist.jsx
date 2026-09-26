import React, { useState } from "react";
import { Music, ChevronDown, ExternalLink } from "lucide-react";
import useYouTubePlaylist from "@/hooks/useYouTubePlaylist";
import PlaylistControls from "@/components/PlaylistControls";

/**
 * A quiet listening bar for a practice: a YouTube playlist that can play
 * alongside the exercise. Collapsed by default so it never competes with the
 * practice itself; expanded it shows the player so tracks can be skipped.
 */
export default function PracticePlaylist({ playlist, className = "" }) {
  const [open, setOpen] = useState(false);
  const player = useYouTubePlaylist(playlist?.listId, open);
  if (!playlist?.listId) return null;

  const watchUrl = `https://www.youtube.com/playlist?list=${playlist.listId}`;

  return (
    <div dir="rtl" className={className || "w-full"}>
      <div className="w-full rounded-[20px] bg-[#16161A] text-[#F1F0EC] shadow-[0_4px_20px_rgba(0,0,0,0.18)] overflow-hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="press w-full flex items-center gap-3 px-4 py-3.5 text-right"
        >
          <span className="grid place-items-center w-9 h-9 rounded-full bg-white/10 shrink-0">
            <Music className="w-[17px] h-[17px]" strokeWidth={1.7} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[14px] font-semibold leading-tight">{playlist.title}</span>
            <span className="block text-[12px] text-[#A8A69D] leading-snug mt-0.5">{playlist.note}</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#A8A69D] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            strokeWidth={2}
          />
        </button>

        {open && (
          <div className="px-3 pb-3">
            <div className="relative rounded-[14px] overflow-hidden bg-black h-[170px]">
              <div ref={player.containerRef} className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0" />
              {/* Keep one steady playlist cover instead of a changing per-track frame */}
              {playlist.coverUrl && (
                <img
                  src={playlist.coverUrl}
                  alt={playlist.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}
            </div>
            <PlaylistControls
              title={player.title}
              playing={player.playing}
              onPrev={player.prev}
              onToggle={player.toggle}
              onNext={player.next}
            />
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 flex items-center justify-center gap-1.5 text-[12px] text-[#A8A69D] hover:text-[#F1F0EC] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.8} />
              פתיחת הפלייליסט ביוטיוב
            </a>
          </div>
        )}
      </div>
    </div>
  );
}