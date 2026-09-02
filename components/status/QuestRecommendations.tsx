"use client";

import { DIFFICULTY_EXP, DIFFICULTY_LABEL, Quest, StatKey } from "@/types/quest";
import { getRecommendedQuests } from "@/lib/recommendationEngine";
import HudPanel from "@/components/ui/HudPanel";

interface QuestRecommendationsProps {
  focusStats: StatKey[];
  quests: Quest[];
  onAdd: (quest: Omit<Quest, "id">) => void;
}

export default function QuestRecommendations({ focusStats, quests, onAdd }: QuestRecommendationsProps) {
  if (focusStats.length === 0) return null;

  const recommendations = getRecommendedQuests(focusStats, quests, 4);
  if (recommendations.length === 0) return null;

  return (
    <HudPanel className="p-4 sm:p-6">
      <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-text-mid">Rekomendasi Quest</p>
      <p className="mb-3 text-[11px] text-text-dim">Berdasarkan aspek yang ingin kamu tingkatkan</p>

      <div className="flex flex-col gap-2">
        {recommendations.map((rec) => (
          <div
            key={rec.title}
            className="flex items-center gap-3 rounded-xl border border-border/50 bg-panel-light/30 px-3.5 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-text-hi">{rec.title}</p>
              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-wide text-text-dim">
                <span>{rec.stat}</span>
                <span>·</span>
                <span>{DIFFICULTY_LABEL[rec.difficulty]}</span>
                <span>·</span>
                <span>
                  Target {rec.target} {rec.unit}
                </span>
                <span>·</span>
                <span className="text-gold">+{DIFFICULTY_EXP[rec.difficulty]} EXP</span>
              </div>
            </div>
            <button
              onClick={() =>
                onAdd({
                  title: rec.title,
                  stat: rec.stat,
                  difficulty: rec.difficulty,
                  exp: DIFFICULTY_EXP[rec.difficulty],
                  isDaily: rec.isDaily,
                  activeDays: rec.activeDays,
                  target: rec.target,
                  unit: rec.unit,
                })
              }
              className="flex-shrink-0 rounded-full border border-cyan-glow/50 bg-cyan-glow/5 px-3 py-1.5 text-xs font-semibold text-cyan-glow transition hover:bg-cyan-glow/15 active:scale-95"
            >
              + Tambah
            </button>
          </div>
        ))}
      </div>
    </HudPanel>
  );
}