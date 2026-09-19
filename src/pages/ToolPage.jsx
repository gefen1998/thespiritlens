import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import SpiritLayout from "@/components/SpiritLayout";
import BreathOrb from "@/components/BreathOrb";
import StepFlow from "@/components/StepFlow";
import PersonalCard from "@/components/PersonalCard";
import ChoiceCard from "@/components/ChoiceCard";
import ActionButton from "@/components/ActionButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { tools, emotionNeedMap, toolTone } from "@/lib/spiritContent";
import { cn } from "@/lib/utils";

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const tool = tools[toolId];
  const tone = toolTone(toolId);
  const pigment = `var(--pigment-${tone})`;
  const [phase, setPhase] = useState("steps"); // steps | phrase | takeaway | done
  const [values, setValues] = useState({});
  const [phrase, setPhrase] = useState("");
  const [customPhrase, setCustomPhrase] = useState("");
  const [takeaway, setTakeaway] = useState("");

  if (!tool) {
    return (
      <SpiritLayout>
        <div className="flex-1 flex flex-col justify-center text-center">
          <p className="t-lead text-muted-foreground">הכלי לא נמצא.</p>
        </div>
      </SpiritLayout>
    );
  }

  const storageKey = `sl_tool_${toolId}`;

  const onComplete = (collected) => {
    setValues(collected);
    if (tool.ending?.kind === "phrase") setPhase("phrase");
    else if (tool.ending?.kind === "takeaway") setPhase("takeaway");
    else if (tool.ending?.kind === "card") setPhase("done");
    else if (tool.ending?.kind === "flow") {
      const map = emotionNeedMap[collected.need];
      if (map) navigate(`/tool/${map.toolId}`);
      else navigate("/tools");
    } else {
      navigate("/");
    }
  };

  const inputClasses =
    "h-auto w-full rounded-lg border-2 border-transparent bg-card px-5 py-4 t-practice text-foreground text-right shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-flame/50 transition-colors";

  // ---- Phrase ending ----
  if (phase === "phrase") {
    const options = tool.ending.options;
    const showCustom = phrase === "משפט אישי משלי." || customPhrase.length > 0;
    return (
      <SpiritLayout footer={false}>
        <div className="flex-1 flex flex-col pb-24">
          <div
            className="flex-1 rounded-3xl px-6 py-8 sm:px-10 fade-in flex flex-col items-start text-right"
            style={{ backgroundColor: `hsl(${pigment} / 0.08)` }}
          >
            <BreathOrb size={72} tone={pigment} />
            <h2 className="mt-8 t-title text-foreground max-w-sm">איזה משפט נכון לך לקחת מכאן?</h2>

            <div className="mt-8 w-full max-w-md">
              {options.map((opt) => (
                <ChoiceCard key={opt} label={opt} subtle={phrase === opt} onClick={() => setPhrase(opt)} />
              ))}
            </div>

            {showCustom && (
              <Input
                type="text"
                value={customPhrase}
                onChange={(e) => setCustomPhrase(e.target.value)}
                placeholder="כתבו את המשפט שלכם…"
                className={cn(inputClasses, "mt-2 max-w-md")}
              />
            )}
          </div>

          <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background via-background/95 to-transparent pt-8">
            <div className="max-w-xl mx-auto px-5 pb-6 flex justify-end">
              <ActionButton
                onClick={() => {
                  setPhrase(customPhrase.trim() || phrase);
                  setPhase("done");
                }}
                disabled={!phrase && !customPhrase.trim()}
              >
                לשמור את הרגע
              </ActionButton>
            </div>
          </div>
        </div>
      </SpiritLayout>
    );
  }

  // ---- Takeaway ending (קרן אור) ----
  if (phase === "takeaway") {
    return (
      <SpiritLayout footer={false}>
        <div className="flex-1 flex flex-col pb-24">
          <div
            className="flex-1 rounded-3xl px-6 py-8 sm:px-10 fade-in flex flex-col items-start text-right"
            style={{ backgroundColor: `hsl(${pigment} / 0.08)` }}
          >
            <h2 className="t-title text-foreground max-w-md">{tool.ending.prompt}</h2>

            <div className="mt-8 w-full max-w-md">
              <Textarea
                value={takeaway}
                onChange={(e) => setTakeaway(e.target.value)}
                placeholder="מילה, תמונה, תחושה או משפט…"
                rows={3}
                className={cn(inputClasses, "resize-none leading-relaxed")}
              />
              <button
                disabled
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 t-small text-muted-foreground/70 cursor-not-allowed"
              >
                <Mic className="w-4 h-4" />
                הקלטה קולית — תתאפשר בהמשך
              </button>
              <p className="mt-2 t-micro text-muted-foreground leading-relaxed">
                ההקלטה תיושם רק כשנוכל להבטיח שהיא פרטית ובטוחה.
              </p>
            </div>
          </div>

          <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background via-background/95 to-transparent pt-8">
            <div className="max-w-xl mx-auto px-5 pb-6 flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  setValues({ ...values, takeaway: "" });
                  setPhase("done");
                }}
                className="t-small text-muted-foreground hover:text-foreground transition-colors"
              >
                דילוג
              </button>
              <ActionButton
                onClick={() => {
                  setValues({ ...values, takeaway: takeaway.trim() });
                  setPhase("done");
                }}
              >
                לשמור
              </ActionButton>
            </div>
          </div>
        </div>
      </SpiritLayout>
    );
  }

  // ---- Done / card ----
  if (phase === "done") {
    let fields = [];
    let closing = "";
    if (tool.ending?.kind === "phrase") {
      fields = [{ label: "המשפט שלי", value: phrase }];
      closing = "לקחתם איתכם רגע אחד. אפשר לחזור אליו כשתזדקקו.";
    } else if (tool.ending?.kind === "takeaway") {
      fields = [{ label: "מה שאני לוקח/ת איתי עכשיו", value: values.takeaway || "" }];
      closing = "מה שפגשתם בדמיון איתכם. אפשר לשוב אליו.";
    } else if (tool.ending?.kind === "card") {
      const e = tool.ending;
      fields = [{ label: e.titleLabel, value: values[e.titleKey] || "" }];
      if (e.bodyKey) fields.push({ label: e.bodyLabel, value: values[e.bodyKey] || "" });
      closing = e.closing;
    }
    return (
      <SpiritLayout footer={false}>
        <PersonalCard
          fields={fields}
          closing={closing}
          storageKey={storageKey}
          onReset={() => {
            sessionStorage.removeItem(storageKey);
            navigate(`/tool/${toolId}`);
          }}
        />
      </SpiritLayout>
    );
  }

  // ---- Steps ----
  return (
    <SpiritLayout footer={false}>
      <StepFlow
        steps={tool.steps}
        onComplete={onComplete}
        storageKey={storageKey}
        label={tool.name}
        tone={tone}
        intro={tool.audioReady === false ? tool.audioNote : undefined}
        finishLabel="סיום"
      />
    </SpiritLayout>
  );
}
