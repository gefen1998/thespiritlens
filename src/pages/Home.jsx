import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowUpLeft, PenLine, ArrowDown, Bookmark } from "lucide-react";
import { getSavedCount } from "@/lib/savedMoments";
import BottomTabs from "@/components/BottomTabs";
import WelcomeSheet from "@/components/WelcomeSheet";
import EmotionCheckIn from "@/components/EmotionCheckIn";
import EditorialCard, { TOOL_CARD_META } from "@/components/EditorialCard";
import { editorial, gates, tools, fatigueOptions, memoryFlow } from "@/lib/spiritContent";
import { SpiritWingsWatermark, CornerWingMotif, SpiritBrandMark } from "@/components/SpiritWings";

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
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCount = () => setSavedCount(getSavedCount());
    updateCount();

    window.addEventListener("focus", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("focus", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

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
      sessionStorage.setItem("sl_guided_emotion", chosen?.id || "");
    } catch {}
    navigate("/guided/pause", { state: { target, emotionId: chosen?.id || null } });
  };

  return (
    <div dir="rtl" lang="he" className="relative min-h-screen overflow-x-hidden">
      {/* Delicate Watermark: "כנפי הרוח" / "עדשת הרוח" embedded gracefully into the background */}
      <SpiritWingsWatermark
        className="absolute -top-6 right-0 left-0 max-w-lg mx-auto h-[260px] sm:h-[300px] z-0 -translate-y-2 pointer-events-none"
        color="#BFA88F"
        opacity={0.13}
      />

      <div className="relative z-10 max-w-xl mx-auto px-6 pt-6 pb-28">
        {/* Top Header with Book & Saved Buttons */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <SpiritBrandMark size={30} color="#B08A3C" />
            </div>
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
          <div className="flex items-center gap-2 mt-0.5 shrink-0">
            {/* כפתור רגעים ששמרתי */}
            <Link
              to="/saved"
              aria-label="רגעים ששמרתי"
              title="רגעים ששמרתי"
              className="press relative grid place-items-center w-11 h-11 rounded-full bg-[#E7E5DF] text-[#16161A] hover:bg-[#D8D5CC] transition-colors"
            >
              <Bookmark className="w-[19px] h-[19px]" strokeWidth={1.75} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B0654A] text-white text-[10px] font-bold flex items-center justify-center">
                  {savedCount > 9 ? "9+" : savedCount}
                </span>
              )}
            </Link>

            {/* כפתור הספר */}
            <Link
              to="/book"
              aria-label={editorial.tabs.book}
              title={editorial.tabs.book}
              className="press grid place-items-center w-11 h-11 rounded-full bg-[#E7E5DF] text-[#16161A] hover:bg-[#D8D5CC] transition-colors"
            >
              <BookOpen className="w-[19px] h-[19px]" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        {/* Subtitle / note */}
        <div className="mt-2 text-[14px] text-[#55544E] leading-relaxed">
          <p>
            בסוף כל דרך יש כתיבה. אפשר לפתוח בה ישר, או
            <br />
            להתחיל מתרגול קודם ולהגיע אליה אחר כך.
          </p>
        </div>

        {/* שתי דרכים לבחור בהן — Two Paths Containers */}
        <div className="mt-6">
          <p className="text-[13px] font-medium text-[#6B6A63] text-right mb-2.5">
            שתי דרכים לבחור בהן
          </p>
          <div className="grid grid-cols-2 gap-3">
            {/* כרטיס 1: לכתוב ישר */}
            <Link
              to="/write"
              style={{ backgroundColor: "#B0654A", color: "#FBFAF7" }}
              className="press relative flex flex-col justify-between h-[165px] p-4 rounded-[28px] select-none overflow-hidden transition-transform"
            >
              {/* Subtle corner wing branding watermark */}
              <CornerWingMotif
                className="-bottom-2 left-2 w-[84px] h-[118px]"
                color="#FFFFFF"
                opacity={0.18}
              />
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-full bg-black/15 grid place-items-center text-[#FBFAF7] text-[14px] font-bold">
                  1
                </div>
                <PenLine className="w-5 h-5 text-[#FBFAF7]" strokeWidth={1.75} />
              </div>
              <div className="relative z-10 text-right mt-auto">
                <span className="block text-[22px] font-bold leading-tight text-[#FBFAF7] tracking-tight">
                  לכתוב ישר
                </span>
                <span className="block text-[12.5px] text-[#FBFAF7]/90 leading-snug mt-1.5 font-normal">
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
              style={{ backgroundColor: "rgba(22, 22, 26, 0.06)" }}
              className="press relative flex flex-col justify-between h-[165px] p-4 rounded-[28px] text-[#16161A] select-none text-right overflow-hidden transition-transform"
            >
              {/* Subtle corner wing branding watermark */}
              <CornerWingMotif
                className="-bottom-2 left-2 w-[84px] h-[118px]"
                color="#16161A"
                opacity={0.08}
              />
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-full bg-white/70 grid place-items-center text-[#16161A] text-[14px] font-bold">
                  2
                </div>
                <ArrowDown className="w-5 h-5 text-[#16161A]" strokeWidth={1.75} />
              </div>
              <div className="relative z-10 text-right mt-auto">
                <span className="block text-[22px] font-bold leading-tight text-[#16161A] tracking-tight">
                  לפנות מקום
                </span>
                <span className="block text-[12.5px] text-[#6B6A63] leading-snug mt-1.5 font-normal">
                  מסלול קצר מונחה
                  <br />
                  כדי להיפתח לכתיבה
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Emotion Check-in circles */}
        <div id="check-in-section" className="mt-6 scroll-mt-6">
          <div className="flex items-baseline justify-between gap-3 mb-2.5">
            <p className="text-[13px] font-medium text-[#6B6A63] text-right">
              מה ההרגשה היום?
            </p>
            <p className="text-[12px] text-[#8C8B84]">בחירה תתאים לך תרגול</p>
          </div>
          <EmotionCheckIn selected={chosen} onSelect={setChosen} />
        </div>

        {/* Featured Card — Warm Cream & Sand Paper Elevation */}
        <div className="mt-6 -mx-6">
          <p className="px-6 text-[13px] font-medium text-[#6B6A63] mb-2.5 text-right flex items-center gap-2">
            {chosen && (
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: chosen.wash }}
                aria-hidden="true"
              />
            )}
            {chosen ? (
              <span>תרגול מונחה לתחושה שבחרת</span>
            ) : (
              editorial.home.startHere
            )}
          </p>

          <button
            onClick={goReco}
            className="group relative block w-full bg-[#16161A] px-6 py-7 text-right transition-colors duration-150 select-none hover:bg-[#22222A] active:bg-[#2A2A33] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden"
          >
            {/* Emotion accent stripe — ties the card to the chosen feeling */}
            <span
              className="absolute top-0 inset-x-0 h-1 transition-colors duration-500"
              style={{ backgroundColor: chosen ? chosen.wash : "transparent" }}
              aria-hidden="true"
            />
            <div key={recoId + (chosen?.id || "")} className="rise-in">
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
            {!chosen && (
              <p className="mt-4 text-[12px] text-[#8C8B84]">
                בחרו תחושה למעלה, והתרגול כאן יתאים את עצמו
              </p>
            )}
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