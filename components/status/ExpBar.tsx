"use client";

import { motion } from "framer-motion";

interface ExpBarProps {
  current: number;
  max: number;
}

export default function ExpBar({ current, max }: ExpBarProps) {
  const percent = Math.min(100, Math.round((current / max) * 100));

  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-wider text-text-mid">
        <span>EXP</span>
        <span className="font-display font-semibold text-cyan-glow">
          {current.toLocaleString("id-ID")} / {max.toLocaleString("id-ID")}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full border border-border/60 bg-void/60">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-dim to-cyan-glow shadow-glow-cyan-sm"
        />
      </div>
    </div>
  );
}