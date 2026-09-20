import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ChoiceCard({ label, sub, subtle = false, onClick, icon }) {
  return (
    <Card
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className={cn(
        "press cursor-pointer select-none rounded-2xl border-0 text-right mb-2.5 transition-colors duration-300",
        subtle ? "bg-primary" : "bg-secondary hover:bg-secondary/70"
      )}
    >
      <CardContent className="px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className={cn("t-row", subtle ? "text-primary-foreground" : "text-foreground")}>{label}</span>
          {icon && <span className="text-flame shrink-0">{icon}</span>}
        </div>
        {sub && (
          <p className={cn("mt-1 t-small", subtle ? "text-primary-foreground/75" : "text-muted-foreground")}>
            {sub}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
