import React from "react";
import { useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import ChoiceCard from "@/components/ChoiceCard";
import { guidedQuestion, guidedChoices } from "@/lib/spiritContent";

export default function Guided() {
  const navigate = useNavigate();

  const choose = (choice) => {
    sessionStorage.setItem("sl_guided_target", JSON.stringify(choice.target));
    navigate("/guided/pause");
  };

  return (
    <SpiritLayout>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="font-display text-3xl text-center text-foreground leading-snug mb-10 rise-in">
          {guidedQuestion}
        </h1>
        <div className="space-y-3">
          {guidedChoices.map((c, i) => (
            <div key={c.id} style={{ animationDelay: `${0.08 * i}s` }}>
              <ChoiceCard label={c.label} onClick={() => choose(c)} />
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground/70">
          אין תשובה נכונה או שגויה. כל בחירה מובילה למקום אחר.
        </p>
      </div>
    </SpiritLayout>
  );
}