import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import SpiritLayout from "@/components/SpiritLayout";
import BreathOrb from "@/components/BreathOrb";
import { site, safetyContent } from "@/lib/spiritContent";

export default function Home() {
  return (
    <SpiritLayout>
      {/* Hero */}
      <section className="pt-8 pb-12 text-center">
        <div className="mb-10 rise-in">
          <BreathOrb size={132} />
        </div>
        <h1
          className="font-display text-5xl sm:text-6xl font-semibold tracking-app-tight text-foreground rise-in"
          style={{ animationDelay: "0.1s" }}
        >
          {site.title}
        </h1>
        <p
          className="mt-4 font-body text-xl text-muted-foreground tracking-app rise-in"
          style={{ animationDelay: "0.2s" }}
        >
          {site.subtitle}
        </p>
      </section>

      {/* Intro */}
      <section className="max-w-md mx-auto text-center space-y-4 mb-14">
        <p
          className="font-body text-2xl font-medium text-foreground tracking-app rise-in"
          style={{ animationDelay: "0.3s" }}
        >
          {site.welcome}
        </p>
        <p
          className="font-body text-lg leading-relaxed text-muted-foreground rise-in"
          style={{ animationDelay: "0.4s" }}
        >
          {site.intro}
        </p>
        <p
          className="font-body text-lg leading-relaxed text-muted-foreground rise-in"
          style={{ animationDelay: "0.5s" }}
        >
          {site.intro2}
        </p>
      </section>

      {/* Bento */}
      <section className="space-y-3 max-w-md mx-auto">
        <Link
          to="/guided"
          className="group block rounded-3xl bg-primary text-primary-foreground p-7 rise-in hover:opacity-90 transition-opacity"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-2xl font-semibold tracking-app-tight">עזרו לי לבחור</p>
              <p className="mt-1 text-sm text-primary-foreground/60">מסלול קצר ומונחה</p>
            </div>
            <ChevronLeft className="w-6 h-6 text-primary-foreground/50 group-hover:-translate-x-1 transition-transform" />
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/tools"
            className="group block rounded-3xl bg-secondary p-6 rise-in hover:bg-secondary/70 transition-colors"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="font-display text-xl font-semibold tracking-app-tight">כל הכלים</p>
            <p className="mt-1 text-sm text-muted-foreground">ספריית תרגולים</p>
          </Link>
          <Link
            to="/tool/nesheama"
            className="group block rounded-3xl bg-secondary p-6 rise-in hover:bg-secondary/70 transition-colors"
            style={{ animationDelay: "0.75s" }}
          >
            <p className="font-display text-xl font-semibold tracking-app-tight">רגע של עצירה</p>
            <p className="mt-1 text-sm text-muted-foreground">נשימה אחת</p>
          </Link>
        </div>

        <Link
          to="/safety"
          className="group block rounded-3xl border border-border bg-card p-6 rise-in hover:bg-secondary/50 transition-colors"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="flex items-center justify-between">
            <p className="font-display text-lg font-medium tracking-app">{safetyContent.link}</p>
            <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      <p
        className="mt-12 text-center text-sm text-muted-foreground max-w-xs mx-auto rise-in"
        style={{ animationDelay: "0.9s" }}
      >
        {site.hint}
      </p>
    </SpiritLayout>
  );
}