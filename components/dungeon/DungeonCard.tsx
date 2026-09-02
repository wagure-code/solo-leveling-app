import HudPanel from "@/components/ui/HudPanel";
import DungeonMissionItem from "./DungeonMissionItem";

interface DungeonMission {
  id: string;
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

interface DungeonCardProps {
  name: string;
  stat: string;
  daysLeft: number;
  missions: DungeonMission[];
  onToggleToday: (missionId: string) => void;
  onSelectMission: (mission: DungeonMission) => void;
}

export default function DungeonCard({
  name,
  stat,
  daysLeft,
  missions,
  onToggleToday,
  onSelectMission,
}: DungeonCardProps) {
  const completedCount = missions.filter((m) => m.completed).length;
  const urgent = daysLeft <= 5;

  return (
    <HudPanel className="border-violet-glow/40 p-4 sm:p-6">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="rounded-full border border-violet-glow/50 bg-violet-glow/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-violet-glow">
            {stat}
          </span>
          <h3 className="mt-1.5 font-display text-base font-bold text-text-hi">{name}</h3>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className={`text-xs font-semibold ${urgent ? "text-danger" : "text-text-mid"}`}>
            {daysLeft} hari lagi
          </p>
          <p className="text-[10px] text-text-dim">
            {completedCount}/{missions.length} misi
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {missions.map((mission) => (
          <DungeonMissionItem
            key={mission.id}
            title={mission.title}
            dailyTarget={mission.dailyTarget}
            unit={mission.unit}
            requiredDays={mission.requiredDays}
            daysCompleted={mission.daysCompleted}
            checkedToday={mission.checkedToday}
            completed={mission.completed}
            onToggleToday={() => onToggleToday(mission.id)}
            onSelect={() => onSelectMission(mission)}
          />
        ))}
      </div>
    </HudPanel>
  );
}