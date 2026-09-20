import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowUpLeft } from "lucide-react";
import BottomTabs from "@/components/BottomTabs";
import BreathOrb from "@/components/BreathOrb";
import EmotionCheckIn from "@/components/EmotionCheckIn";
import EditorialCard from "@/components/EditorialCard";
import ActionButton from "@/components/ActionButton";
import { site, editorial, firstVisit, gates, tools, fatigueOptions, memoryFlow, toolTone } from "@/lib/spiritContent";

const WELCOME_KEY = "sl_seen_welcome";
const QUICK_IDS = ["gentle-exhale", "gratitude-moment", "ground-touch", "word-for-path"];

function recoToolId(choice) {
  if (!choice) return "nesheama";
  const t = choice.target;
  if (t.type === "tool") return t.toolId;
  if (t.type === "gate") return gates.find((g) => g.id === t.gate)?.tools[0] ?? "nesheama";
  if (t.type === "flow" && t.flow === "fatigue") return fatigueOptions[0].toolId;
  if (t.type === "flow" && t.flow === "memory") return memoryFlow.options[0].toolId;
  if (t.type === "flow" && t.flow === "emotion") return "emotion-space";
  return "nesheama";
}

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
      <div dir="rtl" lang="he" className="min-h-screen flex flex-col justify-end px-6 pb-10">
        <BreathOrb size={72} />
        <h1 className="mt-8 t-display text-foreground">{site.title}</h1>
        <p className="mt-2 t-lead text-muted-foreground">{site.subtitle}</p>

        <div className="mt-8 rounded-[18px] px-6 py-8 sm:px-10" style={{ backgroundColor: "hsl(var(--flame) / 0.08)" }}>
          <p className="t-title text-foreground max-w-sm">{firstVisit.title}</p>
          <div className="mt-5 space-y-4 max-w-sm">
            {firstVisit.lines.map((line, i) => (
              <p key={i} className="t-lead text-muted-foreground">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <ActionButton onClick={enter}>{firstVisit.button}</ActionButton>
        </div>
      </div>
    );
  }

  const recoId = recoToolId(chosen);
  const reco = tools[recoId];

  const goReco = () => navigate("/guided/pause", { state: { target: chosen ? chosen.target : { type: "tool", toolId: "nesheama" } } });

  return (
    <div dir="rtl" lang="he" className="min-h-screen">
      <div className="max-w-xl mx-auto px-6 pt-14 pb-32">
        <div className="flex items-start justify-between gap-4">
          <h1 className="t-display text-foreground">
            <span className="block text-foreground/40">{editorial.home.helloLine}</span>
            <span className="block">
              {editorial.home.headline[0]}
              <br />
              {editorial.home.headline[1]}
            </span>
          </h1>
          <Link
            to="/book"
            aria-label={editorial.tabs.book}
            className="press grid place-items-center w-10 h-10 shrink-0 mt-1.5 rounded-full bg-secondary text-foreground"
          >
            <BookOpen className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </Link>
        </div>
        <p className="mt-3.5 max-w-[13rem] t-small text-muted-foreground">{editorial.home.note}</p>

        <div className="mt-6">
          <EmotionCheckIn selected={chosen} onSelect={setChosen} />
        </div>

        <p className="mt-9 t-micro text-muted-foreground">
          {chosen ? `מתאים ל${chosen.label}` : editorial.home.startHere}
        </p>
        <button
          onClick={goReco}
          className="press relative block w-full mt-2 rounded-[18px] px-6 py-6 text-right overflow-hidden bg-primary text-primary-foreground"
        >
          <ArrowUpLeft className="absolute top-6 left-6 w-[18px] h-[18px] opacity-75" strokeWidth={1.75} />
          <span className="block max-w-[13.5rem] t-small opacity-75">{reco.description}</span>
          <span className="flex items-end gap-3.5 mt-5">
            <span className="t-display leading-none">{reco.name}</span>
            <span className="t-display leading-none opacity-35 whitespace-nowrap">{reco.duration}</span>
          </span>
        </button>

        <div className="flex items-baseline justify-between mt-9">
          <span className="t-micro text-muted-foreground">{editorial.home.quickTitle}</span>
          <Link to="/tools" className="t-small text-muted-foreground underline underline-offset-4">
            {editorial.home.allTools}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5 mt-2.5">
          {QUICK_IDS.map((id) => (
            <EditorialCard key={id} tool={tools[id]} tone={toolTone(id)} />
          ))}
        </div>
      </div>

      <BottomTabs />
    </div>
  );
}
