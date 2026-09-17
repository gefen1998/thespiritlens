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
    <SpiritLayout bleed>
      <div className="max-w-[720px] w-full mx-auto px-5 sm:px-6 pt-14 pb-24 sm:pt-20">
        <p className="eyebrow text-primary reveal">שאלה אחת</p>
        <h1
          className="mt-3 display-xl text-[2.25rem] sm:text-[3.25rem] text-foreground reveal"
          style={{ animationDelay: "0.06s" }}
        >
          {guidedQuestion}
        </h1>

        <div className="mt-12 space-y-3">
          {guidedChoices.map((c, i) => (
            <div key={c.id} style={{ animationDelay: `${0.06 * i}s` }}>
              <ChoiceCard label={c.label} onClick={() => choose(c)} />
            </div>
          ))}
        </div>

        <p className="mt-10 text-[0.9375rem] leading-relaxed text-muted-foreground/80">
          אין תשובה נכונה או שגויה. כל בחירה מובילה למקום אחר.
        </p>
      </div>
    </SpiritLayout>
  );
}