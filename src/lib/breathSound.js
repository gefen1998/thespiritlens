// Soft synthesized breath cues (no files): a quiet ambient pad under the whole
// practice, an airy "whoosh" that swells up on the inhale and sinks on the
// exhale, and a small bell that marks the hold — so the practice can be
// followed with eyes closed.
let ctx, master, pad, noiseBuf, active = [];

function ac() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function stopActive() {
  const t = ctx?.currentTime || 0;
  active.forEach(({ g, src }) => {
    g.gain.cancelScheduledValues(t);
    g.gain.setTargetAtTime(0, t, 0.15);
    src.forEach((s) => s.stop(t + 1));
  });
  active = [];
}

export function startPad() {
  const c = ac();
  if (pad) return;
  const g = c.createGain();
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(0.035, c.currentTime + 3);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass"; lp.frequency.value = 900;
  const oscs = [130.81, 196, 261.63, 329.63].map((f, i) => {
    const o = c.createOscillator();
    o.type = "sine"; o.frequency.value = f; o.detune.value = i * 3;
    o.connect(lp); o.start();
    return o;
  });
  lp.connect(g); g.connect(master);
  pad = { g, oscs };
}

export function stopPad() {
  if (!pad) return;
  const t = ctx.currentTime;
  pad.g.gain.cancelScheduledValues(t);
  pad.g.gain.setTargetAtTime(0, t, 0.6);
  pad.oscs.forEach((o) => o.stop(t + 3));
  pad = null;
  stopActive();
}

function breath(dur, rising) {
  const c = ac(), t = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = noiseBuf; src.loop = true;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass"; bp.Q.value = 0.8;
  bp.frequency.setValueAtTime(rising ? 350 : 900, t);
  bp.frequency.exponentialRampToValueAtTime(rising ? 900 : 300, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(rising ? 0.22 : 0.2, t + (rising ? dur * 0.85 : dur * 0.15));
  g.gain.linearRampToValueAtTime(0, t + dur);
  src.connect(bp); bp.connect(g); g.connect(master);
  src.start(t); src.stop(t + dur + 0.1);
  active.push({ g, src: [] });
}

function bell() {
  const c = ac(), t = c.currentTime;
  const g = c.createGain();
  // A soft "dong": deep temple bell struck once — gentle strike, low warm
  // fundamental with a slow beat, upper partials fading first, long tail.
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.16, t + 0.025);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 6.5);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass"; lp.frequency.setValueAtTime(1400, t);
  lp.frequency.exponentialRampToValueAtTime(400, t + 3);
  [[110, 1, 6.5], [110.6, 0.6, 6.5], [220.4, 0.25, 4], [304, 0.14, 2.5], [596, 0.05, 1.2]].forEach(([f, v, len]) => {
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(f * 1.006, t);
    o.frequency.exponentialRampToValueAtTime(f, t + 0.25);
    const og = c.createGain();
    og.gain.setValueAtTime(v, t);
    og.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(og); og.connect(lp); o.start(t); o.stop(t + len + 0.1);
  });
  lp.connect(g); g.connect(master);
}

/** Plays the cue for a breathing phase lasting `dur` seconds. */
export function breathCue(phase, dur) {
  stopActive();
  if (phase === "inhale") breath(dur, true);
  else if (phase === "exhale") breath(dur, false);
  else if (phase === "hold") bell();
}

export function pauseSound() { stopActive(); ctx?.suspend(); }
export function resumeSound() { ctx?.resume(); }