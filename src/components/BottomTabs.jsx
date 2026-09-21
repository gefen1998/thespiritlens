import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";
import { CircleDot, LayoutGrid, BookOpen } from "lucide-react";
import { editorial } from "@/lib/spiritContent";

const TABS = [
  { to: "/", label: editorial.tabs.home, icon: CircleDot, end: true },
  { to: "/tools", label: editorial.tabs.library, icon: LayoutGrid },
  { to: "/book", label: editorial.tabs.book, icon: BookOpen },
];

export default function BottomTabs() {
  const location = useLocation();

  return (
    <div
      dir="rtl"
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-center pb-5 pt-3 pointer-events-none"
    >
      <LayoutGroup id="bottom-tabs">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#F8F7F4]/95 backdrop-blur-md border border-[#DDDAD1] shadow-[0_6px_24px_-6px_rgba(22,22,26,0.18)] pointer-events-auto">
          {TABS.map((tab) => {
            const isActive = tab.end
              ? location.pathname === tab.to
              : location.pathname.startsWith(tab.to);

            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                className="relative flex items-center justify-center h-11 select-none focus:outline-none"
              >
                {/* Background Pill */}
                {isActive ? (
                  <motion.div
                    layoutId="active-tab-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 bg-[#16161A] rounded-full shadow-[0_2px_8px_rgba(22,22,26,0.22)]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#E7E5DF] hover:bg-[#DDDAD1] transition-colors rounded-full" />
                )}

                {/* Content */}
                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                    mass: 0.8,
                  }}
                  className={`relative z-10 flex items-center justify-center h-11 ${
                    isActive
                      ? "text-[#F8F7F4] px-5 gap-2 font-medium"
                      : "text-[#4A4943] w-11"
                  }`}
                >
                  <tab.icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="text-sm font-semibold whitespace-nowrap"
                    >
                      {tab.label}
                    </motion.span>
                  )}
                </motion.div>
              </NavLink>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}