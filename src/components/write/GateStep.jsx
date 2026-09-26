import React from "react";
import { Quote } from "lucide-react";
import { STORY_GATES } from "@/lib/storyGates";
import GateCard from "@/components/write/GateCard";

export default function GateStep({ formData, setField }) {
  const gates = formData.gates || [];
  const toggle = (id) =>
    setField("gates", gates.includes(id) ? gates.filter((g) => g !== id) : [...gates, id]);

  return (
    <div className="mt-6 text-right">
      {formData.anchor && (
        <div className="flex items-start gap-2 p-4 rounded-[20px] bg-[#E3DFD6]">
          <Quote className="w-4 h-4 mt-0.5 shrink-0 fill-current text-[#9C9A91]" strokeWidth={0} />
          <div>
            <span className="block text-[12px] text-[#7E7B73]">מלווה אותך בכתיבה</span>
            <span className="block text-[16px] text-[#2C2B26]">{formData.anchor}</span>
          </div>
        </div>
      )}

      <h1 className="mt-7 text-[28px] font-bold leading-[1.25] text-[#16161A]">בחר את השער של הסיפור</h1>
      <p className="mt-2 text-[16px] leading-[1.7] text-[#6B6A63]">
        כל שער הוא דלת אל עולם אחר של זיכרון ומשמעות. אפשר לבחור יותר מאחד.
      </p>

      <div className="mt-5 space-y-2.5">
        {STORY_GATES.map((gate) => (
          <GateCard key={gate.id} gate={gate} selected={gates.includes(gate.id)} onToggle={() => toggle(gate.id)} />
        ))}
      </div>
    </div>
  );
}