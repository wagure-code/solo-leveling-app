"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Quest, QuestWithStatus, StatKey } from "@/types/quest";
import { usePlayerData } from "@/hooks/usePlayerData";
import { getQuestHistory } from "@/lib/statsEngine";
import HudPanel from "@/components/ui/HudPanel";
import PageShell from "@/components/ui/PageShell";
import WelcomePage from "@/components/welcome/WelcomePage";
import StatusHeader from "./StatusHeader";
import ExpBar from "./ExpBar";
import StatBlock from "./StatBlock";
import SummaryStrip from "./SummaryStrip";
import StatusAlerts from "./StatusAlerts";
import QuestRecommendations from "./QuestRecommendations";
import LevelUpModal from "./LevelUpModal";
import PenaltyModal from "./PenaltyModal";
import LevelDetailModal from "./LevelDetailModal";
import BadgeDetailModal from "./BadgeDetailModal";
import QuestList from "@/components/quest/QuestList";
import AddQuestModal from "@/components/quest/AddQuestModal";
import QuestDetailModal from "@/components/quest/QuestDetailModal";
import OnboardingModal from "@/components/onboarding/OnboardingModal";

export default function StatusWindow() {
  const router = useRouter();
  const {
    loaded,
    name,
    rank,
    level,
    currentExp,
    expToNextLevel,
    totalExp,
    todayExp,
    streak,
    statsDetail,
    badges,
    quests,
    completionLog,
    logProgress,
    addQuest,
    updateQuest,
    levelUpInfo,
    clearLevelUp,
    penaltyInfo,
    clearPenaltyInfo,
    isPenaltyActive,
    penaltyUntil,
    focusStats,
    onboardingDone,
    setFocusStats,
    welcomeSeen,
    markWelcomeSeen,
    canAddMoreQuests,
  } = usePlayerData();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<QuestWithStatus | null>(null);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [levelDetailOpen, setLevelDetailOpen] = useState(false);
  const [selectedBadgeStat, setSelectedBadgeStat] = useState<StatKey | null>(null);

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-text-dim">
        Memuat status...
      </div>
    );
  }

  if (!welcomeSeen) {
    return <WelcomePage onContinue={markWelcomeSeen} />;
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

  return (
    <PageShell>
      <HudPanel glow scanline className="p-4 sm:p-6">
        <StatusHeader
          name={name}
          rank={rank}
          level={level}
          onLevelClick={() => setLevelDetailOpen(true)}
        />
        <div className="mt-4">
          <ExpBar current={currentExp} max={expToNextLevel} />
        </div>
      </HudPanel>

      <StatusAlerts quests={quests} isPenaltyActive={isPenaltyActive} penaltyUntil={penaltyUntil} />

      <SummaryStrip todayExp={todayExp} streak={streak} totalExp={totalExp} />

      <QuestRecommendations focusStats={focusStats} quests={quests} onAdd={addQuest} />

      <HudPanel className="p-4 sm:p-6">
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-text-mid">Stats</p>
        <StatBlock statsDetail={statsDetail} badges={badges} onBadgeClick={setSelectedBadgeStat} />
      </HudPanel>

      <HudPanel className="p-4 sm:p-6">
        <QuestList
          quests={quests}
          onLogProgress={logProgress}
          onAddClick={handleAddClick}
          onSelect={setSelectedQuest}
          limit={4}
          viewAllHref="/quests"
        />
      </HudPanel>

      <AddQuestModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={addQuest} />
      <AddQuestModal
        open={!!editingQuest}
        onClose={() => setEditingQuest(null)}
        onSubmit={() => {}}
        editQuest={editingQuest}
        onEditSubmit={updateQuest}
      />
      <LevelUpModal level={levelUpInfo} onClose={clearLevelUp} />
      <PenaltyModal info={penaltyInfo} onClose={clearPenaltyInfo} />
      <LevelDetailModal
        open={levelDetailOpen}
        currentLevel={level}
        currentExp={currentExp}
        onClose={() => setLevelDetailOpen(false)}
      />
      <BadgeDetailModal
        stat={selectedBadgeStat}
        badge={selectedBadgeStat ? badges[selectedBadgeStat] : null}
        onClose={() => setSelectedBadgeStat(null)}
      />
      <QuestDetailModal
        quest={selectedQuest}
        history={selectedQuest ? getQuestHistory(completionLog, selectedQuest.id) : []}
        onClose={() => setSelectedQuest(null)}
        onEdit={openEdit}
      />
      <OnboardingModal
        open={!onboardingDone}
        initialFocus={focusStats}
        dismissable={false}
        onSubmit={setFocusStats}
        onDismiss={() => {}}
      />
    </PageShell>
  );
}