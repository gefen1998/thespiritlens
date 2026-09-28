import { useRef, useState } from "react";

const SPEEDS = [0.75, 1, 1.25, 1.5];

export default function useAudioPlayer() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolumeState] = useState(1);

  const toggle = () => (ref.current.paused ? ref.current.play() : ref.current.pause());
  const seek = (t) => {
    ref.current.currentTime = Math.max(0, Math.min(t, duration || 0));
    setTime(ref.current.currentTime);
  };
  const skip = (s) => seek(ref.current.currentTime + s);
  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    ref.current.playbackRate = next;
    setSpeed(next);
  };
  const setVolume = (v) => {
    ref.current.volume = v;
    setVolumeState(v);
  };

  const audioProps = {
    ref,
    preload: "metadata",
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onTimeUpdate: (e) => setTime(e.target.currentTime),
    onLoadedMetadata: (e) => setDuration(e.target.duration),
  };

  return { audioProps, playing, time, duration, speed, volume, toggle, seek, skip, cycleSpeed, setVolume };
}