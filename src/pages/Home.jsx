import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronLeft } from "lucide-react";
import SpiritLayout from "@/components/SpiritLayout";
import BreathOrb from "@/components/BreathOrb";
import BentoTile from "@/components/BentoTile";
import { site, safetyContent } from "@/lib/spiritContent";

export default function Home() {
  return (
    <SpiritLayout fullBleed navTone="dark">
      {/* ==== CINEMATIC HERO ==== */}
      <section className="relative bg-ink text-white overflow-hidden -mt-12 pt-12">
        {/* ambient light */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 8%, rgba(70,110,220,0.28) 0%, transparent 70%)",
          }}
        />
        <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-14 fade-in">
            <BreathOrb size={210} tone="dark" />
          </div>

          <h1 className="display-xl text-white rise-in" style={{ animationDelay: "0.15s" }}>
            {site.title}
          </h1>

          <p
            className="mt-6 lede font-body text-white/55 max-w-sm rise-in"
            style={{ animationDelay: "0.3s" }}
          >
            {site.subtitle}
          </p>

          <div
            className="mt-12 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto rise-in"
            style={{ animationDelay: "0.45s" }}
          >
            <Link
              to="/guided"
              className="w-full sm:w-auto rounded-full bg-white text-ink px-9 py-4 text-[17px] font-display font-bold tracking-app hover:bg-white/90 transition-colors"
            >
              עזרו לי לבחור
            </Link>
            <Link
              to="/tools"
              className="w-full sm:w-auto rounded-full glass-tile text-white px-9 py-4 text-[17px] font-display font-medium tracking-app hover:bg-white/20 transition-colors"
            >
              לכל הכלים
            </Link>
          </div>

          <div className="absolute bottom-9 flex flex-col items-center gap-1.5 text-white/40 float-cue">
            <span className="text-[11px] tracking-[0.16em]">גללו</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* ==== EDITORIAL STATEMENT ==== */}
      <section className="bg-background px-6 py-24 sm:py-32">
        <div className="max-w-2xl mx-auto space-y-10">
          <p className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            {site.welcome}
          </p>
          <h2 className="display-lg text-foreground">{site.intro}</h2>
          <p className="lede font-body text-muted-foreground max-w-lg">{site.intro2}</p>
        </div>
      </section>

      {/* ==== BENTO GRID ==== */}
      <section className="bg-background px-5 pb-24">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <BentoTile
            to="/guided"
            dark
            tall
            eyebrow="מסלול מונחה"
            title="עזרו לי לבחור"
            sub="שבע שאלות עדינות שיובילו אותך לכלי הנכון עכשיו"
            className="sm:col-span-2"
          />
          <BentoTile to="/tools" eyebrow="ספרייה" title="כל הכלים" sub="ארבעה שערים" />
          <BentoTile to="/tool/nesheama" eyebrow="דקה אחת" title="רגע של עצירה" sub="נשימה אחת, כאן" />
        </div>
      </section>

      {/* ==== CLOSING ==== */}
      <section className="bg-background px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <p className="display-md text-foreground/85 text-center max-w-md mx-auto">{site.hint}</p>
          <Link
            to="/safety"
            className="mt-12 group flex items-center justify-between max-w-md mx-auto rounded-[24px] border border-border bg-card px-6 py-5 hover:bg-secondary/60 transition-colors"
          >
            <span className="font-display text-[17px] font-medium tracking-app">{safetyContent.link}</span>
            <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </SpiritLayout>
  );
}