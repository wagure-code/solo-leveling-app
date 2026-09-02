"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DIFFICULTY_LABEL, Quest, QuestCompletion } from "@/types/quest";

interface QuestDetailModalProps {
  quest: Quest | null;
  history: QuestCompletion[];
  onClose: () => void;
  onEdit?: (quest: Quest) => void;
}

function formatIndoDate(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function QuestDetailModal({ quest, history, onClose, onEdit }: QuestDetailModalProps) {
  return (
    <AnimatePresence>
      {quest && (
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
            className="hud-corner relative flex max-h-[80vh] w-full max-w-md flex-col rounded-2xl border border-cyan-glow/50 bg-panel/95 backdrop-blur-md p-5 shadow-glow-cyan sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-[0.2em] text-text-mid">Detail Quest</p>
                <h2 className="mt-0.5 truncate font-display text-xl font-bold text-text-hi">
                  {quest.title}
                </h2>
              </div>
              {onEdit && (
                <button
                  onClick={() => onEdit(quest)}
                  className="flex-shrink-0 rounded-full border border-cyan-glow/50 bg-cyan-glow/5 px-3 py-1.5 text-xs font-semibold text-cyan-glow transition hover:bg-cyan-glow/15"
                >
                  ✎ Edit
                </button>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-text-dim">
              <span>{quest.stat}</span>
              <span>·</span>
              <span>{DIFFICULTY_LABEL[quest.difficulty]}</span>
              <span>·</span>
              <span>
                Target {quest.target} {quest.unit}
              </span>
              <span>·</span>
              <span>{quest.isDaily ? "Harian" : "Sekali"}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-border/50 bg-panel-light/30 px-3 py-3 text-center">
                <p className="font-display text-lg font-bold text-cyan-glow">{history.length}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wide text-text-dim">Total Selesai</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-panel-light/30 px-3 py-3 text-center">
                <p className="font-display text-lg font-bold text-gold">+{quest.exp}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wide text-text-dim">EXP / Selesai</p>
              </div>
            </div>

            <p className="mt-4 mb-2 text-[11px] uppercase tracking-[0.2em] text-text-mid">
              Riwayat Pengerjaan
            </p>

            {history.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border/60 py-6 text-center text-sm text-text-dim">
                Belum pernah diselesaikan.
              </p>
            ) : (
              <ul className="flex flex-col gap-1.5 overflow-y-auto pr-1">
                {history.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-center justify-between rounded-lg border border-border/40 bg-panel-light/20 px-3 py-2 text-sm"
                  >
                    <span className="text-text-hi">{formatIndoDate(entry.date)}</span>
                    <span className="text-xs font-semibold text-gold">+{entry.exp} EXP</span>
                  </li>
                ))}
              </ul>
            )}

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