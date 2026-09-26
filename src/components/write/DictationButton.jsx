import React from "react";
import { Mic, Square } from "lucide-react";
import useDictation from "@/hooks/useDictation";

export default function DictationButton({ onText }) {
  const { supported, listening, start, stop } = useDictation(onText);

  if (!supported) {
    return (
      <p className="mt-3 text-center text-[13px] text-[#7E7B73]">
        הקלטה ותמלול אינם נתמכים בדפדפן זה. אפשר לנסות בכרום.
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={listening ? stop : start}
      className={`mt-3 w-full h-14 rounded-[20px] flex items-center justify-center gap-2.5 text-[16px] font-bold transition-colors active:scale-[0.99] ${
        listening ? "bg-[#B35C44] text-[#FBFAF7]" : "bg-[#FBFAF7] text-[#16161A] border border-[#E3D6B8]"
      }`}
    >
      {listening ? (
        <>
          <Square className="w-4 h-4 fill-current" strokeWidth={0} />
          מקליט… לחצו לעצירה
        </>
      ) : (
        <>
          <Mic className="w-[18px] h-[18px]" strokeWidth={1.8} />
          הקלט ותמלל לתוך הטקסט
        </>
      )}
    </button>
  );
}