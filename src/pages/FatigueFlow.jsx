import React from "react";
import { useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import ChoiceCard from "@/components/ChoiceCard";
import { fatigueOptions } from "@/lib/spiritContent";

export default function FatigueFlow() {
  const navigate = useNavigate();
  return (
    <SpiritLayout>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="font-display text-2xl text-center text-foreground leading-relaxed mb-3">
          עייפות או ריקנות
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
          אין צורך לדרוש מעצמכם הרבה עכשיו. נבחר דבר אחד קטן ורך.
        </p>
        <div className="space-y-3">
          {fatigueOptions.map((opt) => (
            <ChoiceCard key={opt.id} label={opt.label} onClick={() => navigate(`/tool/${opt.toolId}`)} />
          ))}
        </div>
      </div>
    </SpiritLayout>
  );
}