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
    <SpiritLayout>
      <div className="flex-1 flex flex-col justify-center text-center">
        <div className="mb-12">
          <BreathOrb size={170} />
        </div>
        <h1 className="font-display text-2xl text-foreground leading-relaxed mb-8 rise-in">
          {pauseBeforeTool.title}
        </h1>
        <div className="space-y-4 max-w-md mx-auto">
          {pauseBeforeTool.lines.map((line, i) => (
            <p key={i} className="font-body text-lg leading-relaxed text-muted-foreground rise-in" style={{ animationDelay: `${0.15 * (i + 1)}s` }}>
              {line}
            </p>
          ))}
        </div>
        <div className="mt-12">
          <button
            onClick={continueNext}
            className="rounded-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium hover:bg-primary/90 hover:shadow-lg transition-all duration-300 rise-in"
            style={{ animationDelay: "0.5s" }}
          >
            {pauseBeforeTool.button}
          </button>
        </div>
      </div>
    </SpiritLayout>
  );
}