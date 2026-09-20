import React, { useRef, useState } from "react";
import { Image as ImageIcon, FileText, Trash2, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

// כרטיס אישי מעוצב שאפשר לשמור כתמונה או כ-PDF.
// A page set apart from the page — its own border and shadow, so it reads as
// the one thing worth keeping.
export default function PersonalCard({ fields, closing, actions = true, onReset, storageKey }) {
  const cardRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const capture = async () => {
    const html2canvas = (await import("html2canvas")).default;
    return html2canvas(cardRef.current, { backgroundColor: "#f8f3ea", scale: 2, useCORS: true });
  };

  const saveImage = async () => {
    setBusy(true);
    try {
      const canvas = await capture();
      const link = document.createElement("a");
      link.download = "adshat-haruach.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setBusy(false);
    }
  };

  const savePdf = async () => {
    setBusy(true);
    try {
      const canvas = await capture();
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("adshat-haruach.pdf");
    } finally {
      setBusy(false);
    }
  };

  const clearContent = () => {
    if (storageKey) {
      try { sessionStorage.removeItem(storageKey); } catch {}
    }
    if (onReset) onReset();
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-6 fade-in">
      <div
        ref={cardRef}
        className="rounded-[2px] px-8 py-12 sm:px-12 border shadow-[0_20px_50px_-24px_rgba(30,20,10,0.35)]"
        style={{
          backgroundColor: "hsl(var(--paper))",
          color: "hsl(var(--paper-ink))",
          borderColor: "hsl(var(--paper-ink) / 0.14)",
        }}
      >
        <div className="text-center">
          <p className="font-display text-sm font-medium" style={{ color: "hsl(var(--paper-ink) / 0.5)" }}>
            עדשת הרוח
          </p>
          <div className="mx-auto mt-5 h-px w-10" style={{ backgroundColor: "hsl(38 40% 45% / 0.4)" }} />
        </div>

        <div className="mt-12 space-y-10">
          {fields.map((f, i) => (
            <div key={i} className="text-center">
              <p className="font-body text-xs font-medium" style={{ color: "hsl(var(--paper-ink) / 0.55)" }}>
                {f.label}
              </p>
              <p className="mt-3 font-serif text-2xl font-medium leading-relaxed whitespace-pre-wrap break-words">
                {f.value && f.value.trim() ? f.value : "—"}
              </p>
            </div>
          ))}
        </div>

        {closing && (
          <p
            className="mt-12 pt-8 font-body text-base leading-relaxed text-center"
            style={{ borderTop: "1px solid hsl(var(--paper-ink) / 0.14)", color: "hsl(var(--paper-ink) / 0.72)" }}
          >
            {closing}
          </p>
        )}
      </div>

      {actions && (
        <div className="mt-10">
          <p className="t-micro text-center text-muted-foreground/60">
            הכרטיס נוצר אצלכם בלבד. שום תוכן אינו נשמר אצלנו.
          </p>

          <div className="mt-6 flex items-center justify-center gap-8">
            <button
              onClick={saveImage}
              disabled={busy}
              className="flex items-center gap-2 t-small text-foreground/90 hover:text-flame transition-colors disabled:opacity-40"
            >
              <ImageIcon className="w-4 h-4" />
              שמירה כתמונה
            </button>
            <button
              onClick={savePdf}
              disabled={busy}
              className="flex items-center gap-2 t-small text-foreground/90 hover:text-flame transition-colors disabled:opacity-40"
            >
              <FileText className="w-4 h-4" />
              שמירה כ־PDF
            </button>
          </div>

          <div className="mt-10 hairline opacity-60" />

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={clearContent}
              className="flex items-center gap-2 t-small text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              מחיקת התוכן שלי
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-2 t-small text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              התחלה חדשה
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="t-small text-muted-foreground/85 hover:text-flame transition-colors">
              חזרה למרחב
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
