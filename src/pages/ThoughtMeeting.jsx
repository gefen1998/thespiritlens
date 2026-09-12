import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import StepFlow from "@/components/StepFlow";
import ChoiceCard from "@/components/ChoiceCard";
import { tools, thoughtBranches } from "@/lib/spiritContent";

export default function ThoughtMeeting() {
  const tool = tools["thought-meeting"];
  const navigate = useNavigate();
  const [phase, setPhase] = useState("steps");
  const [values, setValues] = useState({});

  const onComplete = (collected) => {
    setValues(collected);
    if (collected.thought) sessionStorage.setItem("sl_thought", collected.thought);
    setPhase("branches");
  };

  if (phase === "branches") {
    return (
      <SpiritLayout>
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="font-display text-2xl text-center text-foreground leading-relaxed mb-3">
            מה המחשבה הזאת מבקשת ממני עכשיו?
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            בחרו את הכיוון שנכון לכם. אין בחירה נכונה יותר מרעה.
          </p>
          <div className="space-y-3">
            {thoughtBranches.map((b) => (
              <ChoiceCard
                key={b.id}
                label={b.label}
                sub={b.sub}
                subtle={b.subtle}
                onClick={() => navigate(`/thought/${b.id}`)}
              />
            ))}
          </div>
        </div>
      </SpiritLayout>
    );
  }

  return (
    <SpiritLayout>
      <div className="pt-2 pb-2">
        <h1 className="font-display text-2xl text-foreground leading-snug">{tool.name}</h1>
      </div>
      <StepFlow
        steps={tool.steps}
        onComplete={onComplete}
        storageKey="sl_thought_meeting"
        finishLabel="המשך"
      />
    </SpiritLayout>
  );
}