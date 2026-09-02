"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HudPanelProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  scanline?: boolean;
}

export default function HudPanel({
  children,
  className = "",
  glow = false,
  scanline = false,
}: HudPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`hud-corner relative rounded-2xl border bg-panel/70 backdrop-blur-md shadow-soft ${
        glow ? "border-cyan-glow/50 shadow-glow-cyan" : "border-border/60"
      } ${className}`}
    >
      {scanline && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-cyan-glow/10 to-transparent animate-scanline" />
        </div>
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}