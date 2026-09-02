"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QuestWithStatus } from "@/types/quest";
import { formatScheduleLabel } from "@/lib/scheduleEngine";

interface QuestItemProps {
  quest: QuestWithStatus;
  onLogProgress: (id: string, delta: number) => void;
  onDelete?: (id: string) => void;
  onSelect?: (quest: QuestWithStatus) => void;
}

const DIFFICULTY_COLOR: Record<QuestWithStatus["difficulty"], string> = {
  E: "text-text-mid border-border",
  D: "text-cyan-glow border-cyan-dim",
  C: "text-cyan-glow border-cyan-glow",
  B: "text-violet-glow border-violet-glow",
  A: "text-danger border-danger",
};

const QUICK_STEPS = [1, 5, 10];

export default function QuestItem({ quest, onLogProgress, onDelete, onSelect }: QuestItemProps) {
  const [manualValue, setManualValue] = useState("");
  const locked = !quest.scheduledToday && !quest.completed;
  const percent = Math.min(100, Math.round((quest.progress / quest.target) * 100));

  const handleManualAdd = () => {
    const amount = Number(manualValue);
    if (!amount || amount <= 0) return;
    onLogProgress(quest.id, amount);
    setManualValue("");
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      className={`rounded-xl border border-border/50 bg-panel-light/30 px-3.5 py-3 transition-colors ${
        quest.completed ? "opacity-60" : "hover:border-cyan-dim"
      } ${locked ? "opacity-50" : ""}`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onSelect?.(quest)}
          disabled={!onSelect}
          className="min-w-0 flex-1 text-left"
        >
          <p className={`truncate text-sm text-text-hi ${quest.completed ? "line-through" : ""}`}>
            {quest.title}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-wide text-text-dim">
            <span>{quest.stat}</span>
            <span>·</span>
            <span>{formatScheduleLabel(quest)}</span>
            {locked && (
              <span className="rounded-full border border-border/60 px-1.5 py-0.5 text-text-dim">
                Off hari ini
              </span>
            )}
          </div>
        </button>

        <div className="flex flex-shrink-0 flex-col items-end gap-1">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${DIFFICULTY_COLOR[quest.difficulty]}`}
          >
            {quest.difficulty}
          </span>
          <span className="text-[10px] font-semibold text-gold">+{quest.exp} EXP</span>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(quest.id)}
            aria-label="Hapus quest"
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-text-dim transition hover:bg-danger/10 hover:text-danger"
          >
            ×
          </button>
        )}
      </div>

      <div className="mt-2.5">
        <div className="mb-1 flex items-center justify-between text-[11px] text-text-mid">
          <span>
            {quest.progress} / {quest.target} {quest.unit}
          </span>
          {quest.completed && <span className="text-cyan-glow">Selesai ✓</span>}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-void/60">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              quest.completed ? "bg-cyan-glow" : "bg-gradient-to-r from-cyan-dim to-cyan-glow"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {!locked && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {QUICK_STEPS.map((step) => (
            <button
              key={step}
              onClick={() => onLogProgress(quest.id, step)}
              className="rounded-full border border-cyan-glow/40 bg-cyan-glow/5 px-2.5 py-1 text-[11px] font-semibold text-cyan-glow transition hover:bg-cyan-glow/15 active:scale-95"
            >
              +{step}
            </button>
          ))}

          <div className="flex items-center gap-1">
            <input
              type="number"
              inputMode="numeric"
              value={manualValue}
              onChange={(e) => setManualValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualAdd()}
              placeholder="0"
              className="w-14 rounded-full border border-border bg-void px-2 py-1 text-center text-[11px] text-text-hi outline-none focus:border-cyan-glow"
            />
            <button
              onClick={handleManualAdd}
              className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] text-text-mid transition hover:border-cyan-dim hover:text-cyan-glow"
            >
              Tambah
            </button>
          </div>

          {quest.progress > 0 && (
            <button
              onClick={() => onLogProgress(quest.id, -quest.progress)}
              className="ml-auto rounded-full px-2 py-1 text-[11px] text-text-dim transition hover:text-danger"
            >
              ↺ Reset
            </button>
          )}
        </div>
      )}
    </motion.li>
  );
}