"use client";

import { AnimatePresence, motion } from "framer-motion";
import { StatKey } from "@/types/quest";
import { BadgeInfo } from "@/lib/badgeEngine";

interface BadgeDetailModalProps {
  stat: StatKey | null;
  badge: BadgeInfo | null;
  onClose: () => void;
}

export default function BadgeDetailModal({ stat, badge, onClose }: BadgeDetailModalProps) {
  const open = !!stat && !!badge;

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
            className="hud-corner relative w-full max-w-sm rounded-2xl border border-violet-glow/50 bg-panel/95 backdrop-blur-md p-5 shadow-glow-violet sm:p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-text-mid">Badge · {stat}</p>

            {badge!.level > 0 ? (
              <>
                <h2 className="mt-0.5 font-display text-2xl font-bold text-violet-glow">
                  {badge!.name}
                </h2>
                <p className="mt-1 text-sm text-text-mid">
                  Level {badge!.level} · Buff EXP{" "}
                  <span className="font-semibold text-gold">+{badge!.buffPercent}%</span> untuk
                  quest {stat}
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-0.5 font-display text-2xl font-bold text-text-hi">
                  Belum Ada Badge
                </h2>
                <p className="mt-1 text-sm text-text-mid">
                  Selesaikan quest {stat} untuk mendapatkan badge pertamamu.
                </p>
              </>
            )}

            <div className="mt-4 rounded-xl border border-border/50 bg-panel-light/30 px-4 py-3 text-center">
              <p className="font-display text-lg font-bold text-cyan-glow">
                {badge!.completionCount}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-text-dim">
                Total Quest {stat} Diselesaikan
              </p>
            </div>

            {badge!.nextThreshold !== null ? (
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-[11px] text-text-mid">
                  <span>Menuju {badge!.nextName}</span>
                  <span>
                    {badge!.completionCount} / {badge!.nextThreshold}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-void/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-dim to-violet-glow transition-all duration-500"
                    style={{ width: `${badge!.progressToNext}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="mt-4 text-center text-xs text-gold">
                Badge tertinggi tercapai — kamu master di divisi ini! 🏆
              </p>
            )}

            <button
              onClick={onClose}
              className="mt-5 w-full rounded-xl border border-border/60 bg-panel-light/40 py-3.5 text-base font-semibold text-text-hi transition hover:border-text-mid hover:bg-panel-light/60"
            >
              Tutup
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}