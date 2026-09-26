import React from "react";
import { Lock } from "lucide-react";

export default function AnonymityNote() {
  return (
    <div className="mt-6 flex items-start gap-3 p-4 rounded-[20px] bg-[#E9E5DC] text-right">
      <div className="w-9 h-9 shrink-0 rounded-full bg-[#F4F1EA] text-[#B0654A] grid place-items-center">
        <Lock className="w-4 h-4" strokeWidth={2} />
      </div>
      <div>
        <p className="text-[15px] font-bold text-[#16161A]">הכתיבה אנונימית לחלוטין</p>
        <p className="mt-1 text-[13.5px] text-[#55544E] leading-relaxed">
          נשמרת רק במכשיר שלך, ב״רגעים ששמרתי״.
        </p>
      </div>
    </div>
  );
}