const STORAGE_KEY = "sl_saved_moments";
const JOURNAL_KEY = "sl_journal_entries";

export function getSavedMoments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let items = raw ? JSON.parse(raw) : [];

    // Migrate any legacy journal entries if they exist and aren't already included
    try {
      const journalRaw = localStorage.getItem(JOURNAL_KEY);
      if (journalRaw) {
        const legacyJournal = JSON.parse(journalRaw);
        if (Array.isArray(legacyJournal) && legacyJournal.length > 0) {
          const existingIds = new Set(items.map((i) => i.id));
          legacyJournal.forEach((j, idx) => {
            const legacyId = `journal_${j.date || idx}`;
            if (!existingIds.has(legacyId)) {
              items.push({
                id: legacyId,
                date: j.date || new Date().toISOString(),
                toolId: "write-guide",
                toolName: "הסיפור שלי",
                type: "writing",
                text: j.word || j.remember || j.story || "רשומה מתוך מדריך הכתיבה",
                details: {
                  word: j.word,
                  remember: j.remember,
                  story: j.story,
                },
              });
            }
          });
        }
      }
    } catch {}

    // Sort by date descending
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export function saveMoment(moment) {
  try {
    const current = getSavedMoments();
    // Prevent immediate duplicate if identical text saved within 10 seconds
    const isDuplicate = current.some(
      (m) =>
        m.toolId === moment.toolId &&
        m.text === moment.text &&
        Math.abs(new Date(m.date).getTime() - new Date(moment.date || Date.now()).getTime()) < 10000
    );
    if (isDuplicate) return current;

    const newEntry = {
      id: moment.id || `moment_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      date: moment.date || new Date().toISOString(),
      toolId: moment.toolId || "general",
      toolName: moment.toolName || "תרגול",
      type: moment.type || "tool", // tool | writing | thought
      text: moment.text || "",
      details: moment.details || {},
    };

    const updated = [newEntry, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteMoment(id) {
  try {
    const current = getSavedMoments();
    const updated = current.filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearAllMoments() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(JOURNAL_KEY);
    return [];
  } catch {
    return [];
  }
}

// ---- Writing-guide draft (kept on this device only) ----
const DRAFT_KEY = "sl_write_draft";
const DRAFT_ID = "write_draft";

export function getWriteDraft() {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveWriteDraft(formData, stepIndex) {
  try {
    const date = new Date().toISOString();
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ formData, stepIndex, date }));
    const others = getSavedMoments().filter((m) => m.id !== DRAFT_ID);
    const draft = {
      id: DRAFT_ID,
      date,
      toolId: "write-guide",
      toolName: "טיוטה · הסיפור שלי",
      type: "writing",
      text: formData.word || formData.remember || (formData.story ? formData.story.slice(0, 60) + "..." : "טיוטה"),
      details: { ...formData },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([draft, ...others]));
  } catch {}
}

export function clearWriteDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
    deleteMoment(DRAFT_ID);
  } catch {}
}

export function getSavedCount() {
  try {
    return getSavedMoments().length;
  } catch {
    return 0;
  }
}