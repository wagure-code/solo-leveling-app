import { PlayerData, Quest } from "@/types/quest";

export const defaultPlayerData: PlayerData = {
  name: "Jin-Woo",
  rank: "E",
  totalExp: 0,
  dailyExpMap: {},
  streak: 0,
  lastActiveDate: "",
  baseStats: { STR: 10, AGI: 10, INT: 10, VIT: 10, PER: 10 },
  statExp: { STR: 0, AGI: 0, INT: 0, VIT: 0, PER: 0 },
  completionLog: [],
  penaltyUntil: null,
  lastPenaltyCheckDate: "",
  focusStats: [],
  onboardingDone: false,
  progressLog: {},
  welcomeSeen: false,
  dungeonCheckins: {},
  isPremium: false,
  redeemedCode: null,
};

export const defaultQuests: Quest[] = [
  { id: "q1", title: "Push up", stat: "STR", difficulty: "D", exp: 20, isDaily: true, activeDays: [1, 3, 5], target: 50, unit: "reps" },
  { id: "q2", title: "Lari pagi", stat: "AGI", difficulty: "C", exp: 35, isDaily: true, activeDays: [], target: 3, unit: "km" },
  { id: "q3", title: "Baca buku", stat: "INT", difficulty: "E", exp: 10, isDaily: false, activeDays: [], target: 20, unit: "halaman" },
  { id: "q4", title: "Tidur sebelum jam 23:00", stat: "VIT", difficulty: "E", exp: 10, isDaily: true, activeDays: [], target: 1, unit: "kali" },
];