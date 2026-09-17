import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BentoTile({ to, eyebrow, title, sub, className, dark = false, tall = false }) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative overflow-hidden rounded-[28px] p-7 flex flex-col justify-between transition-all duration-500",
        tall ? "min-h-[220px]" : "min-h-[160px]",
        dark
          ? "bg-ink text-white hover:brightness-125"
          : "bg-secondary text-foreground hover:bg-[hsl(240_8%_93%)]",
        className
      )}
    >
      {dark && (
        <div
          className="absolute -top-16 -left-10 w-56 h-56 rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(90,140,255,0.35) 0%, transparent 65%)" }}
        />
      )}
      <div className="relative">
        {eyebrow && (
          <p
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.14em] mb-2",
              dark ? "text-white/45" : "text-muted-foreground/70"
            )}
          >
            {eyebrow}
          </p>
        )}
        <p className="display-md">{title}</p>
        {sub && (
          <p className={cn("mt-2 text-[15px] leading-snug", dark ? "text-white/55" : "text-muted-foreground")}>
            {sub}
          </p>
        )}
      </div>
      <div className="relative flex justify-start pt-6">
        <span
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-500 group-hover:-translate-x-1",
            dark ? "bg-white/10 text-white" : "bg-white text-foreground shadow-sm"
          )}
        >
          <ChevronLeft className="w-[18px] h-[18px]" />
        </span>
      </div>
    </Link>
  );
}