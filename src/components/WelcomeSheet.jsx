import React from "react";
import { X, Wind, LayoutGrid, BookOpen, Lock } from "lucide-react";
import ActionButton from "@/components/ActionButton";

const POINTS = [
  { icon: Wind, title: "רגע של נשימה", text: "בוחרים תחושה, ומקבלים תרגול קצר שמתאים לה." },
  { icon: LayoutGrid, title: "אוסף הכלים", text: "תשעה תרגולים קצרים, בין דקה לחמש דקות." },
  { icon: BookOpen, title: "ארבעה שערים", text: "המעבר מהספר לאפליקציה — שער אחד בכל פעם." },
  { icon: Lock, title: "נשאר אצלכם", text: "מה שנכתב כאן נשמר במכשיר בלבד, ללא הרשמה." },
];

export default function WelcomeSheet({ onClose }) {
  return (
    <div dir="rtl" lang="he" className="fixed inset-0 z-50 flex items-end justify-center bg-[#16161A]/45 px-4 pb-4">
      <div className="sheet-rise w-full max-w-md rounded-[24px] bg-[#F8F7F4] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div className="text-right">
            <p className="text-[12px] font-medium text-[#6B6A63]">ברוכים הבאים</p>
            <h2 className="mt-1 text-[24px] font-bold leading-tight text-[#16161A]">
              מהספר אל הרגע
              <br />
              שאתם נמצאים בו
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

        <p className="mt-3 text-[13.5px] leading-relaxed text-[#6B6A63] text-right">
          זה המשך של עדשת הרוח — לא מקום לקרוא בו עוד, אלא מקום לעצור בו לרגע.
        </p>

        <div className="mt-5 space-y-3.5">
          {POINTS.map((p) => (
            <div key={p.title} className="flex items-start gap-3 text-right">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E7E5DF] text-[#6B6A63]">
                <p.icon className="h-[17px] w-[17px]" strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-[14.5px] font-bold leading-tight text-[#16161A]">{p.title}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-[#6B6A63]">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <ActionButton onClick={onClose} className="w-full justify-center">
            נתחיל בנשימה אחת
          </ActionButton>
        </div>
      </div>
    </div>
  );
}