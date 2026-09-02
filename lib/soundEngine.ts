"use client";

const SOUND_KEY = "solo-status:soundEnabled";

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem(SOUND_KEY);
  return stored === null ? true : stored === "true";
}

export function setSoundEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SOUND_KEY, String(enabled));
}

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq: number, startTime: number, duration: number, ctx: AudioContext, gainValue = 0.15) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(gainValue, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function playQuestComplete() {
  if (!isSoundEnabled()) return;
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  playTone(880, now, 0.12, ctx, 0.12);
  playTone(1318.5, now + 0.08, 0.15, ctx, 0.12);
}

export function playLevelUp() {
  if (!isSoundEnabled()) return;
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => playTone(freq, now + i * 0.1, 0.25, ctx, 0.15));
}

export function playBadgeUnlock() {
  if (!isSoundEnabled()) return;
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  playTone(659.25, now, 0.15, ctx, 0.13);
  playTone(987.77, now + 0.1, 0.2, ctx, 0.13);
}

export function playPenaltyAlert() {
  if (!isSoundEnabled()) return;
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  playTone(392, now, 0.2, ctx, 0.13);
  playTone(293.66, now + 0.15, 0.25, ctx, 0.13);
}