import { DayExp } from "@/lib/statsEngine";

interface TrendChartProps {
  data: DayExp[];
}

export default function TrendChart({ data }: TrendChartProps) {
  const max = Math.max(1, ...data.map((d) => d.exp));
  const todayKey = data[data.length - 1]?.dateKey;

  return (
    <div className="flex items-end justify-between gap-2 px-1">
      {data.map((day) => {
        const heightPercent = Math.max(4, Math.round((day.exp / max) * 100));
        const isToday = day.dateKey === todayKey;
        return (
          <div key={day.dateKey} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[10px] font-semibold text-cyan-glow">
              {day.exp > 0 ? `+${day.exp}` : ""}
            </span>
            <div className="flex h-24 w-full items-end overflow-hidden rounded-md bg-void/40">
              <div
                className={`w-full rounded-md transition-all duration-500 ${
                  isToday
                    ? "bg-gradient-to-t from-cyan-dim to-cyan-glow shadow-glow-cyan-sm"
                    : "bg-gradient-to-t from-cyan-dim/40 to-cyan-glow/50"
                }`}
                style={{ height: `${heightPercent}%` }}
              />
            </div>
            <span className="text-[10px] uppercase text-text-dim">{day.label}</span>
          </div>
        );
      })}
    </div>
  );
}