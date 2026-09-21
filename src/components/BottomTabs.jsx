import React from "react";
import { NavLink } from "react-router-dom";
import { CircleDot, LayoutGrid, BookOpen } from "lucide-react";
import { editorial } from "@/lib/spiritContent";

const TABS = [
  { to: "/", label: editorial.tabs.home, icon: CircleDot, end: true },
  { to: "/tools", label: editorial.tabs.library, icon: LayoutGrid },
  { to: "/book", label: editorial.tabs.book, icon: BookOpen },
];

export default function BottomTabs() {
  return (
    <div
      dir="rtl"
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-center pb-5 pt-3 pointer-events-none"
    >
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#F8F7F4]/95 backdrop-blur-md border border-[#DDDAD1] shadow-[0_6px_24px_-6px_rgba(22,22,26,0.18)] pointer-events-auto">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `press flex items-center justify-center transition-all duration-200 select-none ${
                isActive
                  ? "bg-[#16161A] text-[#F8F7F4] px-5 h-11 rounded-full gap-2 font-medium shadow-[0_2px_8px_rgba(22,22,26,0.22)]"
                  : "bg-[#E7E5DF] text-[#4A4943] hover:bg-[#DDDAD1] w-11 h-11 rounded-full"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <tab.icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
                {isActive && <span className="text-sm font-semibold whitespace-nowrap">{tab.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}