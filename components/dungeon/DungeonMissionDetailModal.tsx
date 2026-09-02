"use client";

import { AnimatePresence, motion } from "framer-motion";

interface DungeonMissionDetail {
  title: string;
  description: string;
  requiredDays: number;
  dailyTarget: number;
  unit: string;
  exp: number;
  daysCompleted: number;
  checkedToday: boolean;
  completed: boolean;
}

interface DungeonMissionDetailModalProps {
  mission: DungeonMissionDetail | null;
  onClose: () => void;
}

export default function DungeonMissionDetailModal({ mission, onClose }: DungeonMissionDetailModalProps) {
  return (
    <AnimatePresence>
      {mission && (
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
            className="hud-corner relative w-full max-w-md rounded-2xl border border-violet-glow/50 bg-panel/95 backdrop-blur-md p-5 shadow-glow-violet sm:p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-text-mid">Misi Dungeon</p>
            <h2 className="mt-0.5 font-display text-xl font-bold text-text-hi">{mission.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-mid">{mission.description}</p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-border/50 bg-panel-light/30 px-2 py-3 text-center">
                <p className="font-display text-base font-bold text-violet-glow">
                  {mission.dailyTarget} {mission.unit}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-wide text-text-dim">
                  Per Hari
                </p>
              </div>
              <div className="rounded-xl border border-border/50 bg-panel-light/30 px-2 py-3 text-center">
                <p className="font-display text-base font-bold text-cyan-glow">
                  {mission.requiredDays}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-wide text-text-dim">
                  Hari Diperlukan
                </p>
              </div>
              <div className="rounded-xl border border-border/50 bg-panel-light/30 px-2 py-3 text-center">
                <p className="font-display text-base font-bold text-gold">{mission.exp}</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-wide text-text-dim">
                  Total EXP
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border/40 bg-panel-light/20 px-3.5 py-2.5 text-center text-sm">
              <span className="text-text-hi">
                Progress: {mission.daysCompleted} / {mission.requiredDays} hari
              </span>
              {mission.completed && <span className="ml-2 text-gold">✓ Tuntas</span>}
              {!mission.completed && mission.checkedToday && (
                <p className="mt-1 text-xs text-gold">Sudah ditandai hari ini</p>
              )}
            </div>

            <p className="mt-3 text-center text-[11px] text-text-dim">
              Selesaikan target harian ({mission.dailyTarget} {mission.unit}), lalu tandai selesai.
              Hanya bisa ditandai 1 kali per hari, dan bisa dikerjakan di hari mana saja.
            </p>

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