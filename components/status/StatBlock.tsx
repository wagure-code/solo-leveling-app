import { StatKey } from "@/types/quest";
import { StatDetail } from "@/hooks/usePlayerData";
import { BadgeInfo } from "@/lib/badgeEngine";

interface StatBlockProps {
  statsDetail: Record<StatKey, StatDetail>;
  badges: Record<StatKey, BadgeInfo>;
  onBadgeClick: (stat: StatKey) => void;
}

const STAT_META: { key: StatKey; label: string }[] = [
  { key: "STR", label: "Strength" },
  { key: "AGI", label: "Agility" },
  { key: "INT", label: "Intelligence" },
  { key: "VIT", label: "Vitality" },
  { key: "PER", label: "Perception" },
];

function badgeChipColor(level: number): string {
  if (level >= 5) return "border-gold text-gold bg-gold/10";
  if (level >= 3) return "border-violet-glow/60 text-violet-glow bg-violet-glow/10";
  if (level >= 1) return "border-cyan-glow/60 text-cyan-glow bg-cyan-glow/10";
  return "border-border/50 text-text-dim bg-transparent";
}

export default function StatBlock({ statsDetail, badges, onBadgeClick }: StatBlockProps) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {STAT_META.map(({ key, label }) => {
        const detail = statsDetail[key];
        const badge = badges[key];
        const percent = Math.min(
          100,
          Math.round((detail.currentExp / detail.expToNext) * 100)
        );

        return (
          <div
            key={key}
            className="rounded-xl border border-border/50 bg-panel-light/40 px-3.5 py-2.5 transition hover:border-border"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow" />
                <div>
                  <p className="font-display text-sm font-semibold text-text-hi">{key}</p>
                  <p className="text-[10px] uppercase tracking-wide text-text-dim">{label}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onBadgeClick(key)}
                  className={`flex h-6 items-center gap-1 rounded-full border px-2 text-[10px] font-semibold transition active:scale-95 ${badgeChipColor(
                    badge.level
                  )}`}
                >
                  🏅 {badge.level > 0 ? `Lv${badge.level}` : "—"}
                </button>
                <span className="font-display text-lg font-bold text-cyan-glow">
                  {detail.value}
                </span>
              </div>
            </div>

            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-void/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-dim to-cyan-glow transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}