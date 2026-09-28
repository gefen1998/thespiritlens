import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useParams, useNavigate } from "react-router-dom";
import FocusHeader from "@/components/FocusHeader";
import StepFlow from "@/components/StepFlow";
import Breath478 from "@/components/Breath478";
import GuidedAudioPlayer from "@/components/audio/GuidedAudioPlayer";
import ChoiceCard from "@/components/ChoiceCard";
import PracticeCompletionSheet from "@/components/PracticeCompletionSheet";
import { tools, thoughtBranches, emotionNeedMap, toolTone } from "@/lib/spiritContent";
import { localizeTool } from "@/lib/spiritContentEn";
import { useLang } from "@/lib/i18n";

const BRANCHES_EN = {
  document: ["Record", "There is something here I want to keep"],
  act: ["Act", "There is something real I can do"],
  release: ["Let go", "There is no possible action right now, and I want to set it aside for a while"],
  unclear: ["I'm not sure - help me choose"],
};

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLang();
  const tool = localizeTool(tools[toolId], lang);
  const tone = toolTone(toolId);
  const [phase, setPhase] = useState("steps"); // steps | completed | branches
  const [values, setValues] = useState({});
  const [runKey, setRunKey] = useState(0);
  const [listening, setListening] = useState(!!tool?.audio);

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
        <FocusHeader title={t("הכלי לא נמצא", "Tool not found")} />
        <p className="px-6 pt-8 t-lead text-muted-foreground">{t("אולי הקישור השתנה. אפשר לחזור לרשימת הכלים.", "The link may have changed. You can go back to the tools list.")}</p>
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
    setListening(!!tool.audio);
    setPhase("steps");
  };

  const handleDone = () => {
    navigate("/tools");
  };

  // ---- Thought branches ----
  if (phase === "branches") {
    return (
      <div className="min-h-screen flex flex-col">
        <FocusHeader kicker={t("תרגול", "Practice")} title={t("מה המחשבה מבקשת עכשיו?", "What is the thought asking for now?")} />
        <div className="px-6 pt-8">
          <p className="t-lead text-muted-foreground mb-6">{t("בחרו את הכיוון שנכון לכם. אין בחירה נכונה יותר מרעה.", "Choose the direction that feels right. No choice is better than another.")}</p>
          {thoughtBranches.map((b) => (
            <ChoiceCard
              key={b.id}
              label={lang === "en" ? BRANCHES_EN[b.id][0] : b.label}
              sub={lang === "en" ? BRANCHES_EN[b.id][1] : b.sub}
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
        {listening ? (
          <GuidedAudioPlayer
            key={runKey}
            tool={tool}
            onClose={() => navigate(-1)}
            onFinish={() => onComplete({})}
            onReadInstead={() => setListening(false)}
          />
        ) : tool.mode === "478" ? (
          <Breath478 key={runKey} tool={tool} tone={tone} onComplete={onComplete} />
        ) : (
        <StepFlow
          key={runKey}
          tool={tool}
          tone={tone}
          onComplete={onComplete}
          storageKey={storageKey}
        />
        )}
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