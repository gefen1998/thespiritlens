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
      <div className="max-w-xl mx-auto px-6 pt-6 pb-24">
        {/* Top Header with Book Button */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="leading-[1.1]">
            <span className="block text-[32px] sm:text-[36px] font-bold text-[#8c877e]">
              {editorial.home.helloLine}
            </span>
            <span className="block text-[34px] sm:text-[38px] font-bold text-[#1f1c19] mt-0.5">
              איך אתה
              <br />
              מרגיש עכשיו?
            </span>
          </h1>
          <Link
            to="/book"
            aria-label={editorial.tabs.book}
            className="press grid place-items-center w-11 h-11 shrink-0 mt-0.5 rounded-full bg-[#ded8cb] text-[#1f1c19] hover:bg-[#d5cfc2] transition-colors"
          >
            <BookOpen className="w-[19px] h-[19px]" strokeWidth={1.75} />
          </Link>
        </div>

        {/* Subtitle / note */}
        <p className="mt-2 text-[13px] text-[#78736a] leading-relaxed">
          אין תשובה נכונה, ואין צורך לדעת.
          <br />
          אפשר גם לדלג ישר לרשימת התרגילים.
        </p>

        {/* Emotion Check-in circles */}
        <div className="mt-4">
          <EmotionCheckIn selected={chosen} onSelect={setChosen} />
        </div>

        {/* Featured Card — Warm Cream & Sand Paper Elevation */}
        <div className="mt-5">
          <p className="text-[12px] font-medium text-[#78736a] mb-2 text-right">
            {chosen ? `מתאים ל${chosen.label}` : editorial.home.startHere}
          </p>

          <button
            onClick={goReco}
            className="press group relative block -mx-6 w-[calc(100%+3rem)] bg-[#faf7f2] border-y border-[#ded6c7] px-6 py-4.5 sm:py-5 text-right overflow-hidden transition-colors duration-200 select-none hover:bg-[#f5f0e7]"
          >
            {/* Top row: Description on right, Arrow on left */}
            <div className="flex items-start justify-between gap-4">
              <span className="text-[14px] sm:text-[15px] font-medium text-[#423c34] leading-snug text-right">
                {displayDescription}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#f0ebdff0] grid place-items-center shrink-0 -mt-1 -ml-1 text-[#423c34]/70 group-hover:text-[#201d19] group-hover:bg-[#e7e0d2] transition-colors">
                <ArrowUpLeft className="w-4 h-4" strokeWidth={2} />
              </div>
            </div>

            {/* Bottom row: Title on right, Duration on left */}
            <div className="flex items-baseline gap-4 mt-4 sm:mt-5 text-right">
              <span className="text-[32px] sm:text-[38px] font-bold text-[#201d19] tracking-tight leading-none">
                {displayName}
              </span>
              <span className="text-[24px] sm:text-[28px] font-bold text-[#8f877b] tabular-nums leading-none">
                {displayDuration}
              </span>
            </div>
          </button>
        </div>

        {/* Quick Tools Section */}
        <div className="flex items-baseline justify-between mt-5 mb-2.5">
          <span className="text-xs font-medium text-[#78736a]">{editorial.home.quickTitle}</span>
          <Link
            to="/tools"
            className="text-xs font-medium text-[#78736a] underline underline-offset-4 hover:text-[#1f1c19] transition-colors"
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