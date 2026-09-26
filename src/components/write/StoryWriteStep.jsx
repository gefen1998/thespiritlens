import React from "react";
import DictationButton from "@/components/write/DictationButton";
import PersonalBackup from "@/components/write/PersonalBackup";
import GuidingQuestions from "@/components/write/GuidingQuestions";

const TARGET_CHARS = 1500;

export default function StoryWriteStep({ formData, setField }) {
  const story = formData.story || "";
  const percent = Math.min(100, Math.round((story.length / TARGET_CHARS) * 100));

  const appendText = (text) => {
    const current = formData.story || "";
    setField("story", current ? `${current} ${text}` : text);
  };

  return (
    <div className="mt-6 text-right">
      <GuidingQuestions />
      <textarea
        rows={9}
        style={{ minHeight: 240 }}
        value={story}
        onChange={(e) => setField("story", e.target.value)}
        placeholder="מה עובר עליי..."
        className="mt-4 w-full rounded-[22px] bg-[#FBFAF7] border border-[#E3D6B8] p-5 text-[17px] text-[#16161A] placeholder:text-[#8E8B83] focus:outline-none focus:ring-2 focus:ring-[#B35C44]/40 resize-none leading-relaxed"
      />

      <div className="mt-3">
        <div className="flex items-center justify-between text-[13px] text-[#6B6A63] tabular-nums">
          <span>
            {story.length.toLocaleString("he-IL")} תווים
            <span className="text-[#8E8B83]"> · מומלץ כ־1,500, בלי לחץ</span>
          </span>
          <span>{percent}%</span>
        </div>
        <div className="mt-1.5 h-1.5 rounded-full bg-[#E3DFD6] overflow-hidden">
          <div className="h-full rounded-full bg-[#B08A3E] transition-[width] duration-300" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <PersonalBackup formData={formData} />
      <DictationButton onText={appendText} />
    </div>
  );
}