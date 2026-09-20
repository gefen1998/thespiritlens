import React from "react";
import { useNavigate } from "react-router-dom";
import BottomTabs from "@/components/BottomTabs";
import { editorial, tools, site, letterTone } from "@/lib/spiritContent";

const PAGES = [41, 68, 96, 124];

export default function Book() {
  const navigate = useNavigate();
  const chapters = tools.nesheama.steps;

  return (
    <div dir="rtl" lang="he" className="min-h-screen">
      <div className="max-w-xl mx-auto px-6 pt-14 pb-32">
        <h1 className="t-display text-foreground">
          <span className="block text-foreground/40">{editorial.book.headline[0]}</span>
          <span className="block">{editorial.book.headline[1]}</span>
        </h1>
        <p className="mt-3.5 max-w-[15rem] t-small text-muted-foreground">{editorial.book.note}</p>

        <div className="mt-7">
          {chapters.map((c, i) => {
            const tone = letterTone[c.letter] ?? "open";
            const pigment = `var(--pigment-${tone})`;
            return (
              <button
                key={c.letter}
                onClick={() => navigate("/tool/nesheama")}
                className="press flex w-full items-end gap-3.5 py-4.5 text-right border-t border-border first:border-t-0"
              >
                <span
                  className="grid place-items-center w-12 h-12 shrink-0 font-serif text-2xl text-white"
                  style={{ backgroundColor: `hsl(${pigment} / 0.9)`, borderRadius: `var(--form-${tone})` }}
                >
                  {c.letter}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block t-row text-foreground">{c.title}</span>
                  <span className="block t-small text-muted-foreground tabular-nums">עמוד {PAGES[i]}</span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-7 pt-5 border-t border-border t-small text-muted-foreground leading-relaxed">
          {site.footerCredit}
        </p>
      </div>

      <BottomTabs />
    </div>
  );
}
