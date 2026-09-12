import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import StepFlow from "@/components/StepFlow";
import PersonalCard from "@/components/PersonalCard";
import { actFlow } from "@/lib/spiritContent";

const whenLabels = { now: "עכשיו", today: "היום", tomorrow: "מחר", other: "זמן אחר" };

export default function ThoughtAct() {
  const navigate = useNavigate();
  const [values, setValues] = useState(null);
  const storageKey = "sl_act";

  if (values) {
    return (
      <SpiritLayout>
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
      </SpiritLayout>
    );
  }

  return (
    <SpiritLayout>
      <StepFlow
        steps={actFlow.steps}
        intro={actFlow.intro}
        onComplete={setValues}
        storageKey={storageKey}
        finishLabel="לשמור"
      />
    </SpiritLayout>
  );
}