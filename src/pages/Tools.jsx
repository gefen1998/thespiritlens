import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Clock, ArrowLeft } from "lucide-react";
import SpiritLayout from "@/components/SpiritLayout";
import { gates, tools } from "@/lib/spiritContent";

export default function Tools() {
  const [params] = useSearchParams();
  const gateParam = params.get("gate");
  const refs = useRef({});

  useEffect(() => {
    if (gateParam && refs.current[gateParam]) {
      setTimeout(() => {
        refs.current[gateParam].scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [gateParam]);

  return (
    <SpiritLayout>
      <div className="pt-2 pb-4">
        <h1 className="font-display text-3xl text-foreground mb-2">כל הכלים</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          ארגנו את הכלים לפי ארבעה שערים. בחרו את מה שנכון לכם עכשיו.
        </p>
      </div>

      <div className="space-y-10">
        {gates.map((gate) => (
          <section
            key={gate.id}
            ref={(el) => (refs.current[gate.id] = el)}
            className={gateParam === gate.id ? "rounded-3xl bg-gold-soft/40 -mx-3 px-3 py-4" : ""}
          >
            <div className="mb-4">
              <h2 className="font-display text-2xl text-foreground">{gate.title}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{gate.subtitle}</p>
            </div>
            <div className="space-y-3">
              {gate.tools.map((toolId) => {
                const tool = tools[toolId];
                if (!tool) return null;
                return (
                  <div
                    key={toolId}
                    className="rounded-3xl border border-border bg-card/60 px-5 py-5 hover:border-gold/40 hover:bg-card transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-display text-lg text-foreground leading-snug">{tool.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground/80">
                          <Clock className="w-3.5 h-3.5" />
                          משך משוער: {tool.duration}
                        </p>
                      </div>
                      <Link
                        to={`/tool/${toolId}`}
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition self-center"
                      >
                        להתחיל
                        <ArrowLeft className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </SpiritLayout>
  );
}