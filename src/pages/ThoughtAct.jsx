import React, { useState } from "react";
import StepFlow from "@/components/StepFlow";
import PersonalCard from "@/components/PersonalCard";
import { actFlow } from "@/lib/spiritContent";
import { saveMoment } from "@/lib/savedMoments";

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
      onComplete={(val) => {
        setValues(val);
        if (val) {
          const actionText = val[actFlow.card.titleKey] || "פעולה שנבחרה";
          const whenText = whenLabels[val[actFlow.card.bodyKey]] || val[actFlow.card.bodyKey] || "";
          saveMoment({
            toolId: "thought-act",
            toolName: "לפעול",
            type: "thought",
            text: actionText,
            details: { when: whenText },
          });
        }
      }}
      storageKey={storageKey}
    />
  );
}