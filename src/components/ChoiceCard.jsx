import React from "react";
import { cn } from "@/lib/utils";

export default function ChoiceCard({ label, sub, subtle = false, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-right rounded-3xl border px-6 py-6 transition-all duration-500 rise-in",
        "hover:border-gold/40 hover:bg-card hover:shadow-[0_8px_40px_-12px_rgba(201,178,126,0.25)]",
        subtle
          ? "border-border/50 bg-secondary/30 text-muted-foreground"
          : "border-border bg-card/60 text-foreground"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className={cn("font-body text-lg leading-snug", subtle ? "font-normal" : "font-medium")}>
          {label}
        </span>
        {icon && <span className="text-gold/70 group-hover:text-gold transition-colors">{icon}</span>}
      </div>
      {sub && <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{sub}</p>}
    </button>
  );
}