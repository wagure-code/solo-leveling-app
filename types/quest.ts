export type StatKey = "STR" | "AGI" | "INT" | "VIT" | "PER";
export type Difficulty = "E" | "D" | "C" | "B" | "A";

export interface Quest {
  id: string;
  title: string;
  stat: StatKey;
  difficulty: Difficulty;
  exp: number;
  isDaily: boolean;
  activeDays: number[];
  target: number;
  unit: string;
}

export interface QuestWithStatus extends Quest {
  completed: boolean;
  scheduledToday: boolean;
  progress: number;
}

export interface PlayerStats {
  STR: number;
  AGI: number;
  INT: number;
  VIT: number;
  PER: number;
}

export interface QuestCompletion {
  id: string;
  questId: string;
  questTitle: string;
  stat: StatKey;
  difficulty: Difficulty;
  exp: number;
  date: string;
  amount?: number;
}

export interface PlayerData {
  name: string;
  rank: string;
  totalExp: number;
  dailyExpMap: Record<string, number>;
  streak: number;
  lastActiveDate: string;
  baseStats: PlayerStats;
  statExp: PlayerStats;
  completionLog: QuestCompletion[];
  penaltyUntil: string | null;
  lastPenaltyCheckDate: string;
  focusStats: StatKey[];
  onboardingDone: boolean;
  progressLog: Record<string, number>;
  welcomeSeen: boolean;
  dungeonCheckins: Record<string, boolean>;
  isPremium: boolean;
  redeemedCode: string | null;
}

export const DIFFICULTY_EXP: Record<Difficulty, number> = {
  E: 10,
  D: 20,
  C: 35,
  B: 55,
  A: 80,
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  E: "E-Rank",
  D: "D-Rank",
  C: "C-Rank",
  B: "B-Rank",
  A: "A-Rank",
};