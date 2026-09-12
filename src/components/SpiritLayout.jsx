import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Home, LifeBuoy } from "lucide-react";
import { site, safetyContent } from "@/lib/spiritContent";

export default function SpiritLayout({ children, showBack = true, showHome = true, hideNav = false }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "he");
  }, []);

  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" lang="he">
      {!hideNav && (
        <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/40">
          <div className="max-w-2xl mx-auto px-5 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showBack && !isHome && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 -mr-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                  aria-label="חזרה אחורה"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
              {showHome && !isHome && (
                <Link
                  to="/"
                  className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                  aria-label="חזרה למרחב"
                >
                  <Home className="w-5 h-5" />
                </Link>
              )}
            </div>
            <Link to="/" className="font-display text-lg tracking-wide text-foreground/80 hover:text-foreground transition-colors">
              עדשת הרוח
            </Link>
            <Link
              to="/safety"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <LifeBuoy className="w-4 h-4" />
              <span className="hidden sm:inline">{safetyContent.link}</span>
              <span className="sm:hidden">עזרה</span>
            </Link>
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        <div className="max-w-2xl w-full mx-auto px-5 py-8 flex-1 flex flex-col">{children}</div>
      </main>

      <footer className="border-t border-border/40 bg-background/50">
        <div className="max-w-2xl mx-auto px-5 py-8 text-center space-y-1.5">
          <p className="font-display text-sm text-foreground/80">{site.footerCredit}</p>
          <p className="text-xs text-muted-foreground">{site.footerModel}</p>
          <p className="text-xs text-muted-foreground/70 pt-2">{site.copyright}</p>
        </div>
      </footer>
    </div>
  );
}