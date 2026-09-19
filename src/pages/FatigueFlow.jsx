import React from "react";
import { useNavigate } from "react-router-dom";
import FocusHeader from "@/components/FocusHeader";
import ChoiceCard from "@/components/ChoiceCard";
import { fatigueOptions } from "@/lib/spiritContent";

export default function FatigueFlow() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <FocusHeader title="עייפות או ריקנות" />
      <div className="px-6 pt-8">
        <p className="t-lead text-muted-foreground mb-6">אין צורך לדרוש מעצמכם הרבה עכשיו. נבחר דבר אחד קטן ורך.</p>
        {fatigueOptions.map((opt) => (
          <ChoiceCard key={opt.id} label={opt.label} onClick={() => navigate(`/tool/${opt.toolId}`)} />
        ))}
      </div>
    </div>
  );
}
