import React from "react";
import { useNavigate } from "react-router-dom";
import FocusHeader from "@/components/FocusHeader";
import ChoiceCard from "@/components/ChoiceCard";
import { memoryFlow } from "@/lib/spiritContent";

export default function MemoryFlow() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <FocusHeader title="זיכרון שאני נושא/ת" />
      <div className="px-6 pt-8">
        <p className="t-lead text-foreground/85 mb-2">{memoryFlow.intro}</p>
        <p className="t-small text-muted-foreground mb-6">{memoryFlow.note}</p>
        {memoryFlow.options.map((opt) => (
          <ChoiceCard key={opt.id} label={opt.label} onClick={() => navigate(`/tool/${opt.toolId}`)} />
        ))}
      </div>
    </div>
  );
}
