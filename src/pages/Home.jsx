import CreditLine from "@/components/CreditLine";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, ArrowUpLeft, ArrowUpRight, PenLine, ArrowDown, Bookmark } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getSavedCount, getWriteDraft } from "@/lib/savedMoments";
import BottomTabs from "@/components/BottomTabs";
import PlaylistHomeCard from "@/components/PlaylistHomeCard";
import WelcomeSheet from "@/components/WelcomeSheet";
import EmotionCheckIn from "@/components/EmotionCheckIn";
import EditorialCard, { TOOL_CARD_META, cardName } from "@/components/EditorialCard";
import { localizeTool } from "@/lib/spiritContentEn";
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
  const { lang, dir, t } = useLang();
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
  const [hasDraft] = useState(() => !!getWriteDraft());

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
  const reco = localizeTool(tools[recoId] || tools["nesheama"], lang);
  const meta = TOOL_CARD_META[recoId];

  let displayName = cardName(recoId, lang, reco.name);
  let displayDuration = meta?.time || reco.duration;
  let displayDescription = reco.description;

  if (recoId === "nesheama") {
    displayName = t("כלי נשמ״ה", "N.S.M.H. practice");
    displayDuration = "04:00";
    displayDescription = t("תרגול קצר בארבעה שלבים, על פי מודל עדשת הרוח", "A short four-step practice, based on the Spirit Lens model");
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
    <div dir={dir} lang={lang} className="relative min-h-screen overflow-x-hidden">
      {/* Delicate Watermark: "כנפי הרוח" / "עדשת הרוח" embedded gracefully into the background */}
      <SpiritWingsWatermark
        className="absolute top-10 right-0 left-0 w-[78%] max-w-[340px] mx-auto h-[190px] z-0 pointer-events-none"
        color="#BFA88F"
        opacity={0.09}
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
                {t("מרחב", "Your space in")}
              </span>
              <span className="block text-[34px] sm:text-[38px] font-bold text-[#16161A] mt-0.5">
                {t("עדשת הרוח", "The Spirit Lens")}
              </span>
            </h1>
            <p className="mt-1 text-[14px] text-[#6B6A63] font-medium">
              {t("מרחב של נשימה, התבוננות ובחירה", "A space for breath, reflection and choice")}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-0.5 shrink-0">
            {/* כפתור רגעים ששמרתי */}
            <Link
              to="/saved"
              aria-label={t("רגעים ששמרתי", "Saved moments")}
              title={t("רגעים ששמרתי", "Saved moments")}
              className="press relative grid place-items-center w-11 h-11 rounded-full bg-[#E7E5DF] text-[#16161A] hover:bg-[#D8D5CC] transition-colors"
            >
              <Bookmark className="w-[19px] h-[19px]" strokeWidth={1.75} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B0654A] text-white text-[10px] font-bold flex items-center justify-center">
                  {savedCount > 9 ? "9+" : savedCount}
                </span>
              )}
            </Link>

            {/* כפתור שפה (הספר נגיש מסרגל הניווט התחתון) */}
            <Link
              to="/language"
              aria-label={t("שפה", "Language")}
              title={t("שפה", "Language")}
              className="press grid place-items-center w-11 h-11 rounded-full bg-[#E7E5DF] text-[#16161A] hover:bg-[#D8D5CC] transition-colors"
            >
              <Globe className="w-[19px] h-[19px]" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        {/* Subtitle / note */}
        <div className="mt-2 text-[14px] text-[#55544E] leading-relaxed">
          {lang === "en" ? (
            <p>Every path ends in writing. You can start there right away, or begin with a practice and arrive at it later.</p>
          ) : (
          <p>
            בסוף כל דרך יש כתיבה. אפשר לפתוח בה ישר, או
            <br />
            להתחיל מתרגול קודם ולהגיע אליה אחר כך.
          </p>
          )}
        </div>

        {/* שתי דרכים לבחור בהן — Two Paths Containers */}
        <div className="mt-6">
          <p className={`text-start mb-2.5 ${lang === "en" ? "text-[12px] font-bold uppercase tracking-[0.08em] text-[#16161A]" : "text-[13px] font-medium text-[#6B6A63]"}`}>
            {t("שתי דרכים לבחור בהן", "Two ways in")}
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
                className="-bottom-3 -left-1 w-[58px] h-[82px] -rotate-6"
                color="#FFFFFF"
                opacity={0.14}
              />
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-full bg-black/15 grid place-items-center text-[#FBFAF7] text-[14px] font-bold">
                  1
                </div>
                <PenLine className="w-5 h-5 text-[#FBFAF7]" strokeWidth={1.75} />
              </div>
              <div className="relative z-10 text-start mt-auto">
                <span className="block text-[22px] font-bold leading-tight text-[#FBFAF7] tracking-tight">
                  {hasDraft ? t("להמשיך לכתוב", "Keep writing") : t("לכתוב ישר", "Write now")}
                </span>
                <span className="block text-[12.5px] text-[#FBFAF7]/90 leading-snug mt-1.5 font-normal">
                  {hasDraft ? t("הכתיבה שלך נשמרה, ממשיכים מאיפה שעצרת", "Your draft is saved, just keep going") : t("לפתוח את מדריך הכתיבה עכשיו", "Open the writing guide now")}
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
              className="press relative flex flex-col justify-between h-[165px] p-4 rounded-[28px] text-[#16161A] select-none text-start overflow-hidden transition-transform"
            >
              {/* Subtle corner wing branding watermark */}
              <CornerWingMotif
                className="-bottom-3 -left-1 w-[58px] h-[82px] -rotate-6"
                color="#16161A"
                opacity={0.06}
              />
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-full bg-white/70 grid place-items-center text-[#16161A] text-[14px] font-bold">
                  2
                </div>
                <ArrowDown className="w-5 h-5 text-[#16161A]" strokeWidth={1.75} />
              </div>
              <div className="relative z-10 text-start mt-auto">
                <span className="block text-[22px] font-bold leading-tight text-[#16161A] tracking-tight">
                  {t("לפנות מקום", "Make room")}
                </span>
                <span className="block text-[12.5px] text-[#6B6A63] leading-snug mt-1.5 font-normal">
                  {t("מסלול קצר מונחה", "A short guided path")}
                  <br />
                  {t("כדי להיפתח לכתיבה", "to open up for writing")}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Emotion Check-in circles */}
        <div id="check-in-section" className="mt-6 scroll-mt-6">
          <div className="flex items-baseline justify-between gap-3 mb-2.5">
            <p className="text-[13px] font-medium text-[#6B6A63] text-start">
              {t("מה ההרגשה היום?", "How's today feeling?")}
            </p>
            <p className="text-[12px] text-[#8C8B84]">{t("בחירה תתאים לך תרגול", "A choice matches a practice")}</p>
          </div>
          <EmotionCheckIn selected={chosen} onSelect={setChosen} />
        </div>

        {/* Featured Card — Warm Cream & Sand Paper Elevation */}
        <div className="mt-6 -mx-6">
          <p className="px-6 text-[13px] font-medium text-[#6B6A63] mb-2.5 text-start flex items-center gap-2">
            {chosen && (
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: chosen.wash }}
                aria-hidden="true"
              />
            )}
            {chosen ? (
              <span>{t("תרגול מונחה לתחושה שבחרת", "A guided practice for the feeling you chose")}</span>
            ) : (
              t(editorial.home.startHere, "Start here")
            )}
          </p>

          <button
            onClick={goReco}
            className="group relative block w-full bg-[#16161A] px-6 py-7 text-start transition-colors duration-150 select-none hover:bg-[#22222A] active:bg-[#2A2A33] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden"
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
              <span className="text-[13.5px] sm:text-[14.5px] font-medium text-[#E7E5DF] leading-snug text-start flex-1">
                {displayDescription}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 grid place-items-center shrink-0 -mt-0.5 text-[#F1F0EC] group-hover:bg-white/20 transition-colors">
                {dir === "rtl" ? <ArrowUpLeft className="w-4 h-4" strokeWidth={2} /> : <ArrowUpRight className="w-4 h-4" strokeWidth={2} />}
              </div>
            </div>

            {/* Bottom row: Title on right, Duration on left */}
            <div className="flex items-baseline justify-between gap-3 mt-4 text-start">
              <span className="text-[28px] sm:text-[32px] font-bold text-[#F8F7F4] tracking-tight leading-none">
                {displayName}
              </span>
              <span className="text-[22px] sm:text-[25px] font-bold text-[#8C8B84] tabular-nums leading-none shrink-0">
                {displayDuration}
              </span>
            </div>
            {!chosen && (
              <p className="mt-4 text-[12px] text-[#8C8B84]">
                {t("בחרו תחושה למעלה, והתרגול כאן יתאים את עצמו", "Choose a feeling above and this practice will adapt")}
              </p>
            )}
            </div>
          </button>
        </div>

        <PlaylistHomeCard />

        {/* Quick Tools Section */}
        <div className="flex items-baseline justify-between mt-8 mb-3">
          <span className="text-xs font-medium text-[#6B6A63]">{t(editorial.home.quickTitle, "Short and simple")}</span>
          <Link
            to="/tools"
            className="text-xs font-medium text-[#6B6A63] underline underline-offset-4 hover:text-[#16161A] transition-colors"
          >
            {t(editorial.home.allTools, "All tools")}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {QUICK_IDS.map((id) => (
            <EditorialCard key={id} tool={localizeTool(tools[id], lang)} showTime={false} />
          ))}
        </div>
        <CreditLine className="pt-8 !px-0" />
      </div>

      <BottomTabs />

      {showWelcome && <WelcomeSheet onClose={enter} />}
    </div>
  );
}