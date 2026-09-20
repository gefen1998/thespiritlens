import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpiritLayout from "@/components/SpiritLayout";
import BreathOrb from "@/components/BreathOrb";
import ActionButton from "@/components/ActionButton";
import { pauseBeforeTool, gates } from "@/lib/spiritContent";

function resolveTarget(target) {
  if (!target) return "/";
  if (target.type === "gate") {
    const firstTool = gates.find((g) => g.id === target.gate)?.tools[0];
    return firstTool ? `/tool/${firstTool}` : `/tools?gate=${target.gate}`;
  }
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
  const location = useLocation();
  const [target, setTarget] = useState(location.state?.target ?? null);

  useEffect(() => {
    if (target) return;
    const raw = sessionStorage.getItem("sl_guided_target");
    if (raw) setTarget(JSON.parse(raw));
  }, [target]);

  return (
    <SpiritLayout footer={false}>
      <div className="flex-1 flex flex-col justify-end pb-10">
        <BreathOrb size={64} />

        <div className="mt-6 rounded-3xl px-6 py-8 sm:px-10 fade-in text-right" style={{ backgroundColor: "hsl(var(--flame) / 0.08)" }}>
          <h1 className="t-title text-foreground max-w-sm">{pauseBeforeTool.title}</h1>

          <div className="mt-5 space-y-4 max-w-sm">
            {pauseBeforeTool.lines.map((line, i) => (
              <p key={i} className="t-lead text-muted-foreground">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <ActionButton onClick={() => navigate(resolveTarget(target))}>{pauseBeforeTool.button}</ActionButton>
        </div>
      </div>
    </SpiritLayout>
  );
}