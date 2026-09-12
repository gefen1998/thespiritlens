import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import SpiritLayout from "@/components/SpiritLayout";
import { safetyContent } from "@/lib/spiritContent";

export default function Safety() {
  return (
    <SpiritLayout>
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gold-soft flex items-center justify-center mb-4">
            <Heart className="w-7 h-7 text-gold/70" />
          </div>
          <h1 className="font-display text-2xl text-foreground leading-relaxed">{safetyContent.link}</h1>
        </div>

        <div className="space-y-5 text-center">
          <p className="font-body text-base leading-relaxed text-foreground/85">{safetyContent.body}</p>
          <p className="font-body text-base leading-relaxed text-foreground/85">{safetyContent.urgent}</p>
          <div className="rounded-2xl border border-border bg-card/60 px-6 py-5">
            <p className="font-display text-lg text-foreground mb-2">{safetyContent.gentlePrompt}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{safetyContent.localNote}</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block rounded-full border border-border bg-card text-foreground px-8 py-3.5 text-base font-medium hover:border-gold/40 transition"
          >
            חזרה למרחב
          </Link>
        </div>
      </div>
    </SpiritLayout>
  );
}