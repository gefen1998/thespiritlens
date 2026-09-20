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

const HERO_TONES = {
  default: {
    bg: "bg-[#dbe4dd]",
    border: "border-[#c6d4c8]",
    title: "text-[#1b251d]",
    desc: "text-[#2b382e]",
    subtle: "text-[#2b382e]/55",
    arrow: "text-[#2b382e]/70 group-hover:text-[#1b251d]",
  },
  body: {
    bg: "bg-[#dbe4dd]",
    border: "border-[#c6d4c8]",
    title: "text-[#1b251d]",
    desc: "text-[#2b382e]",
    subtle: "text-[#2b382e]/55",
    arrow: "text-[#2b382e]/70 group-hover:text-[#1b251d]",
  },
  fatigue: {
    bg: "bg-[#ded8e6]",
    border: "border-[#c9bfd4]",
    title: "text-[#261c31]",
    desc: "text-[#3b2e46]",
    subtle: "text-[#3b2e46]/55",
    arrow: "text-[#3b2e46]/70 group-hover:text-[#261c31]",
  },
  emotion: {
    bg: "bg-[#edd8dc]",
    border: "border-[#d8bec3]",
    title: "text-[#321b20]",
    desc: "text-[#462d33]",
    subtle: "text-[#462d33]/55",
    arrow: "text-[#462d33]/70 group-hover:text-[#321b20]",
  },
  thought: {
    bg: "bg-[#d8e2ed]",
    border: "border-[#bed0e3]",
    title: "text-[#182535]",
    desc: "text-[#2a384a]",
    subtle: "text-[#2a384a]/55",
    arrow: "text-[#2a384a]/70 group-hover:text-[#182535]",
  },
  spirit: {
    bg: "bg-[#ecdcc7]",
    border: "border-[#d7c3a8]",
    title: "text-[#312211]",
    desc: "text-[#473521]",
    subtle: "text-[#473521]/55",
    arrow: "text-[#473521]/70 group-hover:text-[#312211]",
  },
};

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

          {(() => {
            const activeTone = chosen?.tone && HERO_TONES[chosen.tone] ? HERO_TONES[chosen.tone] : HERO_TONES.default;
            return (
              <button
                onClick={goReco}
                className={`press group relative block -mx-6 w-[calc(100%+3rem)] ${activeTone.bg} border-y ${activeTone.border} px-6 py-6 sm:py-7 text-right overflow-hidden transition-colors duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.03)] select-none`}
              >
                {/* Top row: Description on right, Arrow on left */}
                <div className="flex items-start justify-between gap-4">
                  <span className={`text-[14px] sm:text-[15px] font-medium ${activeTone.desc} leading-snug text-right`}>
                    {displayDescription}
                  </span>
                  <ArrowUpLeft
                    className={`w-5 h-5 ${activeTone.arrow} shrink-0 mt-0.5 transition-colors`}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Bottom row: Title on right, Duration on left */}
                <div className="flex items-baseline gap-4 mt-7 text-right">
                  <span className={`text-[36px] sm:text-[42px] font-bold ${activeTone.title} tracking-tight leading-none`}>
                    {displayName}
                  </span>
                  <span className={`text-[28px] sm:text-[32px] font-bold ${activeTone.subtle} tabular-nums leading-none`}>
                    {displayDuration}
                  </span>
                </div>
              </button>
            );
          })()}
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