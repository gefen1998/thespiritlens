import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowUpLeft } from "lucide-react";
import BottomTabs from "@/components/BottomTabs";
import BreathOrb from "@/components/BreathOrb";
import EmotionCheckIn from "@/components/EmotionCheckIn";
import EditorialCard, { TOOL_CARD_META } from "@/components/EditorialCard";
import ActionButton from "@/components/ActionButton";
import { site, editorial, firstVisit, gates, tools, fatigueOptions, memoryFlow } from "@/lib/spiritContent";

const WELCOME_KEY = "sl_seen_welcome";
const QUICK_IDS = ["gentle-exhale", "gratitude-moment", "ground-touch", "word-for-path"];

function recoToolId(choice) {
  if (!choice) return "nesheama";
  const t = choice.target;
  if (t.type === "tool") return t.toolId;
  if (t.type === "gate") return gates.find((g) => g.id === t.gate)?.tools[0] ?? "nesheama";
  if (t.flow === "fatigue") return fatigueOptions[0].toolId;
  if (t.flow === "memory") return memoryFlow.options[0].toolId;
  if (t.flow === "emotion") return "emotion-space";
  return "nesheama";
}

export default function Home() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return localStorage.getItem(WELCOME_KEY) === "first";
    } catch {
      return false;
    }
  });
  const [chosen, setChosen] = useState(null);

  const enter = () => {
    try {
      localStorage.setItem(WELCOME_KEY, "1");
    } catch {}
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
  const reco = tools[recoId] || tools["nesheama"];
  const meta = TOOL_CARD_META[recoId];

  let displayName = meta ? (meta.line1 + (meta.line2 ? " " + meta.line2 : "")) : reco.name;
  let displayDuration = meta?.time || reco.duration;
  let displayDescription = reco.description;

  if (recoId === "nesheama") {
    displayName = "נשמ״ה";
    displayDuration = "04:00";
    displayDescription = "תרגול קצר בארבעה שלבים, על פי מודל נשמ״ה";
  }

  const goReco = () => {
    const target = { type: "tool", toolId: recoId };
    try {
      sessionStorage.setItem("sl_guided_target", JSON.stringify(target));
    } catch {}
    navigate("/guided/pause", { state: { target } });
  };

  return (
    <div dir="rtl" lang="he" className="min-h-screen">
      <div className="max-w-xl mx-auto px-6 pt-12 pb-32">
        {/* Top Header with Book Button */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="t-display text-foreground leading-[1.15]">
            <span className="block text-[#8f8a82] font-bold text-[34px] sm:text-[40px]">
              {editorial.home.helloLine}
            </span>
            <span className="block font-bold text-[36px] sm:text-[42px] text-foreground mt-1">
              איך אתה
              <br />
              מרגיש עכשיו?
            </span>
          </h1>
          <Link
            to="/book"
            aria-label={editorial.tabs.book}
            className="press grid place-items-center w-11 h-11 shrink-0 mt-1 rounded-full bg-[#ded8cb] text-foreground hover:bg-[#d5cfc2] transition-colors"
          >
            <BookOpen className="w-[19px] h-[19px]" strokeWidth={1.75} />
          </Link>
        </div>

        {/* Subtitle / note */}
        <p className="mt-3.5 text-xs sm:text-[13px] text-[#7d7973] leading-relaxed">
          אין תשובה נכונה, ואין צורך לדעת.
          <br />
          אפשר גם לדלג ישר לרשימת התרגילים.
        </p>

        {/* Emotion Check-in circles */}
        <div className="mt-6">
          <EmotionCheckIn selected={chosen} onSelect={setChosen} />
        </div>

        {/* Full-bleed Black Container (No side margins, extends edge-to-edge) */}
        <div className="mt-8">
          <p className="text-xs font-medium text-[#7d7973] mb-2.5 text-right">
            {chosen ? `מתאים ל${chosen.label}` : editorial.home.startHere}
          </p>

          <button
            onClick={goReco}
            className="press group relative block -mx-6 w-[calc(100%+3rem)] bg-[#161719] px-6 py-6 sm:py-7 text-right overflow-hidden transition-all shadow-sm rounded-none border-0 select-none"
          >
            {/* Top row: Description on right, Arrow on left */}
            <div className="flex items-start justify-between gap-4">
              <span className="text-[14px] sm:text-[15px] font-medium text-white/90 leading-snug text-right">
                {displayDescription}
              </span>
              <ArrowUpLeft
                className="w-5 h-5 text-white/75 shrink-0 mt-0.5 group-hover:text-white transition-colors"
                strokeWidth={1.8}
              />
            </div>

            {/* Bottom row: Title on right, Duration on left */}
            <div className="flex items-baseline gap-4 mt-7 text-right">
              <span className="text-[36px] sm:text-[42px] font-bold text-white tracking-tight leading-none">
                {displayName}
              </span>
              <span className="text-[28px] sm:text-[32px] font-bold text-white/40 tabular-nums leading-none">
                {displayDuration}
              </span>
            </div>
          </button>
        </div>

        {/* Quick Tools Section */}
        <div className="flex items-baseline justify-between mt-7 mb-3">
          <span className="text-xs font-medium text-[#7d7973]">{editorial.home.quickTitle}</span>
          <Link
            to="/tools"
            className="text-xs font-medium text-[#7d7973] underline underline-offset-4 hover:text-foreground transition-colors"
          >
            {editorial.home.allTools}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {QUICK_IDS.map((id) => (
            <EditorialCard key={id} tool={tools[id]} />
          ))}
        </div>
      </div>

      <BottomTabs />
    </div>
  );
}