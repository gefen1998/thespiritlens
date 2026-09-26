// עדשת הרוח — תוכן מודולרי. כל הטקסטים נערכים מכאן.

export const site = {
  title: "עדשת הרוח",
  subtitle: "מרחב של נשימה, התבוננות ובחירה",
  welcome: "ברוכים הבאים.",
  intro:
    "לפעמים די ברגע אחד של עצירה כדי לפגוש את מה שעובר עלינו ולבחור כיצד נכון להיות איתו עכשיו.",
  intro2: "אפשר להיעזר במסלול קצר ומונחה, או לבחור בעצמכם כלי מתוך המרחב.",
  hint: "אין צורך לדעת מראש מה אתם מרגישים או מה יעזור. אפשר פשוט להתחיל.",
  footerCredit:
    "פותח על ידי הפסיכולוגית ורד עצמון משולם, ראש אגף החוסן בזק״א",
  footerModel: "מודל עדשת הרוח",
  copyright: "© כל הזכויות שמורות לורד עצמון משולם, פסיכולוגית וראש אגף החוסן בזק״א.",
};

export const guidedQuestion = "מה מבקש ממך תשומת לב עכשיו?";

export const checkIn = {
  question: "איך אתם, עכשיו?",
  hint: "אין תשובה נכונה או שגויה. בחרו את מה שקרוב למה שעובר עליכם.",
  browseLabel: "לעיין בכל הכלים ולבחור בעצמכם",
};

export const firstVisit = {
  title: "הגעתם לכאן מתוך הספר.",
  lines: [
    "עדשת הרוח היא המרחב המתורגל שלו — תרגולים קצרים שאפשר לעשות כאן, ברגע שבו אתם נמצאים.",
    "אין צורך לדעת מראש מה אתם מרגישים או מה יעזור. נתחיל בשאלה אחת.",
  ],
  button: "אני כאן",
};

export const guidedChoices = [
  {
    id: "calm",
    label: "רגוע",
    tone: "body",
    wash: "#6E8C63",
    tint: "#CFD8C6",
    blob: "44% 56% 62% 38% / 48% 52% 48% 52%",
    rotation: "-8deg",
    leadsTo: "רגע אחד של נשימה",
    target: { type: "tool", toolId: "nesheama" },
  },
  {
    id: "tired",
    label: "עייף",
    tone: "thought",
    wash: "#5A7387",
    tint: "#C7D2DC",
    blob: "38% 62% 54% 46% / 58% 42% 56% 44%",
    rotation: "12deg",
    leadsTo: "דבר קטן שיכול להזין עכשיו",
    target: { type: "flow", flow: "fatigue" },
  },
  {
    id: "stressed",
    label: "לחוץ",
    tone: "emotion",
    wash: "#B0654A",
    tint: "#E3CBBE",
    blob: "50% 50% 62% 38% / 42% 58% 45% 55%",
    rotation: "-14deg",
    leadsTo: "נשיפה, נוכחות וקרקוע",
    target: { type: "tool", toolId: "gentle-exhale" },
  },
  {
    id: "sad",
    label: "עצוב",
    tone: "memory",
    wash: "#4E5680",
    tint: "#C9CBDA",
    blob: "48% 52% 64% 36% / 42% 58% 46% 54%",
    rotation: "16deg",
    leadsTo: "לתת מקום לרגש, בלי למהר לפתור",
    target: { type: "flow", flow: "emotion" },
  },
  {
    id: "restless",
    label: "חסר מנוחה",
    tone: "fatigue",
    wash: "#7A5C7D",
    tint: "#D8CBD8",
    blob: "62% 38% 44% 56% / 46% 54% 46% 54%",
    rotation: "-18deg",
    leadsTo: "חזרה אל החושים וקרקוע",
    target: { type: "tool", toolId: "return-to-senses" },
  },
  {
    id: "heavy",
    label: "כבד",
    tone: "open",
    wash: "#7C7263",
    tint: "#D6D1C6",
    blob: "58% 42% 46% 54% / 54% 46% 54% 46%",
    rotation: "22deg",
    leadsTo: "מגע בקרקע והרפיית העומס",
    target: { type: "tool", toolId: "ground-touch" },
  },
  {
    id: "grateful",
    label: "אסיר תודה",
    tone: "spirit",
    wash: "#B08A3C",
    tint: "#E6D8B8",
    blob: "42% 58% 48% 52% / 56% 44% 58% 42%",
    rotation: "-10deg",
    leadsTo: "רגע של הודיה והכרת הטוב",
    target: { type: "tool", toolId: "gratitude-moment" },
  },
];

export const editorial = {
  tabs: { home: "היום", library: "כלים", book: "הספר" },
  home: {
    helloLine: "שלום.",
    headline: ["איך אתה", "מרגיש עכשיו?"],
    note: "אין תשובה נכונה, ואין צורך לדעת.\nאפשר גם לדלג ישר לרשימת התרגילים.",
    startHere: "להתחיל מכאן",
    quickTitle: "קצר ופשוט",
    allTools: "כל הכלים",
  },
  library: {
    headline: ["אוסף", "הכלים"],
    note: "תרגולים קצרים, לפי מה שנכון לכם עכשיו.",
    search: "חיפוש",
    noResults: "אין תרגול בשם הזה. אפשר לנקות את החיפוש ולעיין באוסף.",
  },
  book: {
    headline: ["ארבעה", "שערים"],
    note: "מודל נשמ״ה, כפי שהוא מופיע בספר. לכל שער עמוד משלו, ואפשר לכתוב בו בכתב יד.",
  },
};

export const pauseBeforeTool = {
  title: "לפני שנבחר מה לעשות, נעצור לרגע.",
  lines: [
    "הניחו, אם נוח, את כפות הרגליים על הקרקע.",
    "אין צורך לשנות דבר. רק לשים לב למה שקורה בכם עכשיו.",
  ],
  button: "אני כאן, אפשר להמשיך",
};

export const gates = [
  {
    id: "body",
    tone: "body",
    title: "להרגיע את הגוף",
    subtitle: "כלים של נשימה, נוכחות וקרקוע",
    tools: ["gentle-exhale", "return-to-senses", "ground-touch", "body-scan"],
  },
  {
    id: "thought",
    tone: "thought",
    title: "לפגוש מחשבה",
    subtitle: "להכיר במחשבה ולבחור איתה",
    tools: ["thought-meeting"],
  },
  {
    id: "emotion",
    tone: "emotion",
    title: "לתת מקום לרגש",
    subtitle: "להרגיש בעדינות, בלי למהר לפתור",
    tools: ["emotion-space"],
  },
  {
    id: "spirit",
    tone: "spirit",
    title: "לחזק את הרוח",
    subtitle: "חיבור למשאב, למשמעות ולטוב",
    tools: ["light-beam", "gratitude-moment", "word-for-path", "meaning-choice", "strengthening-memory", "anchoring"],
  },
];

export function toolTone(toolId) {
  return gates.find((gate) => gate.tools.includes(toolId))?.tone ?? "open";
}

// נשמ״ה isn't in any gate — its four steps carry their own tone per letter
// instead of one flat tone for the whole tool.
export const letterTone = { נ: "body", ש: "thought", מ: "memory", ה: "spirit" };

export const tools = {
  "gentle-exhale": {
    id: "gentle-exhale",
    name: "נשיפה שקטה",
    description: "תרגול קצר של דקה להארכת הנשיפה והרגעת הגוף",
    duration: "דקה",
    mode: "breath",
    steps: [
      { kind: "text", text: "ננשום יחד נשימה אחת, לאט." },
      { kind: "text", text: "שאפו בעדינות דרך האף, ככל שנוח לכם." },
      { kind: "text", text: "עכשיו, נשפו לאט דרך הפה, כאילו הנשיפה אורכת מעט מן השאיפה." },
      { kind: "text", text: "שוב. שאיפה רכה… ונשיפה ארוכה ושקטה." },
      { kind: "text", text: "עוד פעם אחת, בקצב שלכם. אין צורך להשתדל. רק לנשום." },
      { kind: "text", text: "הנשימה חזרה אליכם. קחו איתכם את השקט הזה." },
    ],
    ending: { kind: "phrase", options: [
      "עצרתי לרגע, וזה הספיק.",
      "הנשימה נשארה איתי.",
      "אפשר להמשיך ברכות.",
    ]},
  },
  "return-to-senses": {
    id: "return-to-senses",
    name: "חזרה אל החושים",
    description: "תרגול קרקוע קצר דרך החושים",
    duration: "שלוש דקות",
    steps: [
      { kind: "text", text: "נחזור, לרגע, אל מה שנוכח עכשיו." },
      { kind: "text", text: "שימו לב לחמישה דברים שאתם רואים עכשיו סביבכם. לאט." },
      { kind: "text", text: "עכשיו ארבעה דברים שאתם מרגישים במגע — הרצפה, הבגד, הכיסא." },
      { kind: "text", text: "שלושה קולות שאתם שומעים, קרובים או רחוקים." },
      { kind: "text", text: "שני ריחות, גם אם קלים מאוד." },
      { kind: "text", text: "וטעם אחד, או תחושת הנשימה בפה. כל מה שנוכח." },
      { kind: "text", text: "הנכם כאן. הגוף והחושים איתכם." },
    ],
    ending: { kind: "phrase", options: [
      "חזרתי אל הכאן והעכשיו.",
      "החושים החזירו אותי אל הגוף.",
      "אפשר להישאר רגע נוסף.",
    ]},
  },
  "ground-touch": {
    id: "ground-touch",
    name: "מגע בקרקע",
    description: "תרגול קצר להרגשת הקרקע מתחתיכם",
    duration: "דקה",
    steps: [
      { kind: "text", text: "הניחו את כפות הרגליים על הקרקע, ביציבות." },
      { kind: "text", text: "הרגישו את המגע של כף הרגל ברצפה. הקרקע נושאת אתכם." },
      { kind: "text", text: "אם נוח, הניחו כף יד על הירך או על הבטן, והרגישו את המגע." },
      { kind: "text", text: "אינכם צריכים להחזיק את עצמכם. הקרקע מחזיקה." },
      { kind: "text", text: "קחו נשימה אחת, ודעו — יש לכם על מה לעמוד." },
    ],
    ending: { kind: "phrase", options: [
      "הקרקע מתחתי.",
      "אני נשען על משהו יציב.",
      "די לי ברגע הזה.",
    ]},
  },
  "body-scan": {
    id: "body-scan",
    name: "סריקת גוף עדינה",
    description: "מעבר רך על חלקי הגוף, ללא שיפוט",
    duration: "חמש דקות",
    steps: [
      { kind: "text", text: "נעבור יחד, לאט, על חלקי הגוף. אין צורך לשנות דבר." },
      { kind: "text", text: "נתחיל מכפות הרגליים. רק נשים לב אליהן." },
      { kind: "text", text: "עולים אל השוקיים והברכיים. מה שמורגש — מורגש." },
      { kind: "text", text: "אל הבטן והגב. נשימה אל האזור הזה." },
      { kind: "text", text: "אל הכתפיים. אם יש מתח — נכיר בו, בלי להילחם בו." },
      { kind: "text", text: "אל הזרועות וכפות הידיים. אל הצוואר והלסת." },
      { kind: "text", text: "אל הפנים. נרפה מעט את מה שניתן להרפות." },
      { kind: "text", text: "כל הגוף כאן. נח רגע, בתוך ההרגשה הזאת." },
    ],
    ending: { kind: "phrase", options: [
      "הגוף נסרק בעדינות.",
      "שמתי לב למה שהיה.",
      "אפשר להמשיך ברכות.",
    ]},
  },
  "light-beam": {
    id: "light-beam",
    name: "קרן אור - דמיון מודרך",
    description: "תרגול דמיון עדין לחיבור למשאב פנימי",
    duration: "חמש דקות",
    mode: "breath",
    audioReady: false,
    audioNote: "בקרוב יתאפשר להאזין להקלטה מונחית. בינתיים, נלווה אתכם בכתב.",
    steps: [
      { kind: "text", text: "שבו בנוחות, או שכבו אם נעים לכם יותר." },
      { kind: "text", text: "דמיינו, בעדינות, קרן אור חמה היורדת מלמעלה." },
      { kind: "text", text: "היא נוגעת בקדקוד, ומשם זורמת לאט אל מטה." },
      { kind: "text", text: "האור ממלא את הכתפיים, מרפה את מה שאפשר." },
      { kind: "text", text: "הוא זורם אל בית החזה, חמים ורגוע." },
      { kind: "text", text: "ממשיך אל הבטן, אל האגן, אל הרגליים." },
      { kind: "text", text: "עכשיו כל הגוף אחוז באור הזה. שהו בו רגע." },
      { kind: "text", text: "אם יש באור הזה תכונה — חום, רוגע, חסד — הניחו לה לנכוח כאן." },
    ],
    ending: { kind: "takeaway", prompt: "מתוך מה שפגשת בדמיון — איזו מילה, תמונה, תחושה או משפט היית רוצה לקחת איתך?" },
  },
  "anchoring": {
    id: "anchoring",
    name: "ניגון כעוגן",
    description: "חיבור לנקודת אחיזה פנימית יציבה",
    duration: "שלוש דקות",
    playlist: {
      listId: "PLKPbaa9gVqEVJK7fH-TO2wigjEOrQrZD3",
      coverUrl: "https://base44.app/api/apps/6aa5ba6278746a9e6313ec62/files/mp/public/6aa5ba6278746a9e6313ec62/aa60bd778_playlist-cover.jpg",
      title: "ניגונים להאזנה",
      note: "אפשר להאזין במקביל לתרגול, בעוצמה נעימה לכם.",
    },
    steps: [
      { kind: "text", text: "עוגן הוא מקום בתוכנו שאינו זז, גם כשהגלים סוערים." },
      { kind: "text", text: "נשימה אחת. נזכור רגע שבו הרגשתם יציבות, אפילו לרגע." },
      { kind: "text", text: "איפה הרגשתם את זה בגוף? הניחו יד שם, אם נוח." },
      { kind: "text", text: "זו נקודת האחיזה שלכם. אינה צריכה להיות מושלמת — די שהיא נוכחת." },
      { kind: "text", text: "שאפו אליה. נשפו אליה. היא נשארת איתכם גם כשהכול זז." },
    ],
    ending: { kind: "phrase", options: [
      "יש בי מקום יציב.",
      "העוגן איתי.",
      "אפשר לחזור אליו שוב.",
    ]},
  },
  "gratitude-moment": {
    id: "gratitude-moment",
    name: "רגע של הודיה",
    description: "הכרה עדינה בדבר אחד שתומך בכם",
    duration: "דקה",
    steps: [
      { kind: "text", text: "הודיה אינה חייבת להיות גדולה. די בדבר אחד קטן." },
      { kind: "text", text: "חשבו על דבר אחד, מהיום או מהרגע, שתומך בכם מעט." },
      { kind: "text", text: "אולי זו כוס מים, אור מבעד לחלון, נשימה אחת שקטה." },
      { kind: "text", text: "שהו איתו רגע. אין צורך להרגיש הכרת תודה גדולה — רק להכיר בו." },
    ],
    ending: { kind: "phrase", options: [
      "יש דבר אחד שתומך בי.",
      "הכרתי בטוב הקטן.",
      "די ברגע הזה.",
    ]},
  },
  "word-for-path": {
    id: "word-for-path",
    name: "מילה או משפט לדרך",
    description: "בחירת מילה אחת שתלווה אתכם הלאה",
    duration: "דקה",
    steps: [
      { kind: "text", text: "לפעמים מילה אחת מספיקה כדי לזכור לאן פנינו מועדות." },
      { kind: "input", key: "word", text: "איזו מילה או משפט קצר היית רוצה לקחת איתך עכשיו?", placeholder: "מילה או משפט קצר…", optional: true },
    ],
    ending: { kind: "card", titleKey: "word", bodyKey: null, titleLabel: "המילה שלי לדרך", closing: "המילה הזאת איתך. אפשר לחזור אליה כשתצטרכו." },
  },
  "meaning-choice": {
    id: "meaning-choice",
    name: "משמעות ובחירה",
    description: "שאלה עדינה על מה נכון לכם לבחור עכשיו",
    duration: "שלוש דקות",
    steps: [
      { kind: "text", text: "משמעות אינה תשובה גדולה. היא כיוון קטן שנכון ללכת בו." },
      { kind: "input", key: "inHand", text: "מה נמצא עכשיו בידיכם, גם אם מעט?", placeholder: "מה נמצא בידי…", optional: true },
      { kind: "input", key: "choice", text: "מה נכון לכם לבחור עכשיו, ולו במעט?", placeholder: "הבחירה שלי…", optional: true },
    ],
    ending: { kind: "card", titleKey: "choice", bodyKey: "inHand", titleLabel: "הבחירה שלי", bodyLabel: "מה שנמצא בידי", closing: "בחרתם כיוון. אינכם צריכים לדעת את כל הדרך." },
  },
  "strengthening-memory": {
    id: "strengthening-memory",
    name: "אדם, מקום או זיכרון שמחזקים",
    description: "חיבור למשאב מיטיב מתוך חייכם",
    duration: "שלוש דקות",
    steps: [
      { kind: "text", text: "יש בתוכנו משאבים ששכחנו שהם שם. נזמין אחד מהם עכשיו." },
      { kind: "input", key: "resource", text: "חשבו על אדם, מקום או זיכרון שמחזקים אתכם. מי או מה עולה?", placeholder: "אדם, מקום או זיכרון…", optional: true },
      { kind: "text", text: "שהו רגע עם מה שעלה. מה מרגישים שם, באותו מקום או עם אותו אדם?" },
      { kind: "text", text: "קחו נשימה אליו. הוא איתכם, גם כאן, גם עכשיו." },
    ],
    ending: { kind: "card", titleKey: "resource", bodyKey: null, titleLabel: "המשאב שלי", closing: "המשאב הזה איתכם. אפשר לחזור אליו כשתזדקקו." },
  },
  "emotion-space": {
    id: "emotion-space",
    name: "לתת מקום לרגש",
    description: "מפגש עדין עם מה שעולה, בלי למהר לפתור",
    duration: "שלוש דקות",
    steps: [
      { kind: "text", text: "אין צורך לדעת מיד כיצד לקרוא למה שעובר עליכם." },
      { kind: "input", key: "name", text: "אם אפשר לתת לזה שם, מה אתם מרגישים עכשיו?", placeholder: "שם לרגש, אם עולה…", optional: true },
      { kind: "input", key: "body", text: "היכן זה מורגש בגוף?", placeholder: "איפה בגוף…", optional: true },
      { kind: "choice", key: "need", text: "מה הדבר הזה מבקש כרגע?", options: [
        { label: "מעט מקום", value: "space" },
        { label: "תחושת הגנה", value: "protection" },
        { label: "קשר עם אדם אחר", value: "connection" },
        { label: "מנוחה", value: "rest" },
        { label: "כתיבה או הקלטה", value: "writing" },
        { label: "איני יודע/ת", value: "unknown" },
      ]},
    ],
    ending: { kind: "flow", flow: "emotion-need" },
  },
  "thought-meeting": {
    id: "thought-meeting",
    name: "מה המחשבה הזאת מבקשת ממני עכשיו?",
    description: "הכלי המרכזי לפגישה עם מחשבה שאינה מרפה",
    duration: "שלוש דקות",
    steps: [
      { kind: "text", text: "לפני שנבחר מה לעשות, ניתן למחשבה מקום." },
      { kind: "input", key: "thought", text: "אפשר לכתוב את המחשבה כאן. אפשר גם לדלג ולא לכתוב.", placeholder: "המחשבה שעולה…", optional: true, multiline: true },
    ],
    ending: { kind: "thought-branches" },
  },
  "nesheama": {
    id: "nesheama",
    name: "נשמ״ה — רגע של נשימה, שקט, משמעות והודיה",
    description: "תרגול קצר בארבעה שלבים, על פי מודל עדשת הרוח",
    duration: "דקה",
    steps: [
      { kind: "text", letter: "נ", title: "נשימה ונוכחות", text: "נחזור בעדינות אל הגוף, אל הנשימה ואל הרגע הזה. אין צורך לשנות דבר." },
      { kind: "text", letter: "ש", title: "שקט פנימי והתבוננות", text: "נשים לב למה שמתרחש בנו, בלי למהר לשנות אותו. רק נכיר במה שנוכח." },
      { kind: "text", letter: "מ", title: "משמעות ובחירה", text: "נשאל: מה נמצא בידי, ומה נכון לי לבחור עכשיו, ולו במעט?" },
      { kind: "text", letter: "ה", title: "הודיה והכרת הטוב", text: "נזהה דבר אחד שתומך בנו, ושאותו אנו מבקשים לקחת הלאה." },
    ],
    ending: { kind: "phrase", options: [
      "לקחתי איתי רגע אחד של נשימה.",
      "יש בי מקום לבחור.",
      "הכרתי בטוב שנוכח.",
    ]},
  },
};

export const thoughtBranches = [
  { id: "document", label: "לתעד", sub: "יש כאן משהו שחשוב לי לשמור" },
  { id: "act", label: "לפעול", sub: "יש כאן דבר ממשי שביכולתי לעשות" },
  { id: "release", label: "לשחרר", sub: "אין כרגע פעולה אפשרית, ואני מבקש/ת להניח לזה לזמן מה" },
  { id: "unclear", label: "לא ברור לי — עזרו לי לבחור", subtle: true },
];

export const documentFlow = {
  intro: "לפעמים המחשבה אינה מבקשת פתרון. היא רק מבקשת שלא נאבד אותה.",
  steps: [
    { kind: "input", key: "what", text: "מה עלה בך?", placeholder: "מה עלה…", multiline: true, optional: true },
    { kind: "input", key: "remember", text: "מה חשוב לך לזכור מתוך זה?", placeholder: "מה חשוב לזכור…", multiline: true, optional: true },
    { kind: "input", key: "title", text: "איזו מילה או כותרת היית נותן/ת לרגע הזה?", placeholder: "כותרת או מילה…", optional: true },
  ],
  card: { titleLabel: "הכותרת שלי", titleKey: "title", bodyLabel: "מה שאני מבקש/ת לשמור", bodyKey: "remember" },
  closing: "המחשבה נשמרה. אינך צריך/ה להמשיך להחזיק אותה עכשיו.",
};

export const actFlow = {
  intro: "לא צריך לפתור הכול. נחפש רק את הצעד הבא שנמצא בידיך.",
  steps: [
    { kind: "input", key: "control", text: "מה מתוך הדבר הזה נמצא בשליטתי?", placeholder: "מה בשליטתי…", multiline: true, optional: true },
    { kind: "input", key: "step", text: "מהי הפעולה הקטנה ביותר שאוכל לעשות?", placeholder: "הפעולה הקטנה ביותר…", multiline: true, optional: true },
    { kind: "choice", key: "when", text: "מתי נכון לי לעשות אותה?", options: [
      { label: "עכשיו", value: "now" },
      { label: "היום", value: "today" },
      { label: "מחר", value: "tomorrow" },
      { label: "זמן אחר", value: "other" },
    ]},
  ],
  card: { titleLabel: "הצעד הבא שלי", titleKey: "step", bodyLabel: "מתי", bodyKey: "when" },
  closing: "בחרת צעד אחד. אינך נדרש/ת לפתור עכשיו את הדרך כולה.",
};

export const releaseFlow = {
  steps: [
    { kind: "text", text: "הניחו את כפות הרגליים על הרצפה." },
    { kind: "text", text: "שימו לב לנשימה כפי שהיא. אין צורך לשנות אותה בכוח." },
    { kind: "text", text: "אפשרו לנשיפה להתארך מעט." },
    { kind: "text", text: "המחשבה הזאת נמצאת איתי, אבל אינני חייב/ת לפתור אותה עכשיו." },
  ],
  prompt: "איזה משפט נכון לך לקחת מכאן?",
  options: [
    "עשיתי כרגע את מה שביכולתי.",
    "לא הכול צריך להיפתר היום.",
    "אני נותן/ת למחשבה לנוח.",
    "אני מפקיד/ה את מה שאינו בידי.",
    "משפט אישי משלי.",
  ],
};

export const unclearFlow = {
  steps: [
    { kind: "choice", key: "q1", text: "האם יש כאן פרט, זיכרון או רעיון שחשוב לך שלא יאבד?", options: [
      { label: "כן", value: "yes", route: "document" },
      { label: "לא", value: "no" },
    ]},
    { kind: "choice", key: "q2", text: "האם יש פעולה ממשית שנמצאת בשליטתך ואפשר לעשות בזמן הקרוב?", options: [
      { label: "כן", value: "yes", route: "act" },
      { label: "לא", value: "no" },
    ]},
    { kind: "choice", key: "q3", text: "אם אין כרגע פעולה אפשרית, האם מתאים לך לנסות להניח למחשבה לזמן מה?", options: [
      { label: "כן", value: "yes", route: "release" },
      { label: "לא", value: "no" },
    ]},
  ],
  fallback: { text: "לפעמים מחשבה זקוקה קודם לנוכחות, לפני שאפשר לדעת מה לעשות איתה.", button: "לרגע של נשמ״ה", route: "nesheama" },
};

export const emotionNeedMap = {
  space: { toolId: "ground-touch" },
  protection: { toolId: "anchoring" },
  connection: { toolId: "strengthening-memory" },
  rest: { toolId: "gentle-exhale" },
  writing: { toolId: "word-for-path" },
  unknown: { toolId: "nesheama" },
};

export const fatigueOptions = [
  { id: "rest-nothing", label: "לנוח לרגע בלי לעשות דבר", toolId: "gentle-exhale" },
  { id: "sense-body", label: "להתחבר לחוש אחד או לגוף", toolId: "return-to-senses" },
  { id: "nourish", label: "למצוא דבר קטן שיכול להזין אותי עכשיו", toolId: "gratitude-moment" },
];

export const memoryFlow = {
  intro: "אפשר לתת לזיכרון מקום, בלי להיכנס עכשיו לכל פרטיו.",
  options: [
    { id: "write", label: "לכתוב או להקליט", toolId: "word-for-path" },
    { id: "word", label: "לבחור מילה אחת שהזיכרון נושא", toolId: "word-for-path" },
    { id: "resource", label: "להתחבר למשאב שמחזיק אותי", toolId: "strengthening-memory" },
    { id: "person", label: "לפנות לאדם שאני סומך/ת עליו", toolId: "anchoring" },
    { id: "body", label: "לחזור לגוף ולהווה", toolId: "ground-touch" },
  ],
  note: "הכתיבה חופשית ובשליטתכם. אפשר לעצור בכל רגע.",
};

export const safetyContent = {
  link: "אני זקוק/ה לעזרה אנושית עכשיו",
  body:
    "המרחב מציע כלים להתבוננות ולחיזוק החוסן, אך אינו מהווה אבחון, טיפול או מענה למצבי חירום.",
  urgent:
    "אם אתם חשים סכנה מיידית, חשש לפגיעה בעצמכם או באחרים, קושי גופני משמעותי או מצוקה שאינכם יכולים לשאת לבד — חשוב לפנות עכשיו לאדם קרוב, לאיש מקצוע או לשירותי החירום באזורכם.",
  localNote: "בגרסה הראשונה אנו ממליצים להתקשר לשירותי החירום המקומיים או לאדם קרוב. בהמשך יתאפשר להתאים מספרים לפי מדינה.",
  gentlePrompt: "האם יעזור לך לפנות עכשיו למישהו שאת/ה סומך/ת עליו?",
};

export const privacyNote = "התוכן שלך נשמר רק אצלך, בדפדפן, ולא נשמר בשום מסד נתונים. מחיקה זמינה בכל שלב.";