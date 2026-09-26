import React from "react";

export default function GatePersonalInput({ value, onChange }) {
  return (
    <div className="mx-3 -mt-2 pt-5 pb-3 px-3 rounded-b-[20px] bg-[#EFE6CF]">
      <input
        type="text"
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ספר על מה הסיפור שלך..."
        className="w-full h-12 px-4 rounded-full bg-[#FBFAF7] border-none text-[15px] text-[#16161A] placeholder:text-[#9C9A91] focus:outline-none focus:ring-2 focus:ring-[#B08A3E]/40 text-right"
      />
    </div>
  );
}