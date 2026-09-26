import React, { useState } from "react";
import { Save, ChevronDown, Download, Copy, Check } from "lucide-react";

function buildText(formData) {
  return [
    formData.anchor && `המשפט שמלווה אותי: ${formData.anchor}`,
    "הסיפור שלי",
    formData.story || "",
  ].filter(Boolean).join("\n\n");
}

export default function PersonalBackup({ formData }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const download = () => {
    const blob = new Blob([buildText(formData)], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `הסיפור-שלי-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(buildText(formData));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mt-5 rounded-[22px] bg-[#FBFAF7] border border-[#E3D6B8] text-right">
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full flex items-center gap-3 p-4">
        <span className="w-10 h-10 shrink-0 rounded-[12px] bg-[#E8D9B5] text-[#7A5A1E] grid place-items-center">
          <Save className="w-5 h-5" strokeWidth={1.8} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[16px] font-bold text-[#16161A]">גיבוי אישי</span>
          <span className="block text-[13.5px] text-[#6B6A63]">הורד עותק של הסיפור שלך בכל עת</span>
        </span>
        <ChevronDown className={`w-5 h-5 text-[#6B6A63] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={download} className="h-11 rounded-full bg-[#16161A] text-white text-[14px] font-bold flex items-center justify-center gap-1.5">
            <Download className="w-4 h-4" /> הורדת קובץ
          </button>
          <button type="button" onClick={copy} className="h-11 rounded-full bg-[#E3DFD6] text-[#16161A] text-[14px] font-bold flex items-center justify-center gap-1.5">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "הועתק" : "העתקה"}
          </button>
        </div>
      )}
    </div>
  );
}