import React, { useState } from "react";
import StepFlow from "@/components/StepFlow";
import PersonalCard from "@/components/PersonalCard";
import { actFlow } from "@/lib/spiritContent";

const whenLabels = { now: "עכשיו", today: "היום", tomorrow: "מחר", other: "זמן אחר" };

export default function ThoughtAct() {
  const [values, setValues] = useState(null);
  const storageKey = "sl_act";

  if (values) {
    return (
      <div className="min-h-screen flex flex-col">
        <PersonalCard
          fields={[
            { label: actFlow.card.titleLabel, value: values[actFlow.card.titleKey] || "" },
            { label: actFlow.card.bodyLabel, value: whenLabels[values[actFlow.card.bodyKey]] || values[actFlow.card.bodyKey] || "" },
          ]}
          closing={actFlow.closing}
          storageKey={storageKey}
          onReset={() => {
            sessionStorage.removeItem(storageKey);
            setValues(null);
          }}
        />
      </div>
    );
  }

  return (
    <StepFlow
      tool={{ name: "לפעול", steps: actFlow.steps, mode: "read", audioNote: actFlow.intro }}
      tone="thought"
      onComplete={setValues}
      storageKey={storageKey}
    />
  );
}
