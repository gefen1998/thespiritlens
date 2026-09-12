import React from "react";
import { useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import ChoiceCard from "@/components/ChoiceCard";
import { memoryFlow } from "@/lib/spiritContent";

export default function MemoryFlow() {
  const navigate = useNavigate();
  return (
    <SpiritLayout>
      <div className="flex-1 flex flex-col justify-center">
        <p className="font-display text-xl text-center text-foreground/85 leading-relaxed mb-2 max-w-md mx-auto">
          {memoryFlow.intro}
        </p>
        <p className="text-center text-xs text-muted-foreground/70 mb-10 max-w-sm mx-auto">
          {memoryFlow.note}
        </p>
        <div className="space-y-3">
          {memoryFlow.options.map((opt) => (
            <ChoiceCard key={opt.id} label={opt.label} onClick={() => navigate(`/tool/${opt.toolId}`)} />
          ))}
        </div>
      </div>
    </SpiritLayout>
  );
}