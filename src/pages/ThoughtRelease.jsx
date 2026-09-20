import React, { useState } from "react";
import StepFlow from "@/components/StepFlow";
import PracticeCompletionSheet from "@/components/PracticeCompletionSheet";
import { releaseFlow } from "@/lib/spiritContent";

export default function ThoughtRelease() {
  const [phase, setPhase] = useState("steps");
  const [values, setValues] = useState({});
  const [runKey, setRunKey] = useState(0);

  const releaseTool = {
    id: "thought-release",
    name: "לשחרר",
    steps: releaseFlow.steps,
    mode: "breath",
    ending: {
      options: releaseFlow.options.filter((o) => o !== "משפט אישי משלי."),
    },
  };

  const handleRestart = () => {
    setValues({});
    setRunKey((k) => k + 1);
    setPhase("steps");
  };

  return (
    <div className="relative min-h-screen">
      <StepFlow
        key={runKey}
        tool={releaseTool}
        tone="thought"
        onComplete={(collected) => {
          setValues(collected || {});
          setPhase("completed");
        }}
      />

      {phase === "completed" && (
        <PracticeCompletionSheet
          tool={releaseTool}
          values={values}
          onDone={() => window.history.back()}
          onRepeat={handleRestart}
        />
      )}
    </div>
  );
}