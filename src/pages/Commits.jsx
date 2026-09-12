import React, { useState } from "react";
import { GitCommit, Search, Loader2, ExternalLink } from "lucide-react";
import SpiritLayout from "@/components/SpiritLayout";
import { base44 } from "@/api/base44Client";

export default function Commits() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [commits, setCommits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCommits = async (e) => {
    e?.preventDefault();
    if (!owner.trim() || !repo.trim()) return;
    setLoading(true);
    setError("");
    setCommits(null);
    try {
      const res = await base44.functions.invoke("githubCommits", {
        owner: owner.trim(),
        repo: repo.trim(),
        per_page: 20,
      });
      if (res.data?.error) {
        setError(res.data.details || res.data.error);
      } else {
        setCommits(res.data);
      }
    } catch (err) {
      setError(err.message || "שגיאה בלא ניתן לטעון את היסטוריית הקומיטים");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleString("he-IL", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <SpiritLayout>
      <div className="pt-2 pb-4">
        <h1 className="font-display text-2xl text-foreground leading-snug">היסטוריית קומיטים</h1>
        <p className="mt-1 text-sm text-muted-foreground">מעקב אחר גרסאות הפרויקט ב-GitHub</p>
      </div>

      <form onSubmit={fetchCommits} className="space-y-3 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="בעלים (owner)"
            className="w-full rounded-2xl border border-border bg-card/70 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 transition"
          />
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="מאגר (repo)"
            className="w-full rounded-2xl border border-border bg-card/70 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !owner.trim() || !repo.trim()}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-base font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          <span>{loading ? "טוען…" : "הצגת היסטוריה"}</span>
        </button>
      </form>

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4 mb-6">
          <p className="text-sm text-destructive leading-relaxed break-words">{error}</p>
        </div>
      )}

      {commits && (
        <div className="space-y-3 fade-in">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">
              {commits.owner}/{commits.repo} · {commits.commits.length} קומיטים
            </p>
          </div>
          {commits.commits.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">אין קומיטים להצגה</p>
          ) : (
            commits.commits.map((c) => (
              <div
                key={c.sha}
                className="rounded-2xl border border-border bg-card/60 px-5 py-4 rise-in"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    <GitCommit className="w-5 h-5 text-gold/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm leading-relaxed text-foreground break-words whitespace-pre-wrap">
                      {c.message.split("\n")[0]}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      {c.authorAvatar && (
                        <img
                          src={c.authorAvatar}
                          alt={c.author}
                          className="w-5 h-5 rounded-full"
                          loading="lazy"
                        />
                      )}
                      <span className="truncate">{c.author}</span>
                      <span className="text-muted-foreground/50">·</span>
                      <span className="font-mono">{c.shortSha}</span>
                      <span className="text-muted-foreground/50">·</span>
                      <span className="truncate">{formatDate(c.date)}</span>
                    </div>
                  </div>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-muted-foreground hover:text-gold transition"
                      aria-label="פתיחה ב-GitHub"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </SpiritLayout>
  );
}