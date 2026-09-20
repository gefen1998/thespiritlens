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
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-center gap-2.5 pb-6 pt-10 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none"
    >
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `press flex items-center justify-center transition-all duration-200 select-none ${
                isActive
                  ? "bg-foreground text-background px-5 h-12 rounded-full gap-2 font-medium shadow-sm ring-1 ring-foreground/70 ring-offset-2 ring-offset-background"
                  : "bg-secondary/80 text-foreground/75 hover:text-foreground w-12 h-12 rounded-full"
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