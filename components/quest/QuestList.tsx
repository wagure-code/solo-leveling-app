"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { QuestWithStatus } from "@/types/quest";
import QuestItem from "./QuestItem";

interface QuestListProps {
  quests: QuestWithStatus[];
  onLogProgress: (id: string, delta: number) => void;
  onAddClick: () => void;
  onSelect?: (quest: QuestWithStatus) => void;
  limit?: number;
  viewAllHref?: string;
}

export default function QuestList({
  quests,
  onLogProgress,
  onAddClick,
  onSelect,
  limit,
  viewAllHref,
}: QuestListProps) {
  const activeCount = quests.filter((q) => !q.completed).length;
  const visibleQuests = limit ? quests.slice(0, limit) : quests;
  const hasMore = limit ? quests.length > limit : false;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-text-mid">
          Quest Aktif ({activeCount})
        </p>
        <button
          onClick={onAddClick}
          className="flex items-center gap-1 rounded-full border border-cyan-glow/50 bg-cyan-glow/5 px-3.5 py-1.5 text-xs font-semibold text-cyan-glow transition hover:bg-cyan-glow/15 hover:shadow-glow-cyan-sm active:scale-95"
        >
          <span className="text-base leading-none">+</span> Quest
        </button>
      </div>

      {quests.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border/60 py-8 text-center text-sm text-text-dim">
          Belum ada quest. Mulai buat quest pertamamu.
        </p>
      ) : (
        <ul className="flex max-h-[26rem] flex-col gap-2 overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {visibleQuests.map((quest) => (
              <QuestItem
                key={quest.id}
                quest={quest}
                onLogProgress={onLogProgress}
                onSelect={onSelect}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}

      {hasMore && viewAllHref && (
        <Link
          href={viewAllHref}
          className="mt-3 block rounded-xl border border-dashed border-border/60 py-2 text-center text-xs font-semibold text-text-mid transition hover:border-cyan-dim hover:text-cyan-glow"
        >
          Lihat semua quest ({quests.length}) →
        </Link>
      )}
    </div>
  );
}