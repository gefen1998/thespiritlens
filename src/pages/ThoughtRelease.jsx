import React, { useState } from "react";
import FocusHeader from "@/components/FocusHeader";
import BreathOrb from "@/components/BreathOrb";
import StepFlow from "@/components/StepFlow";
import ChoiceCard from "@/components/ChoiceCard";
import PersonalCard from "@/components/PersonalCard";
import ActionButton from "@/components/ActionButton";
import { Input } from "@/components/ui/input";
import { releaseFlow } from "@/lib/spiritContent";

export default function ThoughtRelease() {
  const [phase, setPhase] = useState("steps");
  const [phrase, setPhrase] = useState("");
  const [custom, setCustom] = useState("");
  const storageKey = "sl_release";

  if (phase === "done") {
    return (
      <div className="min-h-screen flex flex-col">
        <PersonalCard
          fields={[{ label: "המשפט שלי", value: custom.trim() || phrase }]}
          closing="הנחתם את המחשבה לרגע. אינכם צריכים לשאת אותה לבד עכשיו."
          storageKey={storageKey}
          onReset={() => {
            sessionStorage.removeItem(storageKey);
            setPhrase("");
            setCustom("");
            setPhase("steps");
          }}
        />
      </div>
    );
  }

  if (phase === "phrase") {
    const showCustom = phrase === "משפט אישי משלי." || custom.length > 0;
    return (
      <div className="min-h-screen flex flex-col pb-10">
        <FocusHeader kicker="תרגול" title="לשחרר" />
        <div className="flex-1 flex flex-col items-center text-center px-6 pt-8">
          <BreathOrb size={72} />
          <h2 className="mt-8 t-title text-foreground">{releaseFlow.prompt}</h2>
          <div className="mt-8 w-full max-w-md text-right">
            {releaseFlow.options.map((opt) => (
              <ChoiceCard key={opt} label={opt} subtle={phrase === opt} onClick={() => setPhrase(opt)} />
            ))}
          </div>
          {showCustom && (
            <Input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="כתבו את המשפט שלכם…"
              className="mt-2 max-w-md h-auto rounded-lg border-2 border-transparent bg-secondary/70 px-5 py-4 t-practice text-center shadow-none focus-visible:ring-0 focus-visible:border-flame/50"
            />
          )}
          <ActionButton
            onClick={() => setPhase("done")}
            disabled={!phrase && !custom.trim()}
            className="mt-8"
          >
            לשמור את המשפט
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <StepFlow
      tool={{ name: "לשחרר", steps: releaseFlow.steps, mode: "breath" }}
      tone="thought"
      onComplete={() => setPhase("phrase")}
      storageKey={storageKey}
    />
  );
}
