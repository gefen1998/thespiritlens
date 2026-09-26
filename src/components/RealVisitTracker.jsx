import { useEffect } from "react";
import { base44 } from "@/api/base44Client";

// Fires one anonymous "real_visit" event per browser session, only after a
// genuine human interaction (touch, click, key, wheel). Bots almost never do this.
const EVENTS = ["pointerdown", "touchstart", "keydown", "wheel"];
const KEY = "sl_real_visit_tracked";

export default function RealVisitTracker() {
  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const onInteract = () => {
      sessionStorage.setItem(KEY, "1");
      base44.analytics.track({ eventName: "real_visit" });
      EVENTS.forEach((e) => window.removeEventListener(e, onInteract));
    };
    EVENTS.forEach((e) => window.addEventListener(e, onInteract, { passive: true }));
    return () => EVENTS.forEach((e) => window.removeEventListener(e, onInteract));
  }, []);
  return null;
}