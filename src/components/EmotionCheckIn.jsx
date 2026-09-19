import React from "react";
import BreathOrb from "@/components/BreathOrb";
import FeelingSlip from "@/components/FeelingSlip";
import { checkIn, guidedChoices } from "@/lib/spiritContent";

// full / tile / tile / full / tile / tile / full — an asymmetric rhythm
// (How We Feel and Headspace tile their tools this way) instead of one
// uniform stack of identical rows.
const LAYOUT = ["full", "tile", "tile", "full", "tile", "tile", "full"];

export default function EmotionCheckIn({ selected, onSelect }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="pt-6 pb-10 flex flex-col items-start text-right fade-in">
        <BreathOrb size={88} tone={selected ? `var(--pigment-${selected.tone})` : undefined} />
        <h1 className="mt-8 t-display text-foreground">{checkIn.question}</h1>
        <p className="mt-3 t-lead text-muted-foreground max-w-[19rem]">{checkIn.hint}</p>
      </div>

      <div className="fade-in grid grid-cols-2 gap-2.5 auto-rows-fr">
        {guidedChoices.map((choice, i) => {
          const size = LAYOUT[i] === "full" ? "feature" : "tile";
          return (
            <div key={choice.id} className={size === "feature" ? "col-span-2" : "col-span-1"}>
              <FeelingSlip
                label={choice.label}
                sub={choice.leadsTo}
                tone={choice.tone}
                size={size}
                selected={selected?.id === choice.id}
                dimmed={selected && selected.id !== choice.id}
                onClick={() => !selected && onSelect(choice)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
