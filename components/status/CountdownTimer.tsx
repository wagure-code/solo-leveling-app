"use client";

import { useEffect, useState } from "react";

function getMsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    h: Math.floor(totalSeconds / 3600),
    m: Math.floor((totalSeconds % 3600) / 60),
    s: totalSeconds % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountdownTimer() {
  // null dulu di awal supaya nggak mismatch antara render server & client
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    setMs(getMsUntilMidnight());
    const interval = setInterval(() => setMs(getMsUntilMidnight()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (ms === null) return null;

  const { h, m, s } = formatDuration(ms);
  const urgent = h < 1; // otomatis nyala pas lewat jam 23:00
  const warning = !urgent && h < 3;

  return (
    <div
      className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 transition-colors ${
        urgent
          ? "border-danger/60 bg-danger/10"
          : warning
          ? "border-gold/50 bg-gold/5"
          : "border-border/50 bg-panel-light/30"
      }`}
    >
      <span
        className={`text-[10px] uppercase tracking-wide ${
          urgent ? "text-danger" : warning ? "text-gold" : "text-text-dim"
        }`}
      >
        Quest hari ini reset dalam
      </span>
      <span
        className={`font-display text-base font-bold tabular-nums ${
          urgent ? "text-danger animate-pulse-glow" : warning ? "text-gold" : "text-cyan-glow"
        }`}
      >
        {pad(h)}:{pad(m)}:{pad(s)}
      </span>
    </div>
  );
}