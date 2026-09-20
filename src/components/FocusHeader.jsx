import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

// The header for any screen stepped into from the shell (a practice, the
// pause beat, safety) — a kicker + big editorial title on one side, a close
// button back to wherever the shell left off on the other. Replaces the old
// back-chevron/home-icon header now that home/library/book carry their own
// bottom tabs instead of a back-stack.
export default function FocusHeader({ kicker, title, to, actions }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-start justify-between gap-4 px-6 pt-14">
      <h1 className="t-title text-foreground">
        {kicker && <span className="block text-foreground/40 t-small font-normal mb-0.5">{kicker}</span>}
        <span className="block">{title}</span>
      </h1>
      <div className="flex items-center gap-2 mt-1 shrink-0">
        {actions}
        <button
          onClick={() => (to ? navigate(to) : navigate(-1))}
          aria-label="סגור"
          className="press grid place-items-center w-10 h-10 rounded-full bg-secondary text-foreground"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}