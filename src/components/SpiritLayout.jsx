import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { site, safetyContent } from "@/lib/spiritContent";
import { cn } from "@/lib/utils";

// פריסה גלובלית בסגנון Apple: ניווט זכוכיתי דקיק, תוכן נושם, פוטר שקט.
// theme: "light" | "ink" — קובע את צבע הניווט מעל הקטע העליון.
// bleed: כשדולק, התוכן מקבל רוחב מלא והדף מנהל את הריווח בעצמו.
export default function SpiritLayout({
  children,
  showBack = true,
  hideNav = false,
  theme = "light",
  bleed = false,
  footer = true,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "he");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";
  const onInk = theme === "ink" && !scrolled;

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        theme === "ink" ? "bg-ink" : "bg-background"
      )}
      dir="rtl"
      lang="he"
    >
      {!hideNav && (
        <header
          className={cn(
            "sticky top-0 z-50 transition-all duration-500 ease-apple",
            onInk ? "glass-ink" : "glass-light",
            scrolled && "border-b border-border/60"
          )}
        >
          <nav className="max-w-[1024px] mx-auto px-5 h-11 flex items-center justify-between">
            <div className="flex items-center gap-1 min-w-0">
              {showBack && !isHome ? (
                <button
                  onClick={() => navigate(-1)}
                  className={cn(
                    "flex items-center gap-0.5 -mr-1 px-1 py-1 rounded-md text-[13px] transition-colors duration-300",
                    onInk
                      ? "text-on-ink-muted hover:text-on-ink"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ChevronRight className="w-4 h-4" />
                  חזרה
                </button>
              ) : (
                <span className="w-px" />
              )}
            </div>

            <Link
              to="/"
              className={cn(
                "text-[15px] font-medium tracking-tight transition-colors duration-300",
                onInk ? "text-on-ink" : "text-foreground"
              )}
              style={{ letterSpacing: "-0.02em" }}
            >
              {site.title}
            </Link>

            <Link
              to="/safety"
              className={cn(
                "text-[13px] transition-colors duration-300",
                onInk
                  ? "text-on-ink-muted hover:text-on-ink"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {safetyContent?.link || "עזרה"}
            </Link>
          </nav>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        {bleed ? (
          children
        ) : (
          <div className="max-w-[720px] w-full mx-auto px-5 py-14 sm:py-20 flex-1 flex flex-col">
            {children}
          </div>
        )}
      </main>

      {footer && (
        <footer className={cn(theme === "ink" ? "bg-ink" : "bg-background")}>
          <div
            className={cn(
              "max-w-[1024px] mx-auto px-5 py-10",
              theme === "ink" ? "border-t border-white/10" : "hairline-t"
            )}
          >
            <div className="space-y-2 text-center sm:text-right">
              <p
                className={cn(
                  "text-[13px] leading-relaxed",
                  theme === "ink" ? "text-on-ink-muted" : "text-muted-foreground"
                )}
              >
                {site.footerCredit}
              </p>
              <p
                className={cn(
                  "text-[13px]",
                  theme === "ink" ? "text-on-ink-muted/70" : "text-muted-foreground/70"
                )}
              >
                {site.footerModel}
              </p>
              <p
                className={cn(
                  "text-[12px] pt-3",
                  theme === "ink" ? "text-on-ink-muted/50" : "text-muted-foreground/60"
                )}
              >
                {site.copyright}
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}