import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Home as HomeIcon, LifeBuoy } from "lucide-react";
import { site, safetyContent } from "@/lib/spiritContent";
import { cn } from "@/lib/utils";

export default function SpiritLayout({
  children,
  showBack = true,
  showHome = true,
  hideNav = false,
  fullBleed = false,
  navTone = "light",
}) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "he");
  }, []);

  const isHome = location.pathname === "/";
  const dark = navTone === "dark";

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl" lang="he">
      {!hideNav && (
        <header
          className={cn(
            "sticky top-0 z-40 border-b",
            dark ? "glass-dark border-white/10" : "glass border-black/[0.06]"
          )}
        >
          <div className="max-w-5xl mx-auto px-5 h-12 flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              {showBack && !isHome && (
                <button
                  onClick={() => navigate(-1)}
                  className={cn(
                    "p-2 -mr-2 rounded-full transition-colors",
                    dark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="חזרה אחורה"
                >
                  <ArrowRight className="w-[18px] h-[18px]" />
                </button>
              )}
              {showHome && !isHome && (
                <Link
                  to="/"
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    dark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="חזרה למרחב"
                >
                  <HomeIcon className="w-[18px] h-[18px]" />
                </Link>
              )}
            </div>
            <Link
              to="/"
              className={cn(
                "font-display text-[15px] font-bold tracking-app",
                dark ? "text-white" : "text-foreground"
              )}
            >
              {site.title}
            </Link>
            <Link
              to="/safety"
              className={cn(
                "flex items-center gap-1.5 text-xs transition-colors",
                dark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LifeBuoy className="w-4 h-4" />
              <span className="hidden sm:inline">{safetyContent.link}</span>
            </Link>
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        {fullBleed ? (
          children
        ) : (
          <div className="max-w-2xl w-full mx-auto px-5 py-10 flex-1 flex flex-col">{children}</div>
        )}
      </main>

      <footer className="bg-secondary/60 border-t border-black/[0.06]">
        <div className="max-w-5xl mx-auto px-5 py-10 space-y-1.5 text-center">
          <p className="font-display text-[13px] font-medium text-foreground/75 tracking-app">
            {site.footerCredit}
          </p>
          <p className="text-xs text-muted-foreground">{site.footerModel}</p>
          <p className="text-[11px] text-muted-foreground/60 pt-3">{site.copyright}</p>
        </div>
      </footer>
    </div>
  );
}