import React from "react";
import { Check } from "lucide-react";
import { CornerWingMotif } from "@/components/SpiritWings";

export default function GateCard({ gate, selected, onToggle }) {
  const { Icon } = gate;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`relative overflow-hidden w-full flex items-start gap-3 px-4 py-3.5 rounded-[22px] text-right transition-colors active:scale-[0.99] ${
        selected ? "bg-[#E8D9B5]" : "bg-[#E3DFD6]"
      }`}
    >
      {selected && <CornerWingMotif className="left-0 top-4 w-16 h-28" color="#C9A868" opacity={0.45} />}
      <span
        className={`relative w-11 h-12 shrink-0 rounded-t-full rounded-b-xl grid place-items-center ${
          selected ? "bg-[#B08A3E] text-[#FBFAF7]" : "bg-[#EBDDB8] text-[#7A5A1E]"
        }`}
      >
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
      </span>
      <span className="relative flex-1 min-w-0">
        <span className="block text-[18px] font-bold leading-tight text-[#16161A]">{gate.title}</span>
        <span className="block mt-0.5 text-[14.5px] text-[#4A4943]">{gate.subtitle}</span>
        {gate.tags && <span className="block mt-1.5 text-[13px] leading-[1.6] text-[#7E7B73]">{gate.tags}</span>}
      </span>
      <span
        className={`relative w-7 h-7 shrink-0 rounded-full grid place-items-center ${
          selected ? "bg-[#16161A] text-white" : "border-2 border-[#B5B2A9]"
        }`}
      >
        {selected && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
      </span>
    </button>
  );
}