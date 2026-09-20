import React, { useState } from "react";
import { TOOL_CARD_META, getToolIcon } from "@/components/EditorialCard";

export default function PracticeCompletionSheet({ tool, values = {}, onDone, onRepeat }) {
  const meta = (tool && TOOL_CARD_META[tool.id]) || {
    line1: tool?.name || "תרגול",
    line2: "",
    bg: "#e6e2d8",
    pebble: "#cbd8cb",
    pebbleRadius: "50%",
  };

  const Icon = meta.icon || getToolIcon(tool?.id);

  // Derive available phrases
  const rawOptions = tool?.ending?.options || [];
  let phrases = [...rawOptions];
  if (values.word) phrases = [values.word, ...phrases];
  else if (values.choice) phrases = [values.choice, ...phrases];
  else if (values.takeaway) phrases = [values.takeaway, ...phrases];
  else if (values.thought) phrases = [values.thought, ...phrases];

  if (phrases.length === 0) {
    if (tool?.id === "nesheama") {
      phrases = ["לקחתי איתי רגע אחד\nשל נשימה."];
    } else {
      phrases = ["לקחתי איתי רגע אחד\nשל שקט."];
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  let currentPhrase = phrases[currentIndex % phrases.length];

  // Specific visual formatting for נשמ״ה reference
  if (tool?.id === "nesheama" && currentPhrase === "לקחתי איתי רגע אחד של נשימה.") {
    currentPhrase = "לקחתי איתי רגע אחד\nשל נשימה.";
  }

  const nextPhrase = () => {
    if (phrases.length > 1) {
      setCurrentIndex((i) => (i + 1) % phrases.length);
    }
  };

  const kickerName =
    tool?.id === "nesheama"
      ? "נשמ״ה"
      : meta.line1 + (meta.line2 ? ` ${meta.line2}` : "");

  // Pebble color specifically matched for calm pastel look
  const pebbleColor = tool?.id === "nesheama" ? "#cbd8cb" : meta.pebble;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/45 backdrop-blur-[1px] transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="flex-1 cursor-pointer" onClick={onDone} />

      {/* Bottom Sheet Card */}
      <div
        dir="rtl"
        lang="he"
        className="w-full max-w-md mx-auto rounded-t-[32px] px-6 pt-3 pb-8 sm:pb-10 shadow-[0_-12px_45px_rgba(0,0,0,0.22)] select-none animate-in fade-in slide-in-from-bottom-8 duration-300"
        style={{ backgroundColor: "#eae5d9" }}
      >
        {/* Drag handle */}
        <div className="w-11 h-1 rounded-full bg-[#1c1c1e]/20 mx-auto mt-1 mb-5" />

        {/* Kicker */}
        <div className="text-right">
          <span className="text-xs font-medium text-[#7d7973] block mb-2">
            {kickerName}
          </span>
        </div>

        {/* Phrase + Pebble circle row */}
        <div className="flex items-center justify-between gap-4 mt-1">
          {/* Main Phrase text */}
          <div
            onClick={nextPhrase}
            className={`text-right flex-1 ${phrases.length > 1 ? "cursor-pointer active:opacity-85" : ""}`}
          >
            <p className="text-[25px] sm:text-[27px] font-bold text-[#191c1f] leading-[1.3] whitespace-pre-line">
              {currentPhrase}
            </p>
          </div>

          {/* Pebble circle with pattern/icon */}
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shrink-0 flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
            style={{
              backgroundColor: pebbleColor,
              borderRadius: meta.pebbleRadius || "50%",
            }}
          >
            {Icon && (
              <Icon
                className="w-6 h-6 sm:w-7 sm:h-7 text-white/95 drop-shadow-sm"
                strokeWidth={1.5}
              />
            )}
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-xs sm:text-[13px] text-[#7d7973] text-right leading-relaxed mt-5 mb-8">
          זה נשמר אצלך בלבד. אפשר גם לכתוב אותו בספר, בעמוד
          <br />
          של התרגול.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full">
          {/* תרגול נוסף (Right button in RTL) */}
          <button
            onClick={onRepeat}
            className="py-4 px-6 rounded-full bg-[#ded9ce] hover:bg-[#d5cfc2] active:scale-95 text-[#1c1c1e] text-[15px] font-bold transition-all text-center shrink-0"
          >
            תרגול נוסף
          </button>

          {/* סיימתי (Left button in RTL) */}
          <button
            onClick={onDone}
            className="flex-1 py-4 px-8 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] active:scale-95 text-white text-[15px] font-bold transition-all text-center"
          >
            סיימתי
          </button>
        </div>
      </div>
    </div>
  );
}