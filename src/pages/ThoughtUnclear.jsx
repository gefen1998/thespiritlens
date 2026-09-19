import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FocusHeader from "@/components/FocusHeader";
import BreathOrb from "@/components/BreathOrb";
import StepFlow from "@/components/StepFlow";
import ActionButton from "@/components/ActionButton";
import { unclearFlow } from "@/lib/spiritContent";

export default function ThoughtUnclear() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("steps");

  const onComplete = (values) => {
    const route = values._route_q1 || values._route_q2 || values._route_q3;
    if (route === "document") navigate("/thought/document");
    else if (route === "act") navigate("/thought/act");
    else if (route === "release") navigate("/thought/release");
    else setPhase("fallback");
  };

  if (phase === "fallback") {
    return (
      <div className="min-h-screen flex flex-col pb-10">
        <FocusHeader kicker="תרגול" title="לא ברור לי" />
        <div className="flex-1 flex flex-col items-center text-center px-6 pt-8">
          <BreathOrb size={72} />
          <p className="t-lead text-foreground/85 max-w-md mt-8">{unclearFlow.fallback.text}</p>
          <ActionButton onClick={() => navigate("/tool/nesheama")} className="mt-8">
            {unclearFlow.fallback.button}
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <StepFlow
      tool={{ name: "לא ברור לי", steps: unclearFlow.steps, mode: "read" }}
      tone="thought"
      onComplete={onComplete}
      storageKey="sl_unclear"
    />
  );
}
