import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SpiritLayout from "@/components/SpiritLayout";
import BreathOrb from "@/components/BreathOrb";
import { site, safetyContent } from "@/lib/spiritContent";

export default function Home() {
  const navigate = useNavigate();

  return (
    <SpiritLayout hideNav>
      <div className="flex-1 flex flex-col justify-center text-center -mt-6">
        <div className="mb-10 rise-in">
          <BreathOrb size={150} />
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight rise-in" style={{ animationDelay: "0.1s" }}>
          {site.title}
        </h1>
        <p className="mt-3 font-display text-lg text-muted-foreground rise-in" style={{ animationDelay: "0.2s" }}>
          {site.subtitle}
        </p>

        <div className="mt-10 space-y-5 max-w-md mx-auto rise-in" style={{ animationDelay: "0.3s" }}>
          <p className="font-body text-lg leading-relaxed text-foreground/85">{site.welcome}</p>
          <p className="font-body text-base leading-relaxed text-muted-foreground">{site.intro}</p>
          <p className="font-body text-base leading-relaxed text-muted-foreground">{site.intro2}</p>
        </div>

        <div className="mt-10 space-y-3 max-w-sm mx-auto rise-in" style={{ animationDelay: "0.45s" }}>
          <button
            onClick={() => navigate("/guided")}
            className="w-full rounded-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium hover:bg-primary/90 hover:shadow-lg transition-all duration-300"
          >
            עזרו לי לבחור
          </button>
          <Link
            to="/tools"
            className="block w-full rounded-full border border-border bg-card/70 text-foreground px-8 py-4 text-lg font-medium hover:border-gold/40 hover:bg-card transition-all duration-300"
          >
            לכל הכלים
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground/70 max-w-xs mx-auto rise-in" style={{ animationDelay: "0.6s" }}>
          {site.hint}
        </p>

        <Link
          to="/safety"
          className="mt-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rise-in"
          style={{ animationDelay: "0.7s" }}
        >
          <span className="underline underline-offset-4 decoration-border">{safetyContent.link}</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </SpiritLayout>
  );
}