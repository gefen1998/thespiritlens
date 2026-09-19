import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/spiritContent";

export default function SpiritLayout({ children, hideNav = false, footer = true, progress = null }) {
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
        <header className="sticky top-0 z-30">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/92 to-transparent pointer-events-none" />
          <div className="relative max-w-xl mx-auto px-5 h-14 flex items-center justify-between gap-3">
            <div className="w-20 flex justify-start">
              {!isHome && (
                <button
                  onClick={() => navigate(-1)}
                  className="-mr-2 p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="חזרה אחורה"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            <Link
              to="/"
              className="font-display text-base font-medium text-foreground/60 hover:text-foreground/90 transition-colors"
            >
              {site.title}
            </Link>

            <div className="w-20 flex justify-end">
              <Link
                to="/safety"
                className="t-micro text-muted-foreground/85 hover:text-flame transition-colors"
              >
                עזרה
              </Link>
            </div>
          </div>

          {progress && (
            <div className="relative max-w-xl mx-auto px-5">
              <div className="h-px w-full bg-border/70">
                <div
                  className="h-px bg-flame/70 transition-all duration-500 ease-out"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </header>
      )}

      <main className="flex-1 flex flex-col">
        <div className="max-w-xl w-full mx-auto px-5 pt-4 pb-10 flex-1 flex flex-col">{children}</div>
      </main>

      {footer && (
        <footer className="max-w-xl w-full mx-auto px-5 pb-10 pt-4">
          <div className="hairline mb-5 opacity-60" />
          <p className="t-small text-muted-foreground/75 text-center">{site.footerCredit}</p>
          <p className="t-micro text-muted-foreground/55 text-center mt-1.5">{site.footerModel}</p>
          <p className="t-micro text-muted-foreground/40 text-center mt-1">{site.copyright}</p>
        </footer>
      )}
    </div>
  );
}
