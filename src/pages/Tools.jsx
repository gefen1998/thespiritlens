import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import ToolCard from "@/components/ToolCard";
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
      <div className="pt-6 pb-10 text-right fade-in">
        <h1 className="t-display text-foreground">כל הכלים</h1>
        <p className="mt-4 t-lead text-muted-foreground max-w-md">
          ארגנו את הכלים לפי ארבעה שערים. בחרו את מה שנכון לכם עכשיו.
        </p>
      </div>

      <div className="space-y-9">
        {gates.map((gate) => (
          <section key={gate.id} ref={(el) => (refs.current[gate.id] = el)}>
            <div className="mb-3">
              <h2 className="t-title text-foreground">{gate.title}</h2>
              <p className="mt-1 t-small text-muted-foreground">{gate.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 auto-rows-fr">
              {gate.tools.map((toolId, i) => {
                const tool = tools[toolId];
                if (!tool) return null;
                const size = i === 0 ? "feature" : "tile";
                return (
                  <div key={toolId} className={size === "feature" ? "col-span-2" : "col-span-1"}>
                    <ToolCard tool={tool} tone={gate.tone} size={size} />
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
