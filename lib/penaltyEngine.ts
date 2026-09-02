import { Quest, QuestCompletion } from "@/types/quest";

export const PENALTY_DURATION_MS = 4 * 60 * 60 * 1000; // 4 jam

function parseDateKey(dateKey: string): Date {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Cek quest harian yang dijadwalkan di tanggal tertentu tapi nggak ada catatan selesai
export function getMissedQuestsOnDate(
  quests: Quest[],
  completionLog: QuestCompletion[],
  dateKey: string
): Quest[] {
  const dayIndex = parseDateKey(dateKey).getDay();

  return quests.filter((quest) => {
    if (!quest.isDaily) return false;

    const scheduled =
      !quest.activeDays || quest.activeDays.length === 0 || quest.activeDays.includes(dayIndex);
    if (!scheduled) return false;

    const done = completionLog.some(
      (entry) => entry.questId === quest.id && entry.date === dateKey
    );
    return !done;
  });
}