"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Quest, QuestWithStatus } from "@/types/quest";
import { usePlayerData } from "@/hooks/usePlayerData";
import { getQuestHistory } from "@/lib/statsEngine";
import PageShell from "@/components/ui/PageShell";
import HudPanel from "@/components/ui/HudPanel";
import QuestItem from "@/components/quest/QuestItem";
import AddQuestModal from "@/components/quest/AddQuestModal";
import QuestDetailModal from "@/components/quest/QuestDetailModal";

type Filter = "all" | "daily" | "once";

export default function QuestsPage() {
  const router = useRouter();
  const {
    loaded,
    quests,
    completionLog,
    logProgress,
    addQuest,
    updateQuest,
    deleteQuest,
    canAddMoreQuests,
    freeQuestLimit,
    isPremium,
  } = usePlayerData();
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedQuest, setSelectedQuest] = useState<QuestWithStatus | null>(null);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-text-dim">
        Memuat...
      </div>
    );
  }

  const openEdit = (quest: Quest) => {
    setSelectedQuest(null);
    setEditingQuest(quest);
  };

  const handleAddClick = () => {
    if (canAddMoreQuests) {
      setModalOpen(true);
    } else {
      router.push("/account");
    }
  };

  const filtered = quests.filter((q) => {
    if (filter === "daily") return q.isDaily;
    if (filter === "once") return !q.isDaily;
    return true;
  });

  const FILTERS: { key: Filter; label: string }[] = [
    { key: "all", label: "Semua" },
    { key: "daily", label: "Harian" },
    { key: "once", label: "Sekali" },
  ];

  return (
    <PageShell>
      <HudPanel glow className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-text-mid">Manajemen</p>
            <h1 className="mt-0.5 font-display text-2xl font-bold text-text-hi">Quest</h1>
          </div>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-1 rounded-full border border-cyan-glow/50 bg-cyan-glow/5 px-3.5 py-1.5 text-xs font-semibold text-cyan-glow transition hover:bg-cyan-glow/15 hover:shadow-glow-cyan-sm active:scale-95"
          >
            <span className="text-base leading-none">+</span> Quest
          </button>
        </div>

        {!isPremium && (
          <p className="mt-2 text-[11px] text-text-dim">
            {quests.length}/{freeQuestLimit} quest gratis terpakai
          </p>
        )}

        <div className="mt-4 flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === f.key
                  ? "border-cyan-glow bg-cyan-glow/10 text-cyan-glow"
                  : "border-border/60 text-text-dim hover:text-text-mid"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </HudPanel>

      <HudPanel className="p-4 sm:p-6">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border/60 py-8 text-center text-sm text-text-dim">
            Nggak ada quest di kategori ini.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {filtered.map((quest) => (
                <QuestItem
                  key={quest.id}
                  quest={quest}
                  onLogProgress={logProgress}
                  onDelete={deleteQuest}
                  onSelect={setSelectedQuest}
                />
              ))}
            </AnimatePresence>
          </ul>
        )}
      </HudPanel>

      <AddQuestModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={addQuest} />
      <AddQuestModal
        open={!!editingQuest}
        onClose={() => setEditingQuest(null)}
        onSubmit={() => {}}
        editQuest={editingQuest}
        onEditSubmit={updateQuest}
      />
      <QuestDetailModal
        quest={selectedQuest}
        history={selectedQuest ? getQuestHistory(completionLog, selectedQuest.id) : []}
        onClose={() => setSelectedQuest(null)}
        onEdit={openEdit}
      />
    </PageShell>
  );
}