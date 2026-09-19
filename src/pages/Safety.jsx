import React from "react";
import SpiritLayout from "@/components/SpiritLayout";
import ActionButton from "@/components/ActionButton";
import { safetyContent } from "@/lib/spiritContent";

export default function Safety() {
  return (
    <SpiritLayout footer={false}>
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full fade-in">
        <h1 className="t-title text-foreground text-center">{safetyContent.link}</h1>

        <div className="mx-auto mt-8 h-px w-12 bg-flame/40" />

        <div className="mt-10 space-y-6">
          <p className="t-lead text-muted-foreground">{safetyContent.body}</p>
          <p className="t-lead text-foreground/90">{safetyContent.urgent}</p>
        </div>

        <div className="mt-10 pt-8" style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <p className="t-title text-foreground">{safetyContent.gentlePrompt}</p>
          <p className="mt-4 t-small text-muted-foreground">{safetyContent.localNote}</p>
        </div>

        <div className="mt-14 text-center">
          <ActionButton to="/" variant="quiet">
            חזרה למרחב
          </ActionButton>
        </div>
      </div>
    </SpiritLayout>
  );
}
