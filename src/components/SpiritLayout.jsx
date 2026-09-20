import React, { useEffect } from "react";
import FocusHeader from "@/components/FocusHeader";
import { site } from "@/lib/spiritContent";

// The wrapper for secondary/focused screens (safety, the guided sub-flows,
// dev pages) that aren't part of the three-tab shell — a close-button header
// instead of the old back-chevron/home-icon bar, since there's no longer a
// back-stack to speak of once home/library/book each live under their own
// bottom tab.
export default function SpiritLayout({ children, hideNav = false, footer = true, title }) {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "he");
  }, []);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" lang="he">
      {!hideNav && <FocusHeader title={title || site.title} />}

      <main className="flex-1 flex flex-col">
        <div className="max-w-xl w-full mx-auto px-6 pt-8 pb-10 flex-1 flex flex-col">{children}</div>
      </main>

      {footer && (
        <footer className="max-w-xl w-full mx-auto px-6 pb-10 pt-4">
          <div className="hairline mb-5 opacity-60" />
          <p className="t-small text-muted-foreground/75 text-center">{site.footerCredit}</p>
          <p className="t-micro text-muted-foreground/55 text-center mt-1.5">{site.footerModel}</p>
          <p className="t-micro text-muted-foreground/40 text-center mt-1">{site.copyright}</p>
        </footer>
      )}
    </div>
  );
}
