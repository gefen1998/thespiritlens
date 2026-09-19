import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FocusHeader from "@/components/FocusHeader";
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
      <div className="min-h-screen flex flex-col">
        <FocusHeader kicker="תרגול" title="מה המחשבה מבקשת עכשיו?" />
        <div className="px-6 pt-8">
          <p className="t-lead text-muted-foreground mb-6">בחרו את הכיוון שנכון לכם. אין בחירה נכונה יותר מרעה.</p>
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
    );
  }

  return (
    <StepFlow
      tool={{ name: tool.name, steps: tool.steps, mode: "read" }}
      tone="thought"
      onComplete={onComplete}
      storageKey="sl_thought_meeting"
    />
  );
}