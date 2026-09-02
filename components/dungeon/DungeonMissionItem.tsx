interface DungeonMissionItemProps {
  title: string;
  dailyTarget: number;
  unit: string;
  requiredDays: number;
  daysCompleted: number;
  checkedToday: boolean;
  completed: boolean;
  onToggleToday: () => void;
  onSelect: () => void;
}

export default function DungeonMissionItem({
  title,
  dailyTarget,
  unit,
  requiredDays,
  daysCompleted,
  checkedToday,
  completed,
  onToggleToday,
  onSelect,
}: DungeonMissionItemProps) {
  const percent = Math.min(100, Math.round((daysCompleted / requiredDays) * 100));

  return (
    <div
      className={`rounded-xl border px-3.5 py-3 transition-colors ${
        completed
          ? "border-gold/50 bg-gold/5"
          : "border-violet-glow/30 bg-panel-light/30 hover:border-violet-glow/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleToday}
          disabled={completed}
          aria-label={checkedToday ? "Batalkan tanda hari ini" : "Tandai hari ini selesai"}
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
            checkedToday || completed
              ? "border-gold bg-gold/20 shadow-[0_0_8px_rgba(255,209,102,0.4)]"
              : "border-text-dim hover:border-violet-glow"
          } ${completed ? "cursor-default" : ""}`}
        >
          {(checkedToday || completed) && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
        </button>

        <button type="button" onClick={onSelect} className="min-w-0 flex-1 text-left">
          <p
            className={`truncate text-sm text-text-hi underline decoration-dotted underline-offset-2 ${
              completed ? "opacity-70" : ""
            }`}
          >
            {title}
          </p>
          <p className="mt-0.5 text-[11px] text-text-mid">
            Target: {dailyTarget} {unit}/hari · {daysCompleted}/{requiredDays} hari
            {completed && <span className="ml-1.5 text-gold">✓ Tuntas</span>}
          </p>
        </button>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-void/60">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            completed ? "bg-gold" : "bg-gradient-to-r from-violet-dim to-violet-glow"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}