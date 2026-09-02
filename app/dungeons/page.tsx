"use client";

import { useState } from "react";
import { usePlayerData } from "@/hooks/usePlayerData";
import PageShell from "@/components/ui/PageShell";
import HudPanel from "@/components/ui/HudPanel";
import DungeonCard from "@/components/dungeon/DungeonCard";
import DungeonMissionDetailModal from "@/components/dungeon/DungeonMissionDetailModal";
import PremiumLockedCard from "@/components/premium/PremiumLockedCard";

interface SelectedMission {
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

export default function DungeonsPage() {
  const { loaded, dungeons, toggleDungeonToday, isPremium } = usePlayerData();
  const [selectedMission, setSelectedMission] = useState<SelectedMission | null>(null);

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-text-dim">
        Memuat...
      </div>
    );
  }

  return (
    <PageShell>
      <HudPanel glow className="p-4 sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-text-mid">Instance</p>
        <h1 className="mt-0.5 font-display text-2xl font-bold text-text-hi">Dungeon</h1>
        <p className="mt-2 text-xs text-text-dim">
          5 dungeon aktif bulan ini, satu per divisi. Selesaikan target harian, lalu tandai
          check-in sampai target hari tercapai sebelum bulan berganti.
        </p>
      </HudPanel>

      {!isPremium ? (
        <PremiumLockedCard
          title="Dungeon Terkunci"
          description="Akses ke misi Dungeon bulanan adalah fitur khusus pengguna Premium."
        />
      ) : (
        dungeons.map((dungeon) => (
          <DungeonCard
            key={dungeon.setId}
            name={dungeon.name}
            stat={dungeon.stat}
            daysLeft={dungeon.daysLeft}
            missions={dungeon.missions}
            onToggleToday={toggleDungeonToday}
            onSelectMission={setSelectedMission}
          />
        ))
      )}

      <DungeonMissionDetailModal mission={selectedMission} onClose={() => setSelectedMission(null)} />
    </PageShell>
  );
}