import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDot, LayoutGrid, BookOpen } from "lucide-react";
import { editorial } from "@/lib/spiritContent";

const TABS = [
  { to: "/", label: editorial.tabs.home, icon: CircleDot, end: true },
  { to: "/tools", label: editorial.tabs.library, icon: LayoutGrid },
  { to: "/book", label: editorial.tabs.book, icon: BookOpen },
];

// A soft "iOS-ish" ease — the pill grows and the label unfurls from the same
// curve, so the two never look like two separate animations.
const EASE = [0.32, 0.72, 0, 1];

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
            className="relative flex items-center justify-center h-11 rounded-full select-none pointer-events-auto"
          >
            {({ isActive }) => (
              <motion.div
                layout
                transition={{ duration: 0.42, ease: EASE }}
                className="relative flex items-center justify-center h-11 rounded-full overflow-hidden"
                style={{ paddingInline: isActive ? "1.25rem" : 0, width: isActive ? "auto" : "2.75rem" }}
              >
                {/* Resting chip and active chip cross-fade in place — no jump */}
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-[#16161A] shadow-[0_2px_8px_rgba(22,22,26,0.22)]"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                />
                {!isActive && (
                  <span className="absolute inset-0 rounded-full bg-[#E7E5DF] transition-colors duration-300" />
                )}

                <motion.span
                  animate={{ color: isActive ? "#F8F7F4" : "#4A4943" }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="relative z-10 flex items-center gap-2"
                >
                  <tab.icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.36, ease: EASE }}
                        className="text-sm font-semibold whitespace-nowrap overflow-hidden"
                      >
                        {tab.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}