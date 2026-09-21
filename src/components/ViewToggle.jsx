import React from "react";
import { List, LayoutGrid } from "lucide-react";

const OPTIONS = [
  { id: "list", label: "רשימה", icon: List },
  { id: "grid", label: "אריחים", icon: LayoutGrid },
];

export default function ViewToggle({ value, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#E7E5DF] p-1">
      {OPTIONS.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            aria-label={o.label}
            aria-pressed={active}
            className={`press grid place-items-center w-9 h-9 rounded-full transition-colors ${
              active ? "bg-[#16161A] text-[#F1F0EC]" : "text-[#6B6A63] hover:text-[#16161A]"
            }`}
          >
            <o.icon className="w-[17px] h-[17px]" strokeWidth={1.8} />
          </button>
        );
      })}
    </div>
  );
}