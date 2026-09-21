import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenLine } from "lucide-react";
import { TOOL_CARD_META, getToolIcon } from "@/components/EditorialCard";

export default function PracticeCompletionSheet({ tool, values = {}, onDone, onRepeat }) {
  const navigate = useNavigate();
  const meta = (tool && TOOL_CARD_META[tool.id]) || {
    line1: tool?.name || "תרגול",
    line2: "",
    bg: "#D6D1C6",
    pebble: "#7C7263",
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
  const pebbleColor = tool?.id === "nesheama" ? "#6E8C63" : meta.pebble;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/45 backdrop-blur-[1px] transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="flex-1 cursor-pointer" onClick={onDone} />

      {/* Bottom Sheet Card */}
      <div
        dir="rtl"
        lang="he"
        className="w-full max-w-md mx-auto rounded-t-[32px] px-6 pt-3 pb-8 sm:pb-10 shadow-[0_-12px_45px_rgba(0,0,0,0.22)] select-none animate-in fade-in slide-in-from-bottom-8 duration-300"
        style={{ backgroundColor: "#F8F7F4" }}
      >
        {/* Drag handle */}
        <div className="w-11 h-1 rounded-full bg-[#16161A]/20 mx-auto mt-1 mb-5" />

        {/* Kicker */}
        <div className="text-right">
          <span className="text-xs font-medium text-[#6B6A63] block mb-2">
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
            <p className="text-[25px] sm:text-[27px] font-bold text-[#16161A] leading-[1.3] whitespace-pre-line">
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
        <p className="text-xs sm:text-[13px] text-[#6B6A63] text-right leading-relaxed mt-5 mb-8">
          זה נשמר אצלך בלבד. אפשר גם לכתוב אותו בספר, בעמוד
          <br />
          של התרגול.
        </p>

        {/* Action Buttons */}
        <div className="space-y-2.5 w-full">
          {/* לכתוב על זה - Terracotta direct CTA */}
          <button
            onClick={() => {
              if (onDone) onDone();
              navigate("/write");
            }}
            className="w-full py-4 px-6 rounded-full bg-[#B35C44] hover:bg-[#A3513B] active:scale-[0.98] text-white text-[16px] font-bold transition-all flex items-center justify-center gap-2.5 shadow-[0_3px_12px_rgba(179,92,68,0.22)] select-none"
          >
            <span>לכתוב על זה</span>
            <PenLine className="w-5 h-5 text-white/95" strokeWidth={1.8} />
          </button>

          {/* Secondary row */}
          <div className="flex items-center gap-2.5 w-full">
            <button
              onClick={onDone}
              className="flex-1 py-3.5 px-6 rounded-full bg-[#16161A] hover:bg-[#2A2A33] active:scale-95 text-white text-[15px] font-bold transition-all text-center"
            >
              סיימתי
            </button>

            <button
              onClick={onRepeat}
              className="py-3.5 px-6 rounded-full bg-[#DDD9D0] hover:bg-[#D5D0C6] active:scale-95 text-[#16161A] text-[15px] font-bold transition-all text-center shrink-0"
            >
              תרגול נוסף
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}