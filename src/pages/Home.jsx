import React from "react";
import { Link } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import HeroSection from "@/components/HeroSection";
import BentoCard from "@/components/BentoCard";
import { gates, safetyContent } from "@/lib/spiritContent";

const gateMeta = {
  body: { eyebrow: "הגוף", tall: true, tone: "ink" },
  thought: { eyebrow: "מחשבה" },
  emotion: { eyebrow: "רגש" },
  spirit: { eyebrow: "רוח", tall: true },
};

export default function Home() {
  return (
    <SpiritLayout theme="ink" bleed showBack={false}>
      <HeroSection />

      {/* קטע בנטו — השערים */}
      <section className="bg-background">
        <div className="max-w-[1024px] mx-auto px-5 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <p className="eyebrow text-primary reveal">המרחב</p>
            <h2
              className="mt-3 display-xl text-[2.25rem] sm:text-[3.25rem] text-foreground reveal"
              style={{ animationDelay: "0.06s" }}
            >
              ארבעה שערים.
              <br />
              <span className="text-muted-foreground">אחד מהם פתוח עכשיו.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {gates.map((gate, i) => {
              const meta = gateMeta[gate.id] || {};
              return (
                <BentoCard
                  key={gate.id}
                  eyebrow={meta.eyebrow}
                  title={gate.title}
                  description={gate.subtitle}
                  to={`/tools?gate=${gate.id}`}
                  cta="לכלים"
                  tall={meta.tall}
                  tone={meta.tone}
                  delay={0.08 * i}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* קטע סגירה שקט */}
      <section className="bg-background">
        <div className="max-w-[1024px] mx-auto px-5 sm:px-6 pb-20 sm:pb-28">
          <div className="rounded-bento bg-card elev-card px-7 py-12 sm:px-14 sm:py-16 text-center reveal">
            <h2 className="display-lg text-[1.75rem] sm:text-[2.5rem] text-foreground max-w-xl mx-auto">
              לא צריך לדעת מאיפה להתחיל.
            </h2>
            <p className="mt-4 body-lead text-[1.0625rem] sm:text-[1.1875rem] text-muted-foreground max-w-lg mx-auto">
              מסלול קצר של שאלה אחת יוביל אותך לכלי שמתאים לרגע הזה.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/guided"
                className="w-full sm:w-auto rounded-full bg-primary text-primary-foreground px-9 py-3.5 text-[1.0625rem] font-medium tracking-tight transition-all duration-500 ease-apple hover:brightness-110 active:scale-[0.97]"
              >
                להתחיל את המסלול
              </Link>
              <Link
                to="/safety"
                className="text-[1.0625rem] font-medium tracking-tight text-primary hover:opacity-70 transition-opacity duration-300"
              >
                {safetyContent?.link || "עזרה ותמיכה"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SpiritLayout>
  );
}