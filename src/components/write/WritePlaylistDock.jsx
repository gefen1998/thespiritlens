import React, { useState } from "react";
import { Music, Pause, ChevronDown } from "lucide-react";
import { tools } from "@/lib/spiritContent";
import useYouTubePlaylist from "@/hooks/useYouTubePlaylist";
import WritePlaylistPanel from "@/components/write/WritePlaylistPanel";

const playlist = tools.anchoring.playlist;

/**
 * A quiet floating music button that stays with the writer through every step.
 * Tap = play / pause the niggunim. Once started, a small handle opens the mini player.
 */
export default function WritePlaylistDock({ topClass = "top-3" }) {
  const player = useYouTubePlaylist(playlist.listId, true);
  const [started, setStarted] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setStarted(true);
    player.toggle();
  };

  return (
    <div dir="rtl" className={`fixed z-40 ${topClass} left-[calc(max(0px,50%-14rem)+4.75rem)] transition-[top] duration-200`}>
      <WritePlaylistPanel open={open} playlist={playlist} player={player} onClose={() => setOpen(false)} />
      <div className="flex items-center h-11 rounded-full bg-[#16161A] text-[#F1F0EC] shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
        <button
          onClick={handleToggle}
          aria-label={player.playing ? "השהיית הניגונים" : "הפעלת ניגונים ברקע"}
          aria-pressed={player.playing}
          className="press w-11 h-11 rounded-full grid place-items-center"
        >
          {player.playing ? (
            <Pause className="w-[17px] h-[17px]" strokeWidth={2} />
          ) : (
            <Music className="w-[17px] h-[17px]" strokeWidth={1.8} />
          )}
        </button>
        {started && (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "סגירת הנגן" : "פתיחת הנגן"}
            aria-expanded={open}
            className="press h-11 pl-3 pr-1 grid place-items-center border-r border-white/10"
          >
            <ChevronDown className={`w-4 h-4 text-[#A8A69D] transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}