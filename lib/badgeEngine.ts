import { QuestCompletion, StatKey } from "@/types/quest";

const BUFF_BY_LEVEL: Record<number, number> = {
  1: 5,
  2: 8,
  3: 10,
  4: 15,
  5: 20,
};

const THRESHOLD_BY_LEVEL: Record<number, number> = {
  1: 5,
  2: 15,
  3: 30,
  4: 50,
  5: 80,
};

export const BADGE_NAMES: Record<StatKey, string[]> = {
  STR: ["Iron Body", "Steel Frame", "Battle Forged", "Titan's Grip", "Colossus Ascendant"],
  AGI: ["Swift Step", "Momentum Runner", "Relentless Pace", "Storm Chaser", "Velocity Incarnate"],
  VIT: ["Steady Pulse", "Resilient Core", "Vital Guardian", "Endurance Warden", "Immortal Vessel"],
  INT: ["Curious Mind", "Keen Insight", "Scholar's Path", "Arcane Intellect", "Omniscient Sage"],
  PER: ["Sharp Sense", "Clear Vision", "Unshaken Will", "Void Watcher", "Absolute Perception"],
};

export interface BadgeInfo {
  level: number; // 0 = belum punya badge
  name: string | null;
  buffPercent: number;
  completionCount: number;
  nextThreshold: number | null;
  nextName: string | null;
  progressToNext: number; // 0-100
}

export function getStatCompletionCount(completionLog: QuestCompletion[], stat: StatKey): number {
  return completionLog.filter((entry) => entry.stat === stat).length;
}

export function getBadgeInfo(stat: StatKey, completionLog: QuestCompletion[]): BadgeInfo {
  const count = getStatCompletionCount(completionLog, stat);
  const names = BADGE_NAMES[stat];

  let level = 0;
  for (let lv = 5; lv >= 1; lv--) {
    if (count >= THRESHOLD_BY_LEVEL[lv]) {
      level = lv;
      break;
    }
  }

  const baseThreshold = level > 0 ? THRESHOLD_BY_LEVEL[level] : 0;
  const nextLevel = level < 5 ? level + 1 : null;
  const nextThreshold = nextLevel ? THRESHOLD_BY_LEVEL[nextLevel] : null;

  const progressToNext =
    nextThreshold !== null
      ? Math.min(100, Math.round(((count - baseThreshold) / (nextThreshold - baseThreshold)) * 100))
      : 100;

  return {
    level,
    name: level > 0 ? names[level - 1] : null,
    buffPercent: level > 0 ? BUFF_BY_LEVEL[level] : 0,
    completionCount: count,
    nextThreshold,
    nextName: nextLevel ? names[nextLevel - 1] : null,
    progressToNext,
  };
}