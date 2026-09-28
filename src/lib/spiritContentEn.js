// English overlay for spiritContent. Hebrew stays the source of truth;
// these objects only replace text fields when the app language is English.

const phrase = (options) => ({ options });

export const toolsEn = {
  "gentle-exhale": {
    name: "4-7-8 breathing",
    description: "A short breathing practice to calm the body: inhale, hold, and a long exhale",
    duration: "2 min",
    steps: [
      "Let's practice 4-7-8 breathing together. Sit comfortably and let your shoulders drop.",
      "Breathe in through your nose for four seconds.",
      "Gently hold the breath for seven seconds.",
      "And breathe out slowly through your mouth for eight seconds.",
      "Again. Inhale for four... hold for seven... and a long exhale for eight.",
      "Repeat the cycle once or twice more, at your own pace and without effort.",
      "If holding the breath feels unpleasant, return to natural breathing, or simply lengthen the exhale.",
      "No need to force the count. Comfortable, steady breathing matters more than exact numbers.",
    ],
    ending: phrase(["I paused for a moment, and it was enough.", "My breath stayed with me.", "I can go on gently."]),
  },
  "return-to-senses": {
    name: "Back to the senses",
    description: "A short grounding practice through the senses",
    duration: "3 min",
    steps: [
      "Let's return, for a moment, to what is here right now.",
      "Notice five things you can see around you. Slowly.",
      "Now four things you can feel by touch - the floor, your clothes, the chair.",
      "Three sounds you can hear, near or far.",
      "Two smells, even very faint ones.",
      "And one taste, or the feeling of breath in your mouth. Whatever is present.",
      "You are here. Your body and senses are with you.",
    ],
    ending: phrase(["I came back to the here and now.", "My senses brought me back to my body.", "I can stay one more moment."]),
  },
  "ground-touch": {
    name: "Touching the ground",
    description: "A short practice to feel the ground beneath you",
    duration: "1 min",
    steps: [
      "Place your feet firmly on the ground.",
      "Feel your feet touching the floor. The ground is holding you.",
      "If it feels right, rest a hand on your thigh or belly and feel the touch.",
      "You don't need to hold yourself up. The ground holds you.",
      "Take one breath, and know - you have something to stand on.",
    ],
    ending: phrase(["The ground is beneath me.", "I lean on something steady.", "This moment is enough."]),
  },
  "body-scan": {
    name: "Gentle body scan",
    description: "A soft pass through the body, without judgment",
    duration: "5 min",
    steps: [
      "Let's move slowly through the body together. Nothing needs to change.",
      "We'll begin with the feet. Just notice them.",
      "Up to the calves and knees. Whatever is felt, is felt.",
      "To the belly and back. A breath into this area.",
      "To the shoulders. If there is tension, acknowledge it without fighting it.",
      "To the arms and hands. To the neck and jaw.",
      "To the face. Soften a little of what can soften.",
      "Your whole body is here. Rest a moment in this feeling.",
    ],
    ending: phrase(["My body was gently scanned.", "I noticed what was there.", "I can go on gently."]),
  },
  "light-beam": {
    name: "Beam of light - guided imagery",
    description: "A gentle imagery practice to connect with an inner resource",
    duration: "5 min",
    audio: { title: "Beam of light - guided imagery", note: "You can listen alongside the practice, at a volume that feels good." },
    steps: [
      "Sit comfortably, or lie down if that feels better.",
      "Gently imagine a warm beam of light coming down from above.",
      "It touches the top of your head, and from there slowly flows down.",
      "The light fills your shoulders, softening what it can.",
      "It flows into your chest, warm and calm.",
      "On to the belly, the pelvis, the legs.",
      "Now your whole body is held in this light. Stay in it for a moment.",
      "If this light has a quality - warmth, calm, kindness - let it be present here.",
    ],
    ending: { prompt: "From what you met in the imagery - what word, image, feeling or sentence would you like to take with you?" },
  },
  anchoring: {
    name: "A melody as an anchor",
    description: "Connecting to a steady inner point to hold on to",
    duration: "3 min",
    playlist: { title: "Melodies to listen to", note: "You can listen alongside the practice, at a volume that feels good." },
    steps: [
      "An anchor is a place within us that doesn't move, even when the waves are stormy.",
      "One breath. Remember a moment when you felt steady, even briefly.",
      "Where did you feel it in your body? Rest a hand there, if it feels right.",
      "This is your anchor point. It doesn't need to be perfect - it's enough that it's here.",
      "Breathe into it. Breathe out from it. It stays with you even when everything moves.",
    ],
    ending: phrase(["There is a steady place in me.", "The anchor is with me.", "I can come back to it again."]),
  },
  "gratitude-moment": {
    name: "A moment of gratitude",
    description: "Gently noticing one thing that supports you",
    duration: "1 min",
    steps: [
      "Gratitude doesn't have to be big. One small thing is enough.",
      "Think of one thing, from today or this moment, that supports you a little.",
      "Maybe a glass of water, light through the window, one quiet breath.",
      "Stay with it a moment. No need to feel great gratitude - just acknowledge it.",
    ],
    ending: phrase(["There is one thing that supports me.", "I noticed the small good.", "This moment is enough."]),
  },
  "word-for-path": {
    name: "A word for the way",
    description: "Choosing one word to accompany you onward",
    duration: "1 min",
    steps: [
      "Sometimes one word is enough to remember where we're heading.",
      { text: "What word or short sentence would you like to take with you now?", placeholder: "A word or short sentence..." },
    ],
    ending: { titleLabel: "My word for the way", closing: "This word is with you. You can come back to it whenever you need." },
  },
  "meaning-choice": {
    name: "Meaning and choice",
    description: "A gentle question about what feels right to choose now",
    duration: "3 min",
    steps: [
      "Meaning isn't a big answer. It's a small direction worth walking in.",
      { text: "What is in your hands right now, even if only a little?", placeholder: "What is in my hands..." },
      { text: "What feels right for you to choose now, even a little?", placeholder: "My choice..." },
    ],
    ending: { titleLabel: "My choice", bodyLabel: "What is in my hands", closing: "You chose a direction. You don't need to know the whole way." },
  },
  "strengthening-memory": {
    name: "A person, place or memory that strengthens",
    description: "Connecting to a nourishing resource from your life",
    duration: "3 min",
    steps: [
      "There are resources within us we forgot were there. Let's invite one now.",
      { text: "Think of a person, place or memory that strengthens you. Who or what comes up?", placeholder: "A person, place or memory..." },
      "Stay a moment with what came up. What do you feel there, in that place or with that person?",
      "Take a breath toward it. It is with you, here too, now too.",
    ],
    ending: { titleLabel: "My resource", closing: "This resource is with you. You can return to it whenever you need." },
  },
  "emotion-space": {
    name: "Making room for a feeling",
    description: "A gentle meeting with what comes up, without rushing to fix it",
    duration: "3 min",
    steps: [
      "There's no need to know right away what to call what you're going through.",
      { text: "If you can give it a name, what are you feeling right now?", placeholder: "A name for the feeling, if one comes..." },
      { text: "Where is it felt in the body?", placeholder: "Where in the body..." },
      { text: "What is this asking for right now?", options: ["A little space", "A sense of protection", "Connection with someone", "Rest", "Writing or recording", "I don't know"] },
    ],
  },
  "thought-meeting": {
    name: "What is this thought asking of me now?",
    description: "The main tool for meeting a thought that won't let go",
    duration: "3 min",
    steps: [
      "Before we choose what to do, let's give the thought some room.",
      { text: "You can write the thought here. You can also skip it.", placeholder: "The thought that comes up..." },
    ],
  },
  nesheama: {
    name: "N.S.M.H. - a moment of breath, stillness, meaning and gratitude",
    description: "A short four-step practice, based on the Spirit Lens model",
    duration: "1 min",
    steps: [
      { title: "Breath and presence", text: "Let's gently return to the body, to the breath and to this moment. Nothing needs to change." },
      { title: "Inner stillness and reflection", text: "Let's notice what is happening in us, without rushing to change it. Just acknowledge what is present." },
      { title: "Meaning and choice", text: "Let's ask: what is in my hands, and what feels right to choose now, even a little?" },
      { title: "Gratitude and appreciation", text: "Let's find one thing that supports us, and that we want to take onward." },
    ],
    ending: phrase(["I took one moment of breath with me.", "There is room in me to choose.", "I noticed the good that is here."]),
  },
};

export const cardLinesEn = {
  "gentle-exhale": ["4-7-8", "breathing"],
  "ground-touch": ["Touching", "the ground"],
  "return-to-senses": ["Back to", "the senses"],
  "body-scan": ["Body", "scan"],
  anchoring: ["Melody", "as anchor"],
  "light-beam": ["Beam", "of light"],
  "gratitude-moment": ["A moment", "of gratitude"],
  "word-for-path": ["A word", "for the way"],
  "meaning-choice": ["Meaning", "and choice"],
  "thought-meeting": ["What is the thought", "asking of me?"],
  "emotion-space": ["Room", "for a feeling"],
  "strengthening-memory": ["A memory", "that strengthens"],
};

function mergeStep(step, en) {
  if (!en) return step;
  if (typeof en === "string") return { ...step, text: en };
  const out = { ...step, ...en };
  if (step.options && en.options) {
    out.options = step.options.map((o, i) => ({ ...o, label: en.options[i] ?? o.label }));
  }
  return out;
}

export function localizeTool(tool, lang) {
  if (!tool || lang !== "en") return tool;
  const en = toolsEn[tool.id];
  if (!en) return tool;
  return {
    ...tool,
    name: en.name ?? tool.name,
    description: en.description ?? tool.description,
    duration: en.duration ?? tool.duration,
    audio: tool.audio && { ...tool.audio, ...en.audio },
    playlist: tool.playlist && { ...tool.playlist, ...en.playlist },
    steps: tool.steps.map((s, i) => mergeStep(s, en.steps?.[i])),
    ending: tool.ending && { ...tool.ending, ...en.ending },
  };
}

export function localizeTools(tools, lang) {
  if (lang !== "en") return tools;
  return Object.fromEntries(Object.entries(tools).map(([id, t]) => [id, localizeTool(t, lang)]));
}