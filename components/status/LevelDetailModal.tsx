"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { expRequiredForLevel } from "@/lib/gameEngine";

interface LevelDetailModalProps {
  open: boolean;
  currentLevel: number;
  currentExp: number;
  onClose: () => void;
}

const CHUNK_SIZE = 20;

export default function LevelDetailModal({
  open,
  currentLevel,
  currentExp,
  onClose,
}: LevelDetailModalProps) {
  const [maxLevel, setMaxLevel] = useState(currentLevel + 10);
  const currentRowRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    setMaxLevel(Math.max(currentLevel + 10, CHUNK_SIZE));

    // Auto-scroll ke level saat ini begitu modal dibuka
    const timeout = setTimeout(() => {
      currentRowRef.current?.scrollIntoView({ block: "center" });
    }, 50);
    return () => clearTimeout(timeout);
  }, [open, currentLevel]);

  const rows = Array.from({ length: maxLevel }, (_, i) => i + 1);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-void/80 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="hud-corner relative flex max-h-[80vh] w-full max-w-sm flex-col rounded-2xl border border-cyan-glow/50 bg-panel/95 backdrop-blur-md p-5 shadow-glow-cyan sm:p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-text-mid">Sistem</p>
            <h2 className="mb-1 font-display text-xl font-bold text-text-hi">
              Kebutuhan EXP per Level
            </h2>
            <p className="mb-4 text-[11px] text-text-dim">
              Level {currentLevel} · Progress saat ini {currentExp.toLocaleString("id-ID")} EXP
            </p>

            <ul className="flex flex-col gap-1.5 overflow-y-auto pr-1">
              {rows.map((lvl) => {
                const isCurrent = lvl === currentLevel;
                const required = expRequiredForLevel(lvl);
                return (
                  <li
                    key={lvl}
                    ref={isCurrent ? currentRowRef : undefined}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${
                      isCurrent
                        ? "border-cyan-glow bg-cyan-glow/10 shadow-glow-cyan-sm"
                        : "border-border/40 bg-panel-light/20"
                    }`}
                  >
                    <span className={isCurrent ? "font-semibold text-cyan-glow" : "text-text-hi"}>
                      Level {lvl}
                      {isCurrent && (
                        <span className="ml-1.5 text-[10px] uppercase text-cyan-glow">
                          (sekarang)
                        </span>
                      )}
                    </span>
                    <span className={isCurrent ? "font-semibold text-cyan-glow" : "text-text-mid"}>
                      {required.toLocaleString("id-ID")} EXP
                    </span>
                  </li>
                );
              })}

              <button
                onClick={() => setMaxLevel((prev) => prev + CHUNK_SIZE)}
                className="mt-1 rounded-lg border border-dashed border-border/60 py-2 text-xs font-semibold text-text-mid transition hover:border-cyan-dim hover:text-cyan-glow"
              >
                Muat lebih banyak
              </button>
            </ul>

            <button
              onClick={onClose}
              className="mt-4 rounded-full border border-border/60 py-2 text-sm text-text-mid transition hover:border-text-mid"
            >
              Tutup
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}