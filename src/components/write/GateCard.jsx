import React from "react";
import { Check } from "lucide-react";

export default function GateCard({ gate, selected, onToggle }) {
  const { Icon } = gate;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`w-full flex items-start gap-4 p-5 rounded-[26px] text-right transition-all active:scale-[0.99] ${
        selected ? "bg-[#DAD5C9] ring-2 ring-[#16161A]" : "bg-[#E3DFD6]"
      }`}
    >
      <span className="w-12 h-14 shrink-0 rounded-t-full rounded-b-2xl bg-[#EBDDB8] text-[#7A5A1E] grid place-items-center">
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[19px] font-bold text-[#16161A]">{gate.title}</span>
        <span className="block mt-0.5 text-[15px] text-[#4A4943]">{gate.subtitle}</span>
        {gate.tags && <span className="block mt-2 text-[13.5px] leading-[1.7] text-[#7E7B73]">{gate.tags}</span>}
      </span>
      <span className={`w-8 h-8 shrink-0 rounded-full grid place-items-center ${selected ? "bg-[#16161A] text-white" : "border-2 border-[#B5B2A9]"}`}>
        {selected && <Check className="w-4 h-4" strokeWidth={2.5} />}
      </span>
    </button>
  );
}