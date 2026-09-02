export const BASE_EXP = 100;
export const GROWTH_RATE = 1.12; // EXP kebutuhan naik level karakter, naik 12% tiap level

export const STAT_BASE_EXP = 30;
export const STAT_GROWTH_RATE = 1.08; // EXP kebutuhan naik stat, naik 8% tiap level stat

export function expRequiredForLevel(level: number): number {
  return Math.round(BASE_EXP * Math.pow(GROWTH_RATE, level - 1));
}

export function getLevelProgress(totalExp: number) {
  let level = 1;
  let remaining = totalExp;

  while (remaining >= expRequiredForLevel(level)) {
    remaining -= expRequiredForLevel(level);
    level++;
  }

  return {
    level,
    currentExp: remaining,
    expToNextLevel: expRequiredForLevel(level),
  };
}

export function statExpRequiredForLevel(statLevel: number): number {
  return Math.round(STAT_BASE_EXP * Math.pow(STAT_GROWTH_RATE, statLevel));
}

// Sama pola dengan getLevelProgress, tapi buat satu stat individual.
// statLevel = berapa kali stat ini "naik level" dari histori quest yang terkait.
export function getStatProgress(statExpTotal: number) {
  let statLevel = 0;
  let remaining = statExpTotal;

  while (remaining >= statExpRequiredForLevel(statLevel)) {
    remaining -= statExpRequiredForLevel(statLevel);
    statLevel++;
  }

  return {
    statLevel,
    currentExp: remaining,
    expToNext: statExpRequiredForLevel(statLevel),
  };
}

function formatDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayKey(): string {
  return formatDateKey(new Date());
}

export function getYesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDateKey(d);
}