import React, { useState, useEffect } from "react";
import { Save, Check } from "lucide-react";

export default function DraftSaveButton({ onSave }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 2200);
    return () => clearTimeout(t);
  }, [saved]);

  return (
    <button
      type="button"
      onClick={() => {
        onSave();
        setSaved(true);
      }}
      className="mb-3 mx-auto flex items-center gap-2 h-10 px-4 rounded-full text-[14px] font-medium text-[#4A4943] hover:bg-[#E3DFD6] transition-colors"
    >
      {saved ? <Check className="w-4 h-4 text-[#B0654A]" strokeWidth={2.25} /> : <Save className="w-4 h-4" strokeWidth={1.75} />}
      <span>{saved ? "הטיוטה נשמרה ב״רגעים ששמרתי״" : "שמירת טיוטה"}</span>
    </button>
  );
}