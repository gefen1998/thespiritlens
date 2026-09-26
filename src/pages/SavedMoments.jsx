import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Bookmark, Trash2, Copy, Check, Sparkles, PenLine, Heart, Compass } from "lucide-react";
import { getSavedMoments, deleteMoment, clearAllMoments } from "@/lib/savedMoments";
import { TOOL_CARD_META, getToolIcon } from "@/components/EditorialCard";

const FILTER_TABS = [
  { id: "all", label: "הכל" },
  { id: "tool", label: "תרגולים וכלים" },
  { id: "writing", label: "כתיבה בספר" },
];

function formatDate(isoString) {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    const now = new Date();
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    if (isToday) {
      return `היום, ${hours}:${minutes}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      d.getDate() === yesterday.getDate() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
      return `אתמול, ${hours}:${minutes}`;
    }

    const day = d.getDate();
    const months = [
      "בינואר",
      "בפברואר",
      "במרץ",
      "באפריל",
      "במאי",
      "ביוני",
      "ביולי",
      "באוגוסט",
      "בספטמבר",
      "באוקטובר",
      "בנובמבר",
      "בדצמבר",
    ];
    return `${day} ${months[d.getMonth()]}`;
  } catch {
    return "";
  }
}

export default function SavedMoments() {
  const navigate = useNavigate();
  const [moments, setMoments] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setMoments(getSavedMoments());
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const updated = deleteMoment(id);
    setMoments(updated);
  };

  const handleCopy = (text, id, e) => {
    e.stopPropagation();
    if (!text) return;
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const handleClearAll = () => {
    const updated = clearAllMoments();
    setMoments(updated);
    setConfirmClear(false);
  };

  const filteredMoments = moments.filter((m) => {
    if (activeTab === "all") return true;
    if (activeTab === "writing") return m.type === "writing" || m.toolId === "write-guide";
    if (activeTab === "tool") return m.type !== "writing" && m.toolId !== "write-guide";
    return true;
  });

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-[#F4F1EA] text-[#16161A] flex flex-col">
      <div className="max-w-md w-full mx-auto px-6 pt-6 pb-20 flex-1 flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            aria-label="חזרה"
            className="w-11 h-11 rounded-full bg-[#E7E5DF] hover:bg-[#D8D5CC] text-[#16161A] grid place-items-center transition-colors active:scale-95"
          >
            <ArrowRight className="w-5 h-5" strokeWidth={1.8} />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E5E1D7] text-[#6B6A63]">
              נשמר במכשירך בלבד
            </span>
          </div>
        </div>

        {/* Title area */}
        <div className="text-right mb-5">
          <h1 className="text-[32px] sm:text-[36px] font-bold text-[#16161A] leading-tight">
            רגעים ששמרתי
          </h1>
          <p className="mt-1 text-[14px] text-[#6B6A63] font-medium leading-relaxed">
            תובנות, מילים לדרך ורשומות כתיבה שיצרת לאורך התרגולים
          </p>
        </div>

        {/* Filter Pills */}
        {moments.length > 0 && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scroll-x-quiet">
            {FILTER_TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all shrink-0 ${
                    active
                      ? "bg-[#16161A] text-[#F8F7F4] shadow-sm"
                      : "bg-[#E6E2D8] text-[#55544E] hover:bg-[#DCD7CC]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* List of saved moments */}
        {filteredMoments.length > 0 ? (
          <div className="space-y-3.5 flex-1">
            {filteredMoments.map((item) => {
              const meta = TOOL_CARD_META[item.toolId];
              const Icon = meta?.icon || (item.type === "writing" ? PenLine : Bookmark);
              const pebbleBg = meta?.pebble || (item.type === "writing" ? "#B0654A" : "#6E8C63");
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-[24px] bg-[#FAF9F6] border border-[#DDD9CE] shadow-[0_2px_8px_rgba(22,22,26,0.04)] text-right transition-all"
                >
                  {/* Card Header: Icon + Tool Name + Date */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full grid place-items-center shrink-0"
                        style={{ backgroundColor: pebbleBg }}
                      >
                        <Icon className="w-4 h-4 text-white" strokeWidth={1.8} />
                      </div>
                      <div>
                        <span className="block text-[14px] font-bold text-[#16161A] leading-none">
                          {item.toolName}
                        </span>
                        <span className="block text-[11px] text-[#8C8B84] mt-1 tabular-nums">
                          {formatDate(item.date)}
                        </span>
                      </div>
                    </div>

                    {/* Actions: Copy & Delete */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleCopy(item.text, item.id, e)}
                        aria-label="העתק טקסט"
                        title="העתק"
                        className="w-8 h-8 rounded-full hover:bg-[#EBE7DF] text-[#6B6A63] grid place-items-center transition-colors"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-[#6E8C63]" strokeWidth={2.2} />
                        ) : (
                          <Copy className="w-4 h-4" strokeWidth={1.75} />
                        )}
                      </button>

                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        aria-label="מחיקה"
                        title="מחיקה"
                        className="w-8 h-8 rounded-full hover:bg-[#F2DFDD] text-[#8C8B84] hover:text-[#B0654A] grid place-items-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>

                  {/* Main text phrase */}
                  {item.text && (
                    <p className="text-[19px] sm:text-[21px] font-bold text-[#16161A] leading-snug whitespace-pre-line mt-2">
                      {item.text}
                    </p>
                  )}

                  {/* Extra details if writing guide */}
                  {item.details && (item.details.remember || item.details.story || item.details.lightSentence || item.details.anchor) && (
                    <div className="mt-3.5 pt-3 border-t border-[#EAE6DD] space-y-2 text-right">
                      {item.details.lightSentence && (
                        <div>
                          <span className="text-[11.5px] font-medium text-[#7C776D] block">המשפט שלי:</span>
                          <p className="text-[13.5px] text-[#3A3935] mt-0.5">{item.details.lightSentence}</p>
                        </div>
                      )}
                      {item.details.anchor && (
                        <div>
                          <span className="text-[11.5px] font-medium text-[#7C776D] block">מה שמחזק אותי:</span>
                          <p className="text-[13.5px] text-[#3A3935] mt-0.5">{item.details.anchor}</p>
                        </div>
                      )}
                      {item.details.remember && (
                        <div>
                          <span className="text-[11.5px] font-medium text-[#7C776D] block">
                            מה שחשוב לזכור:
                          </span>
                          <p className="text-[13.5px] text-[#3A3935] mt-0.5">
                            {item.details.remember}
                          </p>
                        </div>
                      )}
                      {item.details.story && (
                        <div>
                          <span className="text-[11.5px] font-medium text-[#7C776D] block">
                            הסיפור:
                          </span>
                          <p className="text-[13px] text-[#4F4E49] mt-0.5 line-clamp-3 leading-relaxed">
                            {item.details.story}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Clear All Option */}
            <div className="pt-6 text-center">
              {confirmClear ? (
                <div className="p-4 rounded-[20px] bg-[#EAE6DD] text-center space-y-2.5">
                  <p className="text-[13px] font-medium text-[#16161A]">
                    האם למחוק את כל הרגעים שנשמרו במכשיר?
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={handleClearAll}
                      className="px-4 py-2 rounded-full bg-[#B0654A] text-white text-[13px] font-bold active:scale-95 transition-all"
                    >
                      כן, למחוק הכל
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="px-4 py-2 rounded-full bg-[#DDD9D0] text-[#16161A] text-[13px] font-medium active:scale-95 transition-all"
                    >
                      ביטול
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClear(true)}
                  className="text-xs text-[#8C8B84] hover:text-[#B0654A] underline underline-offset-4 transition-colors"
                >
                  מחיקת כל הרגעים שנשמרו
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-[#E5E1D7] grid place-items-center text-[#7C776D] mb-4">
              <Bookmark className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <h2 className="text-[20px] font-bold text-[#16161A] mb-1.5">
              עדיין אין רגעים שמורים
            </h2>
            <p className="text-[14px] text-[#6B6A63] leading-relaxed max-w-xs mb-8">
              בסיום כל תרגול או כתיבה במדריך, המילים והכוונות שבחרת ימתינו לך כאן – שמורים באופן אישי במכשירך בלבד.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
              <Link
                to="/tools"
                className="w-full py-3.5 px-5 rounded-full bg-[#16161A] text-white font-bold text-[14.5px] hover:bg-[#2A2A33] active:scale-95 transition-all text-center"
              >
                לבחירת תרגול
              </Link>
              <Link
                to="/write"
                className="w-full py-3.5 px-5 rounded-full bg-[#B0654A] text-white font-bold text-[14.5px] hover:bg-[#A0553A] active:scale-95 transition-all text-center"
              >
                למדריך הכתיבה
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}