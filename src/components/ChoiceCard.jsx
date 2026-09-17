import React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// שורת בחירה בסגנון Apple: לבנה, פינות רכות, hairline, ללא רעש.
export default function ChoiceCard({ label, sub, subtle = false, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-right rounded-2xl px-6 py-5 reveal",
        "transition-all duration-500 ease-apple active:scale-[0.985]",
        subtle
          ? "bg-transparent hairline-t text-muted-foreground hover:text-foreground rounded-none px-1"
          : "bg-card elev-card hover:elev-card-hover hover:-translate-y-0.5 text-foreground"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className={cn(
            "text-[1.125rem] leading-snug tracking-tight",
            subtle ? "font-normal" : "font-medium"
          )}
        >
          {label}
        </span>
        {icon ? (
          <span className="text-primary">{icon}</span>
        ) : (
          !subtle && (
            <ArrowLeft className="w-4 h-4 shrink-0 text-muted-foreground/50 transition-all duration-500 ease-apple group-hover:-translate-x-1 group-hover:text-primary" />
          )
        )}
      </div>
      {sub && (
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {sub}
        </p>
      )}
    </button>
  );
}