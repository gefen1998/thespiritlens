import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// כרטיס בנטו בסגנון Apple: לבן, פינות רכות מאוד, ללא גבול, עומק בצל בלבד.
export default function BentoCard({
  eyebrow,
  title,
  description,
  to,
  cta = "לגלות",
  tall = false,
  tone = "light",
  delay = 0,
}) {
  const onInk = tone === "ink";

  return (
    <Link
      to={to}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-bento p-7 sm:p-8 reveal",
        "transition-all duration-700 ease-apple hover:-translate-y-1",
        onInk
          ? "bg-ink-soft text-on-ink"
          : "bg-card text-foreground elev-card hover:elev-card-hover",
        tall ? "min-h-[280px] sm:min-h-[340px]" : "min-h-[220px]"
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {onInk && (
        <div
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 25% 0%, rgba(50,110,230,0.30), transparent 70%)",
          }}
        />
      )}

      <div className="relative flex-1">
        {eyebrow && (
          <p
            className={cn(
              "eyebrow",
              onInk ? "text-[#2997ff]" : "text-primary"
            )}
          >
            {eyebrow}
          </p>
        )}
        <h3
          className={cn(
            "mt-3 display-lg text-[1.625rem] sm:text-[2rem]",
            onInk ? "text-on-ink" : "text-foreground"
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "mt-3 text-[1.0625rem] leading-relaxed",
              onInk ? "text-on-ink-muted" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </div>

      <span
        className={cn(
          "relative mt-7 inline-flex items-center gap-1.5 text-[1.0625rem] font-medium tracking-tight",
          onInk ? "text-[#2997ff]" : "text-primary"
        )}
      >
        {cta}
        <ArrowLeft className="w-4 h-4 transition-transform duration-500 ease-apple group-hover:-translate-x-1" />
      </span>
    </Link>
  );
}