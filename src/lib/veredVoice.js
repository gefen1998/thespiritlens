// Vered's recorded narration (Hebrew only), keyed by the exact step text.
const BASE = "https://base44.app/api/apps/6aa5ba6278746a9e6313ec62/files/mp/public/6aa5ba6278746a9e6313ec62/";

const FILES = {
  "נחזור, לרגע, אל מה שנוכח עכשיו.": "1b57ead91_vered-step-0.mp3",
  "שימו לב לחמישה דברים שאתם רואים עכשיו סביבכם. לאט.": "d7ad0f05f_vered-step-1.mp3",
  "עכשיו ארבעה דברים שאתם מרגישים במגע — הרצפה, הבגד, הכיסא.": "e8a5f4a4b_vered-step-2.mp3",
  "שלושה קולות שאתם שומעים, קרובים או רחוקים.": "856179472_vered-step-3.mp3",
  "שני ריחות, גם אם קלים מאוד.": "8fb88bf89_vered-step-4.mp3",
  "וטעם אחד, או תחושת הנשימה בפה. כל מה שנוכח.": "028826c30_vered-step-5.mp3",
  "הנכם כאן. הגוף והחושים איתכם.": "b7d2634ca_vered-step-6.mp3",
  "הניחו את כפות הרגליים על הקרקע, ביציבות.": "7e4bcbc7d_vered-step-7.mp3",
  "הרגישו את המגע של כף הרגל ברצפה. הקרקע נושאת אתכם.": "5237d019b_vered-step-8.mp3",
  "אם נוח, הניחו כף יד על הירך או על הבטן, והרגישו את המגע.": "3f5ab49aa_vered-step-9.mp3",
  "אינכם צריכים להחזיק את עצמכם. הקרקע מחזיקה.": "2653fd78e_vered-step-10.mp3",
  "קחו נשימה אחת, ודעו — יש לכם על מה לעמוד.": "d25f1de12_vered-step-11.mp3",
  "נעבור יחד, לאט, על חלקי הגוף. אין צורך לשנות דבר.": "ee1bb5fe7_vered-step-12.mp3",
  "נתחיל מכפות הרגליים. רק נשים לב אליהן.": "aa9c6d47c_vered-step-13.mp3",
  "עולים אל השוקיים והברכיים. מה שמורגש — מורגש.": "5771cadac_vered-step-14.mp3",
  "אל הבטן והגב. נשימה אל האזור הזה.": "2de2f979c_vered-step-15.mp3",
  "אל הכתפיים. אם יש מתח — נכיר בו, בלי להילחם בו.": "48efde4d1_vered-step-16.mp3",
  "אל הזרועות וכפות הידיים. אל הצוואר והלסת.": "8a64106f0_vered-step-17.mp3",
  "אל הפנים. נרפה מעט את מה שניתן להרפות.": "a8512ad8c_vered-step-18.mp3",
  "כל הגוף כאן. נח רגע, בתוך ההרגשה הזאת.": "e5d8babbc_vered-step-19.mp3",
  "לפני שנבחר מה לעשות, ניתן למחשבה מקום.": "76b7977ad_vered-step-20.mp3",
  "אפשר לכתוב את המחשבה כאן. אפשר גם לדלג ולא לכתוב.": "f6858cfa1_vered-step-21.mp3",
};

FILES["נחזור בעדינות אל הגוף, אל הנשימה ואל הרגע הזה. אין צורך לשנות דבר."] = "6685bd447_vered-n0-v3.mp3";
FILES["נשים לב למה שמתרחש בנו, בלי למהר לשנות אותו. רק נכיר במה שנוכח."] = "ef376c258_vered-n1-v3.mp3";
FILES["נשאל: מה נמצא בידי, ומה נכון לי לבחור עכשיו, ולו במעט?"] = "d55cdc0f3_vered-n2-v3.mp3";
FILES["נזהה דבר אחד שתומך בנו, ושאותו אנו מבקשים לקחת הלאה."] = "f4da7657c_vered-n3-v3.mp3";

// One shared element for the whole app: only one voice can ever play, and
// once unlocked by a tap, mobile browsers let it keep auto-playing later clips.
const audio = typeof Audio !== "undefined" ? new Audio() : null;
if (audio && typeof window !== "undefined") {
  const unlock = () => {
    if (!audio.src) { audio.muted = true; audio.play().catch(() => {}); audio.pause(); audio.muted = false; }
    window.removeEventListener("pointerdown", unlock, true);
  };
  window.addEventListener("pointerdown", unlock, true);
}

// Soft fade-in/out so clips never end with an abrupt digital "click".
const FADE = 0.15;
let raf = 0;
function tick() {
  if (!audio || audio.paused) return;
  const d = audio.duration || 0;
  const t = audio.currentTime;
  const v = Math.min(1, t / 0.08, d ? (d - t) / FADE : 1);
  audio.volume = Math.max(0, v);
  if (d && d - t < 0.03) { audio.pause(); return; }
  raf = requestAnimationFrame(tick);
}
audio?.addEventListener("play", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); });

export function stopVered() {
  if (!audio || audio.paused) return;
  cancelAnimationFrame(raf);
  const start = audio.volume;
  const t0 = performance.now();
  const fade = (now) => {
    const k = 1 - (now - t0) / 200;
    if (k <= 0 || audio.paused) { audio.pause(); return; }
    audio.volume = start * k;
    raf = requestAnimationFrame(fade);
  };
  raf = requestAnimationFrame(fade);
}

/** Plays a recorded clip by file name or full url. */
export function playClip(url) {
  if (!audio) return;
  cancelAnimationFrame(raf);
  audio.pause();
  audio.volume = 0;
  audio.src = url.startsWith("http") ? url : BASE + url;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

/** Plays Vered's recording for this text; returns false if none exists. */
export function playVered(text) {
  stopVered();
  const key = FILES[text] ? text : Object.keys(FILES).find((k) => text?.endsWith(k));
  if (!key) return false;
  playClip(FILES[key]);
  return true;
}