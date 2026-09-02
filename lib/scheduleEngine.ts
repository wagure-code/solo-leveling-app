import { Quest, QuestCompletion } from "@/types/quest";

export const DAY_LABELS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export function getTodayDayIndex(): number {
  return new Date().getDay();
}

// activeDays kosong ATAU quest sekali = dianggap tersedia tiap hari
export function isQuestScheduledToday(quest: Quest): boolean {
  if (!quest.isDaily) return true;
  if (!quest.activeDays || quest.activeDays.length === 0) return true;
  return quest.activeDays.includes(getTodayDayIndex());
}

// Quest sekali: selesai kalau PERNAH ada catatan riwayat (tanggal berapa pun)
// Quest harian: selesai kalau ada catatan riwayat PERSIS di hari ini
export function isQuestCompletedToday(
  quest: Quest,
  log: QuestCompletion[],
  todayKey: string
): boolean {
  if (!quest.isDaily) {
    return log.some((entry) => entry.questId === quest.id);
  }
  return log.some((entry) => entry.questId === quest.id && entry.date === todayKey);
}

export function formatScheduleLabel(quest: Quest): string {
  if (!quest.isDaily) return "Sekali";
  if (!quest.activeDays || quest.activeDays.length === 0) return "Setiap hari";
  if (quest.activeDays.length === 7) return "Setiap hari";
  return quest.activeDays
    .slice()
    .sort((a, b) => a - b)
    .map((d) => DAY_LABELS[d])
    .join("/");
}