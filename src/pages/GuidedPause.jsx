import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import BreathOrb from "@/components/BreathOrb";
import { pauseBeforeTool } from "@/lib/spiritContent";

function resolveTarget(target) {
  if (!target) return "/";
  if (target.type === "gate") return `/tools?gate=${target.gate}`;
  if (target.type === "tool") return `/tool/${target.toolId}`;
  if (target.type === "flow") {
    if (target.flow === "emotion") return "/tool/emotion-space";
    if (target.flow === "fatigue") return "/flow/fatigue";
    if (target.flow === "memory") return "/flow/memory";
  }
  return "/";
}

export default function GuidedPause() {
  const navigate = useNavigate();
  const [target, setTarget] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("sl_guided_target");
    if (raw) setTarget(JSON.parse(raw));
  }, []);

  const continueNext = () => {
    navigate(resolveTarget(target));
  };

  return (
    <SpiritLayout theme="ink" bleed footer={false}>
      <section className="relative flex-1 bg-ink overflow-hidden flex items-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 50% at 50% 20%, rgba(40,90,200,0.26), transparent 70%)",
          }}
        />

        <div className="relative w-full max-w-[720px] mx-auto px-6 py-24 flex flex-col items-center text-center">
          <div className="reveal-blur">
            <BreathOrb size={200} variant="ink" />
          </div>

          <h1
            className="mt-16 display-xl text-[2rem] sm:text-[2.75rem] text-on-ink max-w-xl reveal"
            style={{ animationDelay: "0.2s" }}
          >
            {pauseBeforeTool.title}
          </h1>

          <div className="mt-8 space-y-4 max-w-md">
            {pauseBeforeTool.lines.map((line, i) => (
              <p
                key={i}
                className="body-lead text-[1.0625rem] sm:text-[1.1875rem] text-on-ink-muted reveal"
                style={{ animationDelay: `${0.32 + 0.12 * i}s` }}
              >
                {line}
              </p>
            ))}
          </div>

          <button
            onClick={continueNext}
            className="mt-14 rounded-full bg-primary text-primary-foreground px-10 py-3.5 text-[1.0625rem] font-medium tracking-tight transition-all duration-500 ease-apple hover:brightness-110 active:scale-[0.97] reveal"
            style={{ animationDelay: "0.62s" }}
          >
            {pauseBeforeTool.button}
          </button>
        </div>
      </section>
    </SpiritLayout>
  );
}