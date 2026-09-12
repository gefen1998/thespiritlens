import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import StepFlow from "@/components/StepFlow";
import PersonalCard from "@/components/PersonalCard";
import { documentFlow } from "@/lib/spiritContent";

export default function ThoughtDocument() {
  const navigate = useNavigate();
  const [values, setValues] = useState(null);
  const storageKey = "sl_doc";

  if (values) {
    return (
      <SpiritLayout>
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
      </SpiritLayout>
    );
  }

  return (
    <SpiritLayout>
      <StepFlow
        steps={documentFlow.steps}
        intro={documentFlow.intro}
        onComplete={setValues}
        storageKey={storageKey}
        finishLabel="לשמור"
      />
    </SpiritLayout>
  );
}