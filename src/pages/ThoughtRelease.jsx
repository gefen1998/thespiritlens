import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import BreathOrb from "@/components/BreathOrb";
import StepFlow from "@/components/StepFlow";
import ChoiceCard from "@/components/ChoiceCard";
import PersonalCard from "@/components/PersonalCard";
import { releaseFlow } from "@/lib/spiritContent";

export default function ThoughtRelease() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("steps");
  const [phrase, setPhrase] = useState("");
  const [custom, setCustom] = useState("");
  const storageKey = "sl_release";

  if (phase === "done") {
    return (
      <SpiritLayout>
        <PersonalCard
          fields={[{ label: "המשפט שלי", value: custom.trim() || phrase }]}
          closing="הנחתם את המחשבה לרגע. אינכם צריכים לשאת אותה לבד עכשיו."
          storageKey={storageKey}
          onReset={() => {
            sessionStorage.removeItem(storageKey);
            setPhrase(""); setCustom(""); setPhase("steps");
          }}
        />
      </SpiritLayout>
    );
  }

  if (phase === "phrase") {
    const showCustom = phrase === "משפט אישי משלי." || custom.length > 0;
    return (
      <SpiritLayout>
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="mb-10"><BreathOrb size={130} /></div>
          <h2 className="font-display text-2xl text-foreground mb-8">{releaseFlow.prompt}</h2>
          <div className="space-y-3 max-w-md mx-auto">
            {releaseFlow.options.map((opt) => (
              <ChoiceCard key={opt} label={opt} subtle={phrase === opt} onClick={() => setPhrase(opt)} />
            ))}
          </div>
          {showCustom && (
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="כתבו את המשפט שלכם…"
              className="mt-4 max-w-md mx-auto w-full rounded-2xl border border-border bg-card/70 px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 transition"
            />
          )}
          <div className="mt-10">
            <button
              onClick={() => setPhase("done")}
              disabled={!phrase && !custom.trim()}
              className="rounded-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium hover:bg-primary/90 disabled:opacity-40 transition"
            >
              לשמור את המשפט
            </button>
          </div>
        </div>
      </SpiritLayout>
    );
  }

  return (
    <SpiritLayout>
      <StepFlow
        steps={releaseFlow.steps}
        onComplete={() => setPhase("phrase")}
        storageKey={storageKey}
        finishLabel="המשך"
      />
    </SpiritLayout>
  );
}