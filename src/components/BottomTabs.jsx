import React from "react";
import { NavLink } from "react-router-dom";
import { CircleDot, LayoutGrid, BookOpen } from "lucide-react";
import { editorial } from "@/lib/spiritContent";

const TABS = [
  { to: "/", label: editorial.tabs.home, icon: CircleDot, end: true },
  { to: "/tools", label: editorial.tabs.library, icon: LayoutGrid },
  { to: "/book", label: editorial.tabs.book, icon: BookOpen },
];

// A soft iOS-like easing so the pill grows and the label unfurls on one curve.
const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

export default function BottomTabs() {
  return (
    <div
      dir="rtl"
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-center pb-5 pt-3 pointer-events-none"
    >
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#F8F7F4]/95 backdrop-blur-md border border-[#DDDAD1] shadow-[0_6px_24px_-6px_rgba(22,22,26,0.18)] pointer-events-auto">
        {TABS.map((tab) => (
          <NavLink key={tab.to} to={tab.to} end={tab.end} aria-label={tab.label}>
            {({ isActive }) => (
              <div
                className={`relative flex items-center gap-2 h-11 rounded-full overflow-hidden select-none ${
                  isActive
                    ? "px-5 bg-[#16161A] text-[#F8F7F4] shadow-[0_2px_8px_rgba(22,22,26,0.22)]"
                    : "w-11 justify-center bg-[#E7E5DF] text-[#4A4943]"
                }`}
                style={{ transition: `background-color 320ms ${EASE}, color 320ms ${EASE}, padding 380ms ${EASE}, width 380ms ${EASE}` }}
              >
                <tab.icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
                <span
                  className="text-sm font-semibold whitespace-nowrap overflow-hidden"
                  style={{
                    maxWidth: isActive ? "8rem" : 0,
                    opacity: isActive ? 1 : 0,
                    transition: `max-width 380ms ${EASE}, opacity 260ms ${EASE}`,
                  }}
                >
                  {tab.label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}