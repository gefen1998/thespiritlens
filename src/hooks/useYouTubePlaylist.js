import { useEffect, useRef, useState } from "react";

let apiPromise;
function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve(window.YT);
      };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    });
  }
  return apiPromise;
}

/** Mounts a YouTube playlist player and exposes the current track + controls. */
export default function useYouTubePlaylist(listId, enabled) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [title, setTitle] = useState("");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!enabled || !listId) return;
    let cancelled = false;
    const wrapper = containerRef.current;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !wrapper) return;
      const target = document.createElement("div");
      wrapper.appendChild(target);
      const readTitle = (p) => setTitle(p.getVideoData?.()?.title || "");
      playerRef.current = new YT.Player(target, {
        width: "100%",
        height: "100%",
        playerVars: { listType: "playlist", list: listId, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: (e) => readTitle(e.target),
          onStateChange: (e) => {
            readTitle(e.target);
            setPlaying(e.data === YT.PlayerState.PLAYING);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
      if (wrapper) wrapper.innerHTML = "";
      setPlaying(false);
    };
  }, [listId, enabled]);

  const p = () => playerRef.current;
  return {
    containerRef,
    title,
    playing,
    next: () => p()?.nextVideo?.(),
    prev: () => p()?.previousVideo?.(),
    toggle: () => (playing ? p()?.pauseVideo?.() : p()?.playVideo?.()),
  };
}