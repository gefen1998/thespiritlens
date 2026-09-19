import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import BreathOrb from "@/components/BreathOrb";
import EmotionCheckIn from "@/components/EmotionCheckIn";
import ActionButton from "@/components/ActionButton";
import { site, checkIn, firstVisit } from "@/lib/spiritContent";

const WELCOME_KEY = "sl_seen_welcome";

export default function Home() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return localStorage.getItem(WELCOME_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    if (!chosen) return;
    const timer = setTimeout(
      () => navigate("/guided/pause", { state: { target: chosen.target } }),
      560
    );
    return () => clearTimeout(timer);
  }, [chosen, navigate]);

  const enter = () => {
    try {
      localStorage.setItem(WELCOME_KEY, "1");
    } catch {
      // Storage can be blocked; the welcome simply shows again next time.
    }
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <SpiritLayout hideNav footer={false}>
        <div className="flex-1 flex flex-col justify-end pb-10">
          <div className="fade-in">
            <BreathOrb size={72} />

            <h1 className="mt-8 t-display text-foreground">{site.title}</h1>
            <p className="mt-2 t-lead text-muted-foreground">{site.subtitle}</p>
          </div>

          <div
            className="mt-8 rounded-3xl px-6 py-8 sm:px-10 fade-in text-right"
            style={{ backgroundColor: "hsl(var(--flame) / 0.08)" }}
          >
            <p className="t-title text-foreground max-w-sm">{firstVisit.title}</p>

            <div className="mt-5 space-y-4 max-w-sm">
              {firstVisit.lines.map((line, i) => (
                <p key={i} className="t-lead text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end fade-in">
            <ActionButton onClick={enter}>{firstVisit.button}</ActionButton>
          </div>
        </div>
      </SpiritLayout>
    );
  }

  return (
    <SpiritLayout>
      <div className="flex-1 flex flex-col">
        <EmotionCheckIn selected={chosen} onSelect={setChosen} />

        <Link
          to="/tools"
          className="mt-10 text-right t-small text-muted-foreground hover:text-flame transition-colors"
        >
          {checkIn.browseLabel}
        </Link>
      </div>
    </SpiritLayout>
  );
}
