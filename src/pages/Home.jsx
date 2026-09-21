import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowUpLeft, PenLine, ArrowDown } from "lucide-react";
import BottomTabs from "@/components/BottomTabs";
import WelcomeSheet from "@/components/WelcomeSheet";
import EmotionCheckIn from "@/components/EmotionCheckIn";
import EditorialCard, { TOOL_CARD_META } from "@/components/EditorialCard";
import { editorial, gates, tools, fatigueOptions, memoryFlow } from "@/lib/spiritContent";

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
    // ?welcome=1 always re-opens the welcome sheet (useful for reviewing it).
    if (new URLSearchParams(window.location.search).get("welcome") === "1") return true;
    try {
      return !localStorage.getItem(WELCOME_KEY);
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

  const recoId = recoToolId(chosen);
  const reco = tools[recoId] || tools["nesheama"];
  const meta = TOOL_CARD_META[recoId];

  let displayName = meta ? (meta.line1 + (meta.line2 ? " " + meta.line2 : "")) : reco.name;
  let displayDuration = meta?.time || reco.duration;
  let displayDescription = reco.description;

  if (recoId === "nesheama") {
    displayName = "כלי נשמ״ה";
    displayDuration = "04:00";
    displayDescription = "תרגול קצר בארבעה שלבים, על פי מודל עדשת הרוח";
  }

  const goReco = () => {
    const target = { type: "tool", toolId: recoId };
    try {
      sessionStorage.setItem("sl_guided_target", JSON.stringify(target));
    } catch {}
    navigate("/guided/pause", { state: { target } });
  };

  return (
    <div dir="rtl" lang="he" className="min-h-screen overflow-x-hidden">
      <div className="max-w-xl mx-auto px-6 pt-6 pb-28">
        {/* Top Header with Book Button */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="leading-[1.1]">
              <span className="block text-[32px] sm:text-[36px] font-bold text-[#6B6A63]">
                מרחב
              </span>
              <span className="block text-[34px] sm:text-[38px] font-bold text-[#16161A] mt-0.5">
                עדשת הרוח
              </span>
            </h1>
            <p className="mt-1 text-[14px] text-[#6B6A63] font-medium">
              מרחב של נשימה, התבוננות ובחירה
            </p>
          </div>
          <Link
            to="/book"
            aria-label={editorial.tabs.book}
            className="press grid place-items-center w-11 h-11 shrink-0 mt-0.5 rounded-full bg-[#E7E5DF] text-[#16161A] hover:bg-[#D8D5CC] transition-colors"
          >
            <BookOpen className="w-[19px] h-[19px]" strokeWidth={1.75} />
          </Link>
        </div>

        {/* Subtitle / note */}
        <div className="mt-2 text-[13.5px] text-[#6B6A63] leading-relaxed">
          <p className="font-medium text-[#4A4943]">לפעמים די ברגע אחד של עצירה.</p>
          <p className="mt-0.5">
            אפשר להיעזר במסלול קצר ומונחה,
            <br />
            או לבחור בעצמכם כלי מתוך המרחב.
          </p>
        </div>

        {/* שתי דרכים לבחור בהן — Two Paths Containers */}
        <div className="mt-6 mb-3">
          <p className="text-[12px] font-medium text-[#7C7A72] text-right mb-2">
            שתי דרכים לבחור בהן
          </p>
          <div className="grid grid-cols-2 gap-3">
            {/* כרטיס 1: לכתוב ישר */}
            <Link
              to="/write"
              className="press relative flex flex-col justify-between h-[155px] p-4 rounded-[26px] bg-[#B35C44] text-white select-none shadow-[0_4px_16px_rgba(179,92,68,0.22)] overflow-hidden transition-transform"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-full bg-white/20 grid place-items-center text-white text-[13px] font-bold">
                  1
                </div>
                <PenLine className="w-5 h-5 text-white/95" strokeWidth={1.8} />
              </div>
              <div className="text-right mt-auto">
                <span className="block text-[20px] font-bold leading-tight">
                  לכתוב ישר
                </span>
                <span className="block text-[12px] text-white/90 leading-tight mt-1 font-medium">
                  לפתוח את מדריך הכתיבה עכשיו
                </span>
              </div>
            </Link>

            {/* כרטיס 2: לפנות מקום */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("check-in-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="press relative flex flex-col justify-between h-[155px] p-4 rounded-[26px] bg-[#DDD9D0] text-[#16161A] select-none text-right overflow-hidden transition-transform"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-full bg-white/60 grid place-items-center text-[#2C2B26] text-[13px] font-bold">
                  2
                </div>
                <ArrowDown className="w-5 h-5 text-[#2C2B26]" strokeWidth={1.8} />
              </div>
              <div className="text-right mt-auto">
                <span className="block text-[20px] font-bold leading-tight text-[#16161A]">
                  לפנות מקום
                </span>
                <span className="block text-[12px] text-[#6B6A63] leading-tight mt-1 font-medium">
                  מסלול קצר מונחה
                  <br />
                  כדי להיפתח לכתיבה
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Emotion Check-in circles */}
        <div id="check-in-section" className="mt-4 scroll-mt-6">
          <EmotionCheckIn selected={chosen} onSelect={setChosen} />
        </div>

        {/* Featured Card — Warm Cream & Sand Paper Elevation */}
        <div className="mt-5 -mx-6">
          <p className="px-6 text-[12px] font-medium text-[#6B6A63] mb-2 text-right">
            {chosen ? `מתאים ל${chosen.label}` : editorial.home.startHere}
          </p>

          <button
            onClick={goReco}
            className="group relative block w-full bg-[#16161A] px-6 py-7 text-right transition-colors duration-150 select-none hover:bg-[#22222A] active:bg-[#2A2A33] shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
          >
            {/* Top row: Description on right, Arrow on left */}
            <div className="flex items-start justify-between gap-4">
              <span className="text-[13.5px] sm:text-[14.5px] font-medium text-[#E7E5DF] leading-snug text-right flex-1">
                {displayDescription}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 grid place-items-center shrink-0 -mt-0.5 text-[#F1F0EC] group-hover:bg-white/20 transition-colors">
                <ArrowUpLeft className="w-4 h-4" strokeWidth={2} />
              </div>
            </div>

            {/* Bottom row: Title on right, Duration on left */}
            <div className="flex items-baseline justify-between gap-3 mt-4 text-right">
              <span className="text-[28px] sm:text-[32px] font-bold text-[#F8F7F4] tracking-tight leading-none">
                {displayName}
              </span>
              <span className="text-[22px] sm:text-[25px] font-bold text-[#8C8B84] tabular-nums leading-none shrink-0">
                {displayDuration}
              </span>
            </div>
          </button>
        </div>

        {/* Quick Tools Section */}
        <div className="flex items-baseline justify-between mt-8 mb-3">
          <span className="text-xs font-medium text-[#6B6A63]">{editorial.home.quickTitle}</span>
          <Link
            to="/tools"
            className="text-xs font-medium text-[#6B6A63] underline underline-offset-4 hover:text-[#16161A] transition-colors"
          >
            {editorial.home.allTools}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {QUICK_IDS.map((id) => (
            <EditorialCard key={id} tool={tools[id]} showTime={false} />
          ))}
        </div>
      </div>

      <BottomTabs />

      {showWelcome && <WelcomeSheet onClose={enter} />}
    </div>
  );
}