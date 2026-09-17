import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Clock, ArrowLeft } from "lucide-react";
import SpiritLayout from "@/components/SpiritLayout";
import { gates, tools } from "@/lib/spiritContent";
import { cn } from "@/lib/utils";

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
    <SpiritLayout bleed>
      {/* כותרת ענקית */}
      <div className="max-w-[1024px] mx-auto px-5 sm:px-6 pt-14 pb-12 sm:pt-20 sm:pb-16">
        <p className="eyebrow text-primary reveal">כל הכלים</p>
        <h1
          className="mt-3 display-xl text-[2.5rem] sm:text-[4rem] text-foreground reveal"
          style={{ animationDelay: "0.06s" }}
        >
          בחרו את מה
          <br />
          <span className="text-muted-foreground">שנכון לכם עכשיו.</span>
        </h1>
        <p
          className="mt-5 body-lead text-[1.0625rem] sm:text-[1.1875rem] text-muted-foreground max-w-lg reveal"
          style={{ animationDelay: "0.12s" }}
        >
          הכלים מסודרים בארבעה שערים. אין סדר נכון — אפשר להתחיל מכל מקום.
        </p>
      </div>

      <div className="max-w-[1024px] mx-auto px-5 sm:px-6 pb-24 space-y-16 sm:space-y-24">
        {gates.map((gate) => (
          <section
            key={gate.id}
            ref={(el) => (refs.current[gate.id] = el)}
            className="scroll-mt-20"
          >
            <div
              className={cn(
                "mb-6 sm:mb-8 pb-5 hairline-b",
                gateParam === gate.id && "relative"
              )}
            >
              {gateParam === gate.id && (
                <span className="eyebrow text-primary block mb-2">נבחר עבורכם</span>
              )}
              <h2 className="display-lg text-[1.875rem] sm:text-[2.5rem] text-foreground">
                {gate.title}
              </h2>
              <p className="mt-2 text-[1.0625rem] text-muted-foreground">{gate.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {gate.tools.map((toolId) => {
                const tool = tools[toolId];
                if (!tool) return null;
                return (
                  <Link
                    key={toolId}
                    to={`/tool/${toolId}`}
                    className="group flex flex-col rounded-bento bg-card elev-card hover:elev-card-hover px-7 py-7 transition-all duration-700 ease-apple hover:-translate-y-1"
                  >
                    <div className="flex-1">
                      <h3 className="display-lg text-[1.375rem] text-foreground">
                        {tool.name}
                      </h3>
                      <p className="mt-2.5 text-[1rem] leading-relaxed text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-[0.875rem] text-muted-foreground/80">
                        <Clock className="w-3.5 h-3.5" />
                        {tool.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[1rem] font-medium tracking-tight text-primary">
                        להתחיל
                        <ArrowLeft className="w-4 h-4 transition-transform duration-500 ease-apple group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </SpiritLayout>
  );
}