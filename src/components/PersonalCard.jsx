import React, { useRef, useState } from "react";
import { Download, Image as ImageIcon, FileText, Trash2, RefreshCw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// כרטיס אישי מעוצב שאפשר לשמור כתמונה או כ-PDF.
// fields: [{ label, value }] — מוצגים בכרטיס.
export default function PersonalCard({ fields, closing, actions = true, onReset, storageKey }) {
  const cardRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const hasContent = fields.some((f) => f.value && f.value.trim());

  const capture = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#faf7f2",
      scale: 2,
      useCORS: true,
    });
    return canvas;
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
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
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
    <div className="flex-1 flex flex-col fade-in">
      <div ref={cardRef} className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-[0_10px_60px_-20px_rgba(107,122,130,0.25)]">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-gold-soft flex items-center justify-center mb-4">
            <span className="font-display text-2xl text-gold/80">ע״ר</span>
          </div>
          <p className="font-display text-sm tracking-widest text-muted-foreground">עדשת הרוח</p>
        </div>

        <div className="space-y-6">
          {fields.map((f, i) => (
            <div key={i} className="text-center">
              <p className="text-xs tracking-wide text-muted-foreground mb-1.5">{f.label}</p>
              <p className="font-display text-xl leading-relaxed text-foreground whitespace-pre-wrap break-words">
                {f.value && f.value.trim() ? f.value : "—"}
              </p>
            </div>
          ))}
        </div>

        {closing && (
          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="font-body text-base leading-relaxed text-muted-foreground">{closing}</p>
          </div>
        )}
      </div>

      {actions && (
        <div className="mt-8 space-y-4">
          <p className="text-xs text-center text-muted-foreground/80">
            הכרטיס ייווצר אצלכם בלבד — כתמונה או כקובץ. שום תוכן אינו נשמר אצלנו.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={saveImage}
              disabled={busy}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 py-4 text-foreground hover:border-gold/40 hover:bg-secondary/40 transition disabled:opacity-50"
            >
              <ImageIcon className="w-5 h-5 text-gold/70" />
              <span className="text-base">הורדה כתמונה</span>
            </button>
            <button
              onClick={savePdf}
              disabled={busy}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 py-4 text-foreground hover:border-gold/40 hover:bg-secondary/40 transition disabled:opacity-50"
            >
              <FileText className="w-5 h-5 text-gold/70" />
              <span className="text-base">הורדה כ-PDF</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={clearContent}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">מחיקת התוכן שלי</span>
            </button>
            <button
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-foreground border border-border bg-card hover:border-gold/40 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">התחלה חדשה</span>
            </button>
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-foreground border border-border bg-card hover:border-gold/40 transition"
            >
              <span className="text-sm">חזרה למרחב</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}