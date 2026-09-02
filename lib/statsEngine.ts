import { QuestCompletion, StatKey } from "@/types/quest";

export interface DayExp {
  dateKey: string;
  label: string;
  exp: number;
}

const DAY_LABELS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function formatDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Ambil 7 hari terakhir (termasuk hari ini), urut dari yang paling lama ke terbaru
export function getLast7DaysExp(dailyExpMap: Record<string, number>): DayExp[] {
  const days: DayExp[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = formatDateKey(d);
    days.push({
      dateKey: key,
      label: DAY_LABELS[d.getDay()],
      exp: dailyExpMap[key] ?? 0,
    });
  }
  return days;
}

const STAT_KEYS: StatKey[] = ["STR", "AGI", "INT", "VIT", "PER"];

// Hitung berapa kali tiap stat "disentuh" lewat quest yang diselesaikan,
// lalu dinormalisasi 0-100 relatif terhadap stat yang paling sering dikerjakan.
export function getStatDistribution(completionLog: QuestCompletion[]): Record<StatKey, number> {
  const counts: Record<StatKey, number> = { STR: 0, AGI: 0, INT: 0, VIT: 0, PER: 0 };
  completionLog.forEach((entry) => {
    counts[entry.stat] += 1;
  });

  const max = Math.max(1, ...STAT_KEYS.map((k) => counts[k]));

  const distribution: Record<StatKey, number> = { STR: 0, AGI: 0, INT: 0, VIT: 0, PER: 0 };
  STAT_KEYS.forEach((key) => {
    distribution[key] = Math.round((counts[key] / max) * 100);
  });

  return distribution;
}

export function getQuestHistory(completionLog: QuestCompletion[], questId: string): QuestCompletion[] {
  return completionLog
    .filter((entry) => entry.questId === questId)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getActiveDaysCount(dailyExpMap: Record<string, number>): number {
  return Object.values(dailyExpMap).filter((exp) => exp > 0).length;
}

export function getAverageExpPerActiveDay(dailyExpMap: Record<string, number>): number {
  const activeDays = getActiveDaysCount(dailyExpMap);
  if (activeDays === 0) return 0;
  const total = Object.values(dailyExpMap).reduce((a, b) => a + b, 0);
  return Math.round(total / activeDays);
}