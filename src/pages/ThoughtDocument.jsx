import React, { useState } from "react";
import StepFlow from "@/components/StepFlow";
import PersonalCard from "@/components/PersonalCard";
import { documentFlow } from "@/lib/spiritContent";
import { saveMoment } from "@/lib/savedMoments";

export default function ThoughtDocument() {
  const [values, setValues] = useState(null);
  const storageKey = "sl_doc";

  if (values) {
    return (
      <div className="min-h-screen flex flex-col">
        <PersonalCard
          fields={[
            { label: documentFlow.card.titleLabel, value: values[documentFlow.card.titleKey] || "" },
            { label: documentFlow.card.bodyLabel, value: values[documentFlow.card.bodyKey] || "" },
          ]}
          closing={documentFlow.closing}
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
      tool={{ name: "לתעד", steps: documentFlow.steps, mode: "read", audioNote: documentFlow.intro }}
      tone="thought"
      onComplete={(val) => {
        setValues(val);
        if (val) {
          const title = val[documentFlow.card.titleKey] || "תיעוד מחשבה";
          const body = val[documentFlow.card.bodyKey] || "";
          saveMoment({
            toolId: "thought-document",
            toolName: "לתעד מחשבה",
            type: "thought",
            text: title,
            details: { body },
          });
        }
      }}
      storageKey={storageKey}
    />
  );
}