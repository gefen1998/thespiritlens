import React from "react";
import { X } from "lucide-react";
import ActionButton from "@/components/ActionButton";

export default function WelcomeSheet({ onClose }) {
  return (
    <div dir="rtl" lang="he" className="fixed inset-0 z-50 flex items-end justify-center bg-[#16161A]/45 px-4 pb-4">
      <div className="sheet-rise w-full max-w-md max-h-[92vh] overflow-y-auto rounded-[24px] bg-[#F8F7F4] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div className="text-right">
            <p className="text-[12px] font-medium text-[#6B6A63]">ברוכים הבאים</p>
            <h2 className="mt-1 text-[24px] font-bold leading-tight text-[#16161A]">
              ברוכים הבאים
              <br />
              לעדשת הרוח
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="סגירה"
            className="press grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E7E5DF] text-[#16161A] transition-colors hover:bg-[#D8D5CC]"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-right">
          <p className="text-[15px] font-semibold leading-snug text-[#16161A]">
            מרחב דיגיטלי לחיזוק הנפש והרוח
          </p>
          <p className="text-[13.5px] leading-relaxed text-[#6B6A63]">
            כמה דקות לעצור, לנשום, ולהתחבר מחדש לעצמכם.
          </p>
          <p className="text-[13.5px] leading-relaxed text-[#6B6A63]">
            כאן תמצאו כלים קצרים ופשוטים לרוגע, ויסות, בהירות וחוסן.
            <br />
            לרגעים של עומס או דחק, וגם כתרגול יומיומי שמחזק מבפנים.
          </p>
          <p className="text-[13px] leading-relaxed text-[#46453F] font-medium">
            נשימה · נשמ״ה · דמיון מודרך · ניגונים · קלפים · כתיבה אישית
          </p>
          <p className="text-[13.5px] leading-relaxed text-[#6B6A63]">
            כלי אחד. כמה דקות. בקצב שלכם.
          </p>
          <p className="text-[15px] font-bold leading-snug text-[#16161A]">
            חוסן הוא שריר. אפשר לאמן אותו.
          </p>
        </div>

        <div className="mt-5 rounded-[16px] bg-[#EFEDE7] px-4 py-3 text-right">
          <p className="text-[12.5px] leading-relaxed text-[#6B6A63]">
            לתשומת לבכם: האפליקציה נמצאת בשלבי בנייה ותושלם עם יציאת הספר לחנויות הספרים.
          </p>
        </div>

        <div className="mt-5">
          <ActionButton onClick={onClose} className="w-full justify-center">
            התחילו עכשיו
          </ActionButton>
        </div>
      </div>
    </div>
  );
}