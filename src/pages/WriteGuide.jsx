import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate, Link } from "react-router-dom";
import { X, ArrowRight, ArrowLeft, PenLine, Check, Bookmark } from "lucide-react";
import { saveMoment } from "@/lib/savedMoments";

const STEPS = [
  {
    stepNumber: "שלב ראשון",
    title: "הסיפור שלי",
    instruction: "אין צורך לכתוב יפה או מסודר. רק לכתוב את מה שנכון עכשיו. אפשר לדלג על כל שלב.",
    type: "intro",
  },
  {
    stepNumber: "שלב שני",
    title: "הסיפור שלי",
    instruction: "מה קרה, מה עובר עליך עכשיו? אפשר לכתוב בחופשיות.",
    placeholder: "מה עובר עליי...",
    type: "input",
    field: "story",
  },
  {
    stepNumber: "שלב שלישי",
    title: "הסיפור שלי",
    instruction: "מתוך מה שכתבת, מה היית רוצה לזכור?",
    placeholder: "מה חשוב שלא יאבד...",
    type: "input_with_chips",
    field: "remember",
    chips: ["הכוח שהיה בי", "מי שעמד לצידי", "מה שלמדתי על עצמי"],
  },
  {
    stepNumber: "שלב רביעי",
    title: "הסיפור שלי",
    instruction: "מילה אחת יכולה להכיל הרבה.",
    placeholder: "מילה או כותרת...",
    type: "input",
    field: "word",
  },
];

export default function WriteGuide() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    story: "",
    remember: "",
    word: "",
  });
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    base44.analytics.track({ eventName: "tool_opened_write_guide" });
  }, []);

  const step = STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      // Save locally to journal and moments
      try {
        const dateIso = new Date().toISOString();
        const mainText = formData.word || formData.remember || (formData.story ? formData.story.slice(0, 60) + "..." : "כתיבה בספר");

        saveMoment({
          toolId: "write-guide",
          toolName: "הסיפור שלי",
          type: "writing",
          text: mainText,
          date: dateIso,
          details: {
            word: formData.word,
            remember: formData.remember,
            story: formData.story,
          },
        });

        const saved = JSON.parse(localStorage.getItem("sl_journal_entries") || "[]");
        saved.unshift({
          ...formData,
          date: dateIso,
        });
        localStorage.setItem("sl_journal_entries", JSON.stringify(saved));
      } catch {}
      setIsCompleted(true);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleChipClick = (chip) => {
    setFormData((prev) => {
      const current = prev.remember ? prev.remember + ", " : "";
      return { ...prev, remember: current + chip };
    });
  };

  if (isCompleted) {
    return (
      <div dir="rtl" lang="he" className="min-h-screen bg-[#F4F1EA] text-[#16161A] flex flex-col justify-between p-6 max-w-md mx-auto">
        <div className="pt-6">
          <div className="w-12 h-12 rounded-full bg-[#B35C44]/15 text-[#B35C44] grid place-items-center mb-6">
            <Check className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-xs font-semibold text-[#8C8B84] tracking-wide block mb-1">
            נשמר בהצלחה
          </span>
          <h1 className="text-[30px] font-bold text-[#16161A] leading-tight mb-3">
            המילים שלך נשמרו.
          </h1>
          <p className="text-[14.5px] text-[#6B6A63] leading-relaxed mb-6">
            הכתיבה נשמרת באופן פרטי במכשירך בלבד, כחלק ממדריך הכתיבה ״כתב זאת זכרון בספר״.
          </p>

          {(formData.word || formData.remember || formData.story) && (
            <div className="p-5 rounded-[22px] bg-[#E9E5DC] border border-[#DDD9CE] space-y-3 text-right">
              {formData.word && (
                <div>
                  <span className="text-xs font-medium text-[#7C776D] block">מילה או כותרת</span>
                  <p className="text-[18px] font-bold text-[#16161A] mt-0.5">{formData.word}</p>
                </div>
              )}
              {formData.remember && (
                <div>
                  <span className="text-xs font-medium text-[#7C776D] block">מה שחשוב לזכור</span>
                  <p className="text-[14px] text-[#33322E] mt-0.5">{formData.remember}</p>
                </div>
              )}
              {formData.story && (
                <div>
                  <span className="text-xs font-medium text-[#7C776D] block">הסיפור</span>
                  <p className="text-[14px] text-[#33322E] mt-0.5 whitespace-pre-wrap">{formData.story}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-8 pb-4 space-y-2.5">
          <button
            onClick={() => navigate("/saved")}
            className="w-full py-4 rounded-full bg-[#B0654A] text-white font-bold text-[15px] hover:bg-[#A0553A] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Bookmark className="w-4 h-4" />
            <span>לרגעים ששמרתי</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 rounded-full bg-[#16161A] text-white font-bold text-[15px] hover:bg-[#2A2A33] active:scale-[0.98] transition-all"
          >
            חזרה למרחב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-[#F4F1EA] text-[#16161A] flex flex-col justify-between p-6 max-w-md mx-auto">
      {/* Top Header */}
      <div>
        {/* Step Kicker and Title, with close button on the same row */}
        <div className="flex items-start justify-between gap-3 pt-2 text-right">
          <h1 className="text-[34px] font-bold leading-[1.12]">
            <span className="block text-[#9C9A91]">{step.stepNumber}</span>
            <span className="block text-[#16161A]">{step.title}</span>
          </h1>
          <button
            onClick={() => navigate("/")}
            aria-label="סגירה"
            className="w-11 h-11 mt-1 shrink-0 rounded-full bg-[#E5E1D8] hover:bg-[#DDD9CE] text-[#4A4943] grid place-items-center transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <p className="mt-6 text-[19px] text-[#2C2B26] leading-[1.55] font-normal text-right">
          {step.instruction}
        </p>

        {/* Input area if step requires input */}
        {step.type !== "intro" && (
          <div className="mt-6">
            <textarea
              rows={step.field === "word" ? 3 : 5}
              style={{ minHeight: step.field === "word" ? 110 : 150 }}
              value={formData[step.field] || ""}
              onChange={(e) => setFormData({ ...formData, [step.field]: e.target.value })}
              placeholder={step.placeholder}
              className="w-full rounded-[22px] bg-[#E3DFD6] border-none p-5 text-[17px] text-[#16161A] placeholder:text-[#8E8B83] focus:outline-none focus:ring-2 focus:ring-[#B35C44]/40 transition-all resize-none text-right font-body leading-relaxed"
            />
            <p className="mt-3 text-[13px] text-[#7E7B73] text-right font-normal">
              אפשר גם לדלג ולא לכתוב.
            </p>

            {/* Chips for step 3 */}
            {step.chips && (
              <div className="mt-4 flex flex-wrap gap-2 justify-start">
                {step.chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    className="h-10 px-4 rounded-full whitespace-nowrap bg-[#E3DFD6] hover:bg-[#D9D5CC] active:scale-95 text-[#4A4943] text-[14px] font-medium transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Floating Navigation Bar */}
      <div className="pt-8 pb-4">
        <div className="flex items-center gap-3">
          {/* Main Action Bar */}
          <button
            onClick={handleNext}
            className="flex-1 h-[60px] rounded-full bg-[#16161A] text-white px-7 flex items-center justify-between active:scale-[0.98] transition-all select-none"
          >
            <span className="text-[17px] font-bold text-white">
              {isLastStep ? "לסיים" : "הבא"}
            </span>
            <span className="text-[14px] font-medium text-[#9C9A91] tabular-nums">
              {currentStepIndex + 1}/{STEPS.length}
            </span>
          </button>

          {/* Back Button (Circle) */}
          {currentStepIndex > 0 ? (
            <button
              onClick={handlePrev}
              aria-label="שלב קודם"
              className="w-[60px] h-[60px] rounded-full bg-[#E3DFD6] hover:bg-[#D8D4CB] text-[#16161A] grid place-items-center active:scale-95 transition-all shrink-0"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              aria-label="הבא"
              className="w-[60px] h-[60px] rounded-full bg-[#E3DFD6] hover:bg-[#D8D4CB] text-[#16161A] grid place-items-center active:scale-95 transition-all shrink-0"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}