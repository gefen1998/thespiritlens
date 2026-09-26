import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useParams, useNavigate } from "react-router-dom";
import FocusHeader from "@/components/FocusHeader";
import StepFlow from "@/components/StepFlow";
import ChoiceCard from "@/components/ChoiceCard";
import PracticeCompletionSheet from "@/components/PracticeCompletionSheet";
import { tools, thoughtBranches, emotionNeedMap, toolTone } from "@/lib/spiritContent";

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const tool = tools[toolId];
  const tone = toolTone(toolId);
  const [phase, setPhase] = useState("steps"); // steps | completed | branches
  const [values, setValues] = useState({});
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (!tools[toolId]) return;
    base44.analytics.track({
      eventName: `tool_opened_${toolId.replace(/-/g, "_")}`,
      properties: { tool_id: toolId, tool_name: tools[toolId].name },
    });
  }, [toolId]);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <FocusHeader title="הכלי לא נמצא" />
        <p className="px-6 pt-8 t-lead text-muted-foreground">אולי הקישור השתנה. אפשר לחזור לרשימת הכלים.</p>
      </div>
    );
  }

  const storageKey = `sl_tool_${toolId}`;

  const onComplete = (collected) => {
    setValues(collected || {});
    if (tool.ending?.kind === "thought-branches") {
      if (collected?.thought) {
        try { sessionStorage.setItem("sl_thought", collected.thought); } catch {}
      }
      setPhase("branches");
    } else if (tool.ending?.kind === "flow") {
      const map = emotionNeedMap[collected?.need];
      if (map) navigate(`/tool/${map.toolId}`);
      else navigate("/tools");
    } else {
      setPhase("completed");
    }
  };

  const handleRestart = () => {
    setValues({});
    setRunKey((k) => k + 1);
    setPhase("steps");
  };

  const handleDone = () => {
    navigate("/tools");
  };

  // ---- Thought branches ----
  if (phase === "branches") {
    return (
      <div className="min-h-screen flex flex-col">
        <FocusHeader kicker="תרגול" title="מה המחשבה מבקשת עכשיו?" />
        <div className="px-6 pt-8">
          <p className="t-lead text-muted-foreground mb-6">בחרו את הכיוון שנכון לכם. אין בחירה נכונה יותר מרעה.</p>
          {thoughtBranches.map((b) => (
            <ChoiceCard
              key={b.id}
              label={b.label}
              sub={b.sub}
              subtle={b.subtle}
              onClick={() => navigate(`/thought/${b.id}`)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className={phase === "completed" ? "pointer-events-none select-none" : ""}>
        <StepFlow
          key={runKey}
          tool={tool}
          tone={tone}
          onComplete={onComplete}
          storageKey={storageKey}
        />
      </div>

      {phase === "completed" && (
        <PracticeCompletionSheet
          tool={tool}
          values={values}
          onDone={handleDone}
          onRepeat={handleRestart}
        />
      )}
    </div>
  );
}