import React, { useState } from "react";
import { Search } from "lucide-react";
import BottomTabs from "@/components/BottomTabs";
import EditorialCard from "@/components/EditorialCard";
import { editorial, gates, tools } from "@/lib/spiritContent";

export default function Tools() {
  const [query, setQuery] = useState("");
  const q = query.trim();

  const matches = (id) => {
    if (!q) return true;
    const t = tools[id];
    return t.name.includes(q) || t.description.includes(q);
  };

  const sections = gates
    .map((gate) => ({ gate, ids: gate.tools.filter(matches) }))
    .filter((s) => s.ids.length > 0);

  return (
    <div dir="rtl" lang="he" className="min-h-screen">
      <div className="max-w-xl mx-auto px-6 pt-14 pb-32">
        <h1 className="t-display text-foreground">
          <span className="block text-foreground/40">{editorial.library.headline[0]}</span>
          <span className="block">{editorial.library.headline[1]}</span>
        </h1>
        <p className="mt-3.5 max-w-[13rem] t-small text-muted-foreground">{editorial.library.note}</p>

        <label className="flex items-center gap-2.5 h-11 mt-5 px-3.5 rounded-full bg-secondary text-muted-foreground">
          <Search className="w-4 h-4" strokeWidth={1.75} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={editorial.library.search}
            className="flex-1 min-w-0 bg-transparent border-0 outline-none t-small text-foreground placeholder:text-muted-foreground"
          />
        </label>

        {sections.map(({ gate, ids }) => (
          <div key={gate.id} className="mt-8">
            <div className="flex items-baseline gap-2">
              <span className="t-title text-foreground">{gate.title}</span>
              <span className="t-title text-foreground/30">{ids.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 mt-3">
              {ids.map((id) => (
                <EditorialCard key={id} tool={tools[id]} tone={gate.tone} />
              ))}
            </div>
          </div>
        ))}

        {sections.length === 0 && <p className="mt-8 t-lead text-muted-foreground">{editorial.library.noResults}</p>}
      </div>

      <BottomTabs />
    </div>
  );
}
