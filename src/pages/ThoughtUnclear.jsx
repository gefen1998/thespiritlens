import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import StepFlow from "@/components/StepFlow";
import BreathOrb from "@/components/BreathOrb";
import { unclearFlow } from "@/lib/spiritContent";

export default function ThoughtUnclear() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("steps");
  const storageKey = "sl_unclear";

  const onComplete = (values) => {
    const route = values._route_q1 || values._route_q2 || values._route_q3;
    if (route === "document") navigate("/thought/document");
    else if (route === "act") navigate("/thought/act");
    else if (route === "release") navigate("/thought/release");
    else setPhase("fallback");
  };

  if (phase === "fallback") {
    return (
      <SpiritLayout>
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="mb-10"><BreathOrb size={140} /></div>
          <p className="font-display text-xl leading-relaxed text-foreground/85 max-w-md mx-auto mb-10">
            {unclearFlow.fallback.text}
          </p>
          <button
            onClick={() => navigate("/tool/nesheama")}
            className="rounded-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium hover:bg-primary/90 hover:shadow-lg transition mx-auto"
          >
            {unclearFlow.fallback.button}
          </button>
        </div>
      </SpiritLayout>
    );
  }

  return (
    <SpiritLayout>
      <StepFlow
        steps={unclearFlow.steps}
        onComplete={onComplete}
        storageKey={storageKey}
        finishLabel="המשך"
      />
    </SpiritLayout>
  );
}