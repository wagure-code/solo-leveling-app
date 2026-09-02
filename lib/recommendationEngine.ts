import { Quest, StatKey } from "@/types/quest";
import { QUEST_TEMPLATES, QuestTemplate } from "./questTemplates";

export function getRecommendedQuests(
  focusStats: StatKey[],
  existingQuests: Quest[],
  limit = 4
): QuestTemplate[] {
  if (focusStats.length === 0) return [];

  const existingTitles = new Set(existingQuests.map((q) => q.title.trim().toLowerCase()));
  const usedInResult = new Set<string>();
  const results: QuestTemplate[] = [];
  const pointer: Record<string, number> = {};
  focusStats.forEach((s) => (pointer[s] = 0));

  let safety = 0;
  while (results.length < limit && safety < 100) {
    safety++;
    let progressed = false;

    for (const stat of focusStats) {
      if (results.length >= limit) break;

      const candidates = QUEST_TEMPLATES.filter(
        (t) =>
          t.stat === stat &&
          !existingTitles.has(t.title.trim().toLowerCase()) &&
          !usedInResult.has(t.title)
      );

      const next = candidates[pointer[stat]];
      if (next) {
        results.push(next);
        usedInResult.add(next.title);
        pointer[stat]++;
        progressed = true;
      }
    }

    if (!progressed) break;
  }

  return results;
}