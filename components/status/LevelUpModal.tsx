"use client";

import { AnimatePresence, motion } from "framer-motion";

interface LevelUpModalProps {
  level: number | null;
  onClose: () => void;
}

export default function LevelUpModal({ level, onClose }: LevelUpModalProps) {
  return (
    <AnimatePresence>
      {level !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-void/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-xs flex-col items-center rounded-2xl border border-cyan-glow bg-panel/95 px-6 py-8 text-center shadow-glow-cyan"
          >
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-[11px] uppercase tracking-[0.3em] text-cyan-glow animate-pulse-glow"
            >
              Level Up
            </motion.p>

            <motion.p
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
              className="mt-2 font-display text-5xl font-bold text-text-hi"
            >
              {level}
            </motion.p>

            <p className="mt-3 text-sm text-text-mid">
              Kekuatanmu bertambah. Terus jalankan quest-mu, Hunter.
            </p>

            <button
              onClick={onClose}
              className="mt-6 rounded-full border border-cyan-glow/60 bg-cyan-glow/10 px-6 py-2 text-sm font-semibold text-cyan-glow transition hover:bg-cyan-glow/20 active:scale-95"
            >
              Lanjutkan
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}