import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import FocusHeader from "@/components/FocusHeader";
import StepFlow from "@/components/StepFlow";
import PersonalCard from "@/components/PersonalCard";
import ChoiceCard from "@/components/ChoiceCard";
import ActionButton from "@/components/ActionButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { tools, thoughtBranches, emotionNeedMap, toolTone } from "@/lib/spiritContent";
import { cn } from "@/lib/utils";

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const tool = tools[toolId];
  const tone = toolTone(toolId);
  const [phase, setPhase] = useState("steps"); // steps | phrase | takeaway | branches | done
  const [values, setValues] = useState({});
  const [phrase, setPhrase] = useState("");
  const [customPhrase, setCustomPhrase] = useState("");
  const [takeaway, setTakeaway] = useState("");

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
    setValues(collected);
    if (tool.ending?.kind === "phrase") setPhase("phrase");
    else if (tool.ending?.kind === "takeaway") setPhase("takeaway");
    else if (tool.ending?.kind === "card") setPhase("done");
    else if (tool.ending?.kind === "thought-branches") {
      if (collected.thought) {
        try { sessionStorage.setItem("sl_thought", collected.thought); } catch {}
      }
      setPhase("branches");
    } else if (tool.ending?.kind === "flow") {
      const map = emotionNeedMap[collected.need];
      if (map) navigate(`/tool/${map.toolId}`);
      else navigate("/tools");
    } else {
      navigate("/");
    }
  };

  const inputClasses =
    "h-auto w-full rounded-lg border-2 border-transparent bg-secondary/70 px-5 py-4 t-practice text-foreground text-right shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-flame/50 transition-colors";

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

  // ---- Phrase ending ----
  if (phase === "phrase") {
    const options = tool.ending.options;
    const showCustom = phrase === "משפט אישי משלי." || customPhrase.length > 0;
    return (
      <div className="min-h-screen flex flex-col pb-10">
        <FocusHeader kicker="תרגול" title={tool.name} />
        <div className="flex-1 px-6 pt-8">
          <h2 className="t-title text-foreground max-w-sm">איזה משפט נכון לך לקחת מכאן?</h2>
          <div className="mt-6">
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
              className={cn(inputClasses, "mt-2")}
            />
          )}
        </div>
        <div className="px-6 mt-6">
          <ActionButton
            onClick={() => {
              setPhrase(customPhrase.trim() || phrase);
              setPhase("done");
            }}
            disabled={!phrase && !customPhrase.trim()}
            className="w-full"
          >
            לשמור את הרגע
          </ActionButton>
        </div>
      </div>
    );
  }

  // ---- Takeaway ending (קרן אור) ----
  if (phase === "takeaway") {
    return (
      <div className="min-h-screen flex flex-col pb-10">
        <FocusHeader kicker="תרגול" title={tool.name} />
        <div className="flex-1 px-6 pt-8">
          <h2 className="t-title text-foreground">{tool.ending.prompt}</h2>
          <Textarea
            value={takeaway}
            onChange={(e) => setTakeaway(e.target.value)}
            placeholder="מילה, תמונה, תחושה או משפט…"
            rows={3}
            className={cn(inputClasses, "mt-6 resize-none leading-relaxed")}
          />
          <button
            disabled
            className="mt-5 w-full flex items-center justify-center gap-2 py-3 t-small text-muted-foreground/70 cursor-not-allowed"
          >
            <Mic className="w-4 h-4" />
            הקלטה קולית — תתאפשר בהמשך
          </button>
          <p className="mt-1 t-micro text-muted-foreground leading-relaxed">
            ההקלטה תיושם רק כשנוכל להבטיח שהיא פרטית ובטוחה.
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 px-6 mt-6">
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
      <div className="min-h-screen flex flex-col">
        <PersonalCard
          fields={fields}
          closing={closing}
          storageKey={storageKey}
          onReset={() => {
            sessionStorage.removeItem(storageKey);
            navigate(`/tool/${toolId}`);
          }}
        />
      </div>
    );
  }

  // ---- Steps ----
  return <StepFlow tool={tool} tone={tone} onComplete={onComplete} storageKey={storageKey} />;
}
