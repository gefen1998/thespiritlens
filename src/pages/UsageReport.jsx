import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import SpiritLayout from "@/components/SpiritLayout";
import { base44 } from "@/api/base44Client";
import { tools } from "@/lib/spiritContent";

const EXTRA = [{ id: "write-guide", name: "מדריך הכתיבה" }];

export default function UsageReport() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { rows: agg } = await base44.entities.ToolUsage.aggregate({ groupBy: "tool_id" });
      if (!alive) return;
      const counts = {};
      agg.forEach((r) => {
        counts[r.tool_id] = r.count;
      });
      const list = [...Object.values(tools).map((tl) => ({ id: tl.id, name: tl.name })), ...EXTRA].map((item) => ({
        ...item,
        count: counts[item.id] || 0,
      }));
      Object.keys(counts).forEach((id) => {
        if (!list.some((i) => i.id === id)) list.push({ id, name: id, count: counts[id] });
      });
      list.sort((a, b) => b.count - a.count);
      setRows(list);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const total = rows?.reduce((s, r) => s + r.count, 0) || 0;
  const max = Math.max(1, ...(rows?.map((r) => r.count) || [1]));

  return (
    <SpiritLayout>
      <div className="pt-2 pb-4">
        <h1 className="font-display text-2xl text-foreground leading-snug">מה עוזר למשתמשים</h1>
        <p className="mt-1 text-sm text-muted-foreground">מספר הפעמים שכל כלי או תרגול נפתחו</p>
      </div>

      {!rows ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-border bg-card/70 px-5 py-4 mb-6">
            <p className="text-sm text-muted-foreground">סה״כ פתיחות</p>
            <p className="text-3xl font-bold text-foreground tabular-nums mt-0.5">{total}</p>
          </div>

          <div className="space-y-3 fade-in">
            {rows.map((r) => (
              <div key={r.id} className="rounded-2xl border border-border bg-card/60 px-5 py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-body text-base text-foreground">{r.name}</p>
                  <span className="font-bold text-foreground tabular-nums">{r.count}</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gold/70"
                    style={{ width: `${Math.round((r.count / max) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </SpiritLayout>
  );
}