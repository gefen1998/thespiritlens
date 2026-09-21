import React, { useState } from "react";
import { Music, ChevronDown } from "lucide-react";

/**
 * A quiet listening bar for a practice: a YouTube playlist that can play
 * alongside the exercise. Collapsed by default so it never competes with the
 * practice itself; expanded it shows the player so tracks can be skipped.
 */
export default function PracticePlaylist({ playlist }) {
  const [open, setOpen] = useState(false);
  if (!playlist?.listId) return null;

  const src = `https://www.youtube-nocookie.com/embed/videoseries?list=${playlist.listId}&rel=0&modestbranding=1&playsinline=1${
    open ? "&autoplay=1" : ""
  }`;

  return (
    <div dir="rtl" className="fixed inset-x-0 bottom-0 z-20 px-4 pb-4 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto rounded-[20px] bg-[#16161A] text-[#F1F0EC] shadow-[0_4px_20px_rgba(0,0,0,0.18)] overflow-hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="press w-full flex items-center gap-3 px-4 py-3 text-right"
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
            <div className="rounded-[14px] overflow-hidden bg-black">
              <iframe
                src={src}
                title={playlist.title}
                className="w-full h-[170px] border-0 block"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}