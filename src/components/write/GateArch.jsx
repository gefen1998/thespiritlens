import React from "react";

// Doorway-style arch: a double golden outline, open at the bottom, with the gate icon inside.
export default function GateArch({ Icon, selected }) {
  const stroke = selected ? "#7A5A1E" : "#B08A3E";
  return (
    <span className="relative w-12 h-12 shrink-0 grid place-items-center">
      <svg viewBox="0 0 48 48" fill="none" className="absolute inset-0 w-full h-full">
        {selected && <path d="M4 48 V22 A20 20 0 0 1 44 22 V48 Z" fill="#8A6724" />}
        <path d="M4 48 V22 A20 20 0 0 1 44 22 V48" stroke={stroke} strokeWidth="1.8" />
        <path d="M9 48 V23 A15 15 0 0 1 39 23 V48" stroke={selected ? "#E8D9B5" : stroke} strokeOpacity={selected ? 0.55 : 0.6} strokeWidth="1.2" />
      </svg>
      <Icon
        className={`relative mt-2 w-[18px] h-[18px] ${selected ? "text-[#FBFAF7]" : "text-[#9A7630]"}`}
        strokeWidth={1.75}
      />
    </span>
  );
}