import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import SpiritLayout from "@/components/SpiritLayout";
import BreathOrb from "@/components/BreathOrb";
import StepFlow from "@/components/StepFlow";
import PersonalCard from "@/components/PersonalCard";
import ChoiceCard from "@/components/ChoiceCard";
import { tools, emotionNeedMap } from "@/lib/spiritContent";

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const tool = tools[toolId];
  const [phase, setPhase] = useState("steps"); // steps | phrase | takeaway | done
  const [values, setValues] = useState({});
  const [phrase, setPhrase] = useState("");
  const [customPhrase, setCustomPhrase] = useState("");
  const [takeaway, setTakeaway] = useState("");

  if (!tool) {
    return (
      <SpiritLayout>
        <div className="flex-1 flex flex-col justify-center text-center">
          <p className="text-muted-foreground">הכלי לא נמצא.</p>
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
      const need = collected[tool.ending.flow === "emotion-need" ? "need" : "need"];
      const map = emotionNeedMap[need];
      if (map) navigate(`/tool/${map.toolId}`);
      else navigate("/tools");
    } else {
      navigate("/");
    }
  };

  // ---- Phrase ending ----
  if (phase === "phrase") {
    const options = tool.ending.options;
    const showCustom = phrase === "משפט אישי משלי." || customPhrase.length > 0;
    return (
      <SpiritLayout>
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="mb-10"><BreathOrb size={130} /></div>
          <h2 className="font-display text-2xl text-foreground mb-8">איזה משפט נכון לך לקחת מכאן?</h2>
          <div className="space-y-3 max-w-md mx-auto">
            {options.map((opt) => (
              <ChoiceCard
                key={opt}
                label={opt}
                subtle={phrase === opt}
                onClick={() => setPhrase(opt)}
              />
            ))}
          </div>
          {showCustom && (
            <input
              type="text"
              value={customPhrase}
              onChange={(e) => setCustomPhrase(e.target.value)}
              placeholder="כתבו את המשפט שלכם…"
              className="mt-4 max-w-md mx-auto w-full rounded-2xl border border-border bg-card/70 px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 transition"
            />
          )}
          <div className="mt-10">
            <button
              onClick={() => {
                const final = customPhrase.trim() || phrase;
                setPhrase(final);
                setPhase("done");
              }}
              disabled={!phrase && !customPhrase.trim()}
              className="rounded-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              לשמור את הרגע
            </button>
          </div>
        </div>
      </SpiritLayout>
    );
  }

  // ---- Takeaway ending (קרן אור) ----
  if (phase === "takeaway") {
    return (
      <SpiritLayout>
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="font-display text-2xl text-foreground text-center mb-8 leading-relaxed">
            {tool.ending.prompt}
          </h2>
          <div className="max-w-md mx-auto w-full space-y-4">
            <textarea
              value={takeaway}
              onChange={(e) => setTakeaway(e.target.value)}
              placeholder="מילה, תמונה, תחושה או משפט…"
              rows={4}
              className="w-full rounded-2xl border border-border bg-card/70 px-5 py-4 text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 transition resize-none"
            />
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/30 px-5 py-4 text-muted-foreground/60 cursor-not-allowed"
            >
              <Mic className="w-5 h-5" />
              <span className="text-base">הקלטה קולית — תתאפשר בהמשך</span>
            </button>
            <p className="text-xs text-center text-muted-foreground/70">
              נשמר את פרטיותכם. ההקלטה תיושם רק כשנוכל להבטיח שהיא פרטית ובטוחה.
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto w-full">
            <button
              onClick={() => { setValues({ ...values, takeaway: takeaway.trim() }); setPhase("done"); }}
              className="flex-1 rounded-full bg-primary text-primary-foreground px-8 py-4 text-lg font-medium hover:bg-primary/90 transition"
            >
              לשמור
            </button>
            <button
              onClick={() => { setValues({ ...values, takeaway: "" }); setPhase("done"); }}
              className="flex-1 rounded-full border border-border bg-card text-foreground px-8 py-4 text-lg font-medium hover:border-gold/40 transition"
            >
              דילוג
            </button>
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
      <SpiritLayout>
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
    <SpiritLayout>
      <div className="pt-2 pb-2">
        <h1 className="font-display text-2xl text-foreground leading-snug">{tool.name}</h1>
        {tool.audioReady === false && tool.audioNote && (
          <p className="mt-2 text-xs text-muted-foreground/80 bg-secondary/40 rounded-xl px-4 py-2.5 leading-relaxed">
            {tool.audioNote}
          </p>
        )}
      </div>
      <StepFlow
        steps={tool.steps}
        onComplete={onComplete}
        storageKey={storageKey}
        finishLabel="סיום"
      />
    </SpiritLayout>
  );
}