interface SummaryStripProps {
  todayExp: number;
  streak: number;
  totalExp: number;
}

function formatCompact(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}

export default function SummaryStrip({ todayExp, streak, totalExp }: SummaryStripProps) {
  const items = [
    { label: "EXP Hari Ini", value: `+${todayExp}`, color: "text-cyan-glow" },
    { label: "Streak", value: `${streak} hari`, color: "text-gold" },
    { label: "Total EXP", value: formatCompact(totalExp), color: "text-violet-glow" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-border/50 bg-panel-light/30 px-2 py-3 text-center"
        >
          <p className={`font-display text-lg font-bold ${item.color}`}>{item.value}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-text-dim">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}