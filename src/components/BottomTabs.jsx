import React from "react";
import { NavLink } from "react-router-dom";
import { CircleDot, LayoutGrid, BookOpen } from "lucide-react";
import { editorial } from "@/lib/spiritContent";

const TABS = [
  { to: "/", label: editorial.tabs.home, icon: CircleDot, end: true },
  { to: "/tools", label: editorial.tabs.library, icon: LayoutGrid },
  { to: "/book", label: editorial.tabs.book, icon: BookOpen },
];

// Pill tab bar — the shell screens (home/library/book) live under this
// instead of a header + back-stack; a close-button header takes over only
// once you step into a practice.
export default function BottomTabs() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center gap-2 pb-6 pt-10 bg-gradient-to-t from-background via-background/95 to-transparent">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `press flex items-center gap-2 rounded-full px-4 py-3 min-h-12 transition-colors ${
              isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <tab.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
              {isActive && <span className="t-small font-semibold">{tab.label}</span>}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
