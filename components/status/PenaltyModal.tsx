"use client";

import { AnimatePresence, motion } from "framer-motion";

interface PenaltyInfo {
  missedCount: number;
  missedTitles: string[];
}

interface PenaltyModalProps {
  info: PenaltyInfo | null;
  onClose: () => void;
}

export default function PenaltyModal({ info, onClose }: PenaltyModalProps) {
  return (
    <AnimatePresence>
      {info && (
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
            className="relative flex w-full max-w-xs flex-col items-center rounded-2xl border border-danger bg-panel/95 px-6 py-8 text-center shadow-[0_0_20px_rgba(255,59,92,0.35)]"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-danger">Penalty</p>
            <p className="mt-2 font-display text-2xl font-bold text-text-hi">Quest Terlewat</p>

            <p className="mt-3 text-sm text-text-mid">
              {info.missedCount} quest harian kemarin tidak diselesaikan tepat waktu.
            </p>

            <ul className="mt-3 flex w-full flex-col gap-1">
              {info.missedTitles.slice(0, 4).map((title) => (
                <li
                  key={title}
                  className="truncate rounded-lg border border-danger/30 bg-danger/5 px-3 py-1.5 text-xs text-text-mid"
                >
                  {title}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-danger">
              EXP yang kamu dapat dipotong 50% selama 4 jam ke depan.
            </p>

            <button
              onClick={onClose}
              className="mt-6 rounded-full border border-danger/60 bg-danger/10 px-6 py-2 text-sm font-semibold text-danger transition hover:bg-danger/20 active:scale-95"
            >
              Mengerti
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}