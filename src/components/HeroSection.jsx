import React from "react";
import { Link } from "react-router-dom";
import BreathOrb from "@/components/BreathOrb";
import { site } from "@/lib/spiritContent";

// קטע פתיחה קינמטי מלא — שחור, אובייקט זוהר, טיפוגרפיה ענקית.
export default function HeroSection() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* שכבות אור עדינות ברקע */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 8%, rgba(40,90,200,0.28), transparent 70%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(90,60,200,0.16), transparent 72%)",
        }}
      />

      <div className="relative max-w-[1024px] mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 flex flex-col items-center text-center">
        <p
          className="eyebrow text-[#2997ff] reveal"
          style={{ animationDelay: "0.05s" }}
        >
          {site.footerModel}
        </p>

        <h1
          className="mt-5 display-hero text-on-ink text-[3.25rem] sm:text-[5.5rem] reveal-blur"
          style={{ animationDelay: "0.12s" }}
        >
          {site.title}
        </h1>

        <p
          className="mt-5 body-lead text-[1.3rem] sm:text-[1.75rem] text-on-ink-muted max-w-xl reveal"
          style={{ animationDelay: "0.24s" }}
        >
          {site.subtitle}
        </p>

        {/* האובייקט */}
        <div className="mt-14 sm:mt-16 reveal-blur" style={{ animationDelay: "0.32s" }}>
          <BreathOrb size={228} variant="ink" />
        </div>

        <div
          className="mt-16 sm:mt-20 max-w-xl space-y-5 reveal"
          style={{ animationDelay: "0.44s" }}
        >
          <p className="body-lead text-[1.1875rem] sm:text-[1.375rem] text-on-ink">
            {site.welcome} {site.intro}
          </p>
          <p className="text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-on-ink-muted">
            {site.intro2}
          </p>
        </div>

        {/* CTA בסגנון Apple Store */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto reveal"
          style={{ animationDelay: "0.56s" }}
        >
          <Link
            to="/guided"
            className="w-full sm:w-auto rounded-full bg-primary text-primary-foreground px-9 py-3.5 text-[1.0625rem] font-medium tracking-tight transition-all duration-500 ease-apple hover:brightness-110 active:scale-[0.97]"
          >
            עזרו לי לבחור
          </Link>
          <Link
            to="/tools"
            className="w-full sm:w-auto rounded-full border border-white/25 text-on-ink px-9 py-3.5 text-[1.0625rem] font-medium tracking-tight transition-all duration-500 ease-apple hover:bg-white/10 hover:border-white/40 active:scale-[0.97]"
          >
            לכל הכלים
          </Link>
        </div>

        <p
          className="mt-10 text-[0.9375rem] leading-relaxed text-on-ink-muted max-w-sm reveal"
          style={{ animationDelay: "0.66s" }}
        >
          {site.hint}
        </p>
      </div>
    </section>
  );
}