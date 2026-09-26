import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import PauseHero from "@/components/PauseHero";
import { EMOTION_ICONS } from "@/components/EmotionCheckIn";
import { TOOL_CARD_META } from "@/components/EditorialCard";
import { pauseBeforeTool, gates, guidedChoices, tools } from "@/lib/spiritContent";

const NEUTRAL = { tint: "#D6D1C6", wash: "#7C7263", blob: "54% 46% 52% 48% / 40% 62% 38% 60%" };

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

function nextInfo(path) {
  const id = path.startsWith("/tool/") ? path.slice(6) : null;
  if (!id || !tools[id]) return null;
  if (id === "nesheama") return { name: "כלי נשמ״ה", time: "04:00" };
  const meta = TOOL_CARD_META[id];
  const name = meta ? meta.line1 + (meta.line2 ? " " + meta.line2 : "") : tools[id].name;
  return { name, time: meta?.time || tools[id].duration };
}

export default function GuidedPause() {
  const navigate = useNavigate();
  const location = useLocation();
  const [target, setTarget] = useState(location.state?.target ?? null);
  const [emotionId] = useState(
    () => location.state?.emotionId ?? sessionStorage.getItem("sl_guided_emotion") ?? null
  );

  useEffect(() => {
    if (target) return;
    const raw = sessionStorage.getItem("sl_guided_target");
    if (raw) setTarget(JSON.parse(raw));
  }, [target]);

  const choice = guidedChoices.find((c) => c.id === emotionId);
  const look = choice ? { tint: choice.tint, wash: choice.wash, blob: choice.blob } : NEUTRAL;
  const path = resolveTarget(target);
  const next = nextInfo(path);
  const [titleA, titleB] = pauseBeforeTool.title.split(/,\s*/);

  return (
    <main dir="rtl" lang="he" className="rise-in min-h-[100dvh] max-w-[430px] mx-auto flex flex-col bg-[#E4E1D9]">
      <div className="flex items-center justify-between px-6 pt-4">
        {choice ? (
          <div className="flex items-center gap-2 h-[38px] pr-3 pl-3.5 rounded-full" style={{ backgroundColor: choice.tint }}>
            <i className="block w-3 h-3" style={{ backgroundColor: choice.wash, borderRadius: choice.blob }} />
            <span className="text-[13px] font-semibold text-[#16161A]/80 whitespace-nowrap">הרגשת {choice.label}</span>
          </div>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="סגירה"
          className="press grid place-items-center w-[38px] h-[38px] rounded-full bg-[#16161A]/[0.06] text-[#16161A]"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </div>

      <PauseHero {...look} rotation={choice?.rotation} Icon={choice ? EMOTION_ICONS[choice.id] : undefined} />

      <div className="flex-1 px-6 pt-1.5 text-right">
        <h1 className="mb-5 text-[34px] font-bold leading-[1.15] text-[#16161A]">
          {titleB ? (
            <>
              <span className="block text-[#16161A]/30">{titleA},</span>
              <span className="block">{titleB}</span>
            </>
          ) : (
            pauseBeforeTool.title
          )}
        </h1>
        {pauseBeforeTool.lines.map((line, i) => (
          <p key={i} className="mb-2.5 text-[17px] leading-[1.7] text-[#55554F]">{line}</p>
        ))}
      </div>

      <div className="px-6 pt-4 pb-10">
        {next && (
          <div className="flex items-center gap-3 py-3.5 mb-3.5 border-t border-[#16161A]/[0.14]">
            <small className="text-[12px] text-[#6B6A63]">אחר כך</small>
            <b className="flex-1 min-w-0 text-[15px] font-semibold text-[#16161A]">{next.name}</b>
            <span className="text-[13px] text-[#6B6A63] tabular-nums">{next.time}</span>
          </div>
        )}
        <button
          type="button"
          onClick={() => navigate(path)}
          className="press flex items-center justify-center w-full min-h-[58px] rounded-full bg-[#16161A] text-[#F8F7F4] text-[16px] font-semibold"
        >
          {pauseBeforeTool.button}
        </button>
        <button
          type="button"
          onClick={() => navigate("/tools")}
          className="block w-full mt-1.5 min-h-[48px] text-[14px] text-[#55554F] underline underline-offset-4"
        >
          לבחור תרגול אחר
        </button>
      </div>
    </main>
  );
}