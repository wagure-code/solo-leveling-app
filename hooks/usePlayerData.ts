"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PlayerData, PlayerStats, Quest, QuestCompletion, QuestWithStatus, StatKey } from "@/types/quest";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import {
  getLevelProgress,
  getStatProgress,
  getTodayKey,
  getYesterdayKey,
} from "@/lib/gameEngine";
import { isQuestScheduledToday } from "@/lib/scheduleEngine";
import { getMissedQuestsOnDate, PENALTY_DURATION_MS } from "@/lib/penaltyEngine";
import { getBadgeInfo, BadgeInfo } from "@/lib/badgeEngine";
import {
  getAllActiveDungeons,
  getMonthKey,
  getDaysUntilMonthEnd,
  findMissionById,
} from "@/lib/dungeonEngine";
import { FREE_QUEST_LIMIT } from "@/lib/premiumConfig";
import { isValidRedeemCode } from "@/lib/redeemEngine";
import { playQuestComplete, playLevelUp, playBadgeUnlock, playPenaltyAlert } from "@/lib/soundEngine";
import { defaultPlayerData, defaultQuests } from "@/data/mockData";

const STAT_KEYS: StatKey[] = ["STR", "AGI", "INT", "VIT", "PER"];

export interface StatDetail {
  value: number;
  currentExp: number;
  expToNext: number;
}

export interface PenaltyInfo {
  missedCount: number;
  missedTitles: string[];
}

export interface DungeonDisplay {
  setId: string;
  stat: StatKey;
  name: string;
  daysLeft: number;
  missions: {
    id: string;
    title: string;
    description: string;
    requiredDays: number;
    dailyTarget: number;
    unit: string;
    exp: number;
    daysCompleted: number;
    checkedToday: boolean;
    completed: boolean;
  }[];
}

function getProgressKey(quest: Quest, todayKey: string): string {
  return quest.isDaily ? `${quest.id}:${todayKey}` : `${quest.id}:once`;
}

export function usePlayerData() {
  const router = useRouter();
  const { user, authLoaded } = useAuth();

  const [player, setPlayer] = useState<PlayerData>(defaultPlayerData);
  const [quests, setQuests] = useState<Quest[]>(defaultQuests);
  const [loaded, setLoaded] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState<number | null>(null);
  const [penaltyInfo, setPenaltyInfo] = useState<PenaltyInfo | null>(null);

  const stateSaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const questSaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!authLoaded) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const currentUser = user;
    let cancelled = false;

    async function loadData() {
      try {
        const { data: stateRow, error: stateError } = await supabase
          .from("player_state")
          .select("data")
          .eq("user_id", currentUser.id)
          .maybeSingle();

        if (stateError) throw stateError;

        let playerData: PlayerData;
        if (stateRow) {
          const parsed = stateRow.data as Partial<PlayerData>;
          playerData = {
            ...defaultPlayerData,
            ...parsed,
            baseStats: { ...defaultPlayerData.baseStats, ...(parsed.baseStats ?? {}) },
            statExp: { ...defaultPlayerData.statExp, ...(parsed.statExp ?? {}) },
            dailyExpMap: parsed.dailyExpMap ?? {},
            completionLog: parsed.completionLog ?? [],
            penaltyUntil: parsed.penaltyUntil ?? null,
            lastPenaltyCheckDate: parsed.lastPenaltyCheckDate ?? "",
            focusStats: parsed.focusStats ?? [],
            onboardingDone: parsed.onboardingDone ?? false,
            progressLog: parsed.progressLog ?? {},
            welcomeSeen: parsed.welcomeSeen ?? false,
            dungeonCheckins: parsed.dungeonCheckins ?? {},
            isPremium: parsed.isPremium ?? false,
            redeemedCode: parsed.redeemedCode ?? null,
          };
        } else {
          playerData = defaultPlayerData;
          await supabase.from("player_state").insert({ user_id: currentUser.id, data: defaultPlayerData });
        }

        const { data: questRow, error: questError } = await supabase
          .from("player_quests")
          .select("quests")
          .eq("user_id", currentUser.id)
          .maybeSingle();

        if (questError) throw questError;

        let questsData: Quest[];
        if (questRow) {
          const parsedQuests = questRow.quests as Array<Partial<Quest>>;
          questsData = parsedQuests.map((q) => ({
            id: q.id ?? crypto.randomUUID(),
            title: q.title ?? "Quest",
            stat: q.stat ?? "STR",
            difficulty: q.difficulty ?? "E",
            exp: q.exp ?? 10,
            isDaily: q.isDaily ?? true,
            activeDays: q.activeDays ?? [],
            target: q.target ?? 1,
            unit: q.unit ?? "kali",
          }));
        } else {
          questsData = defaultQuests;
          await supabase.from("player_quests").insert({ user_id: currentUser.id, quests: defaultQuests });
        }

        if (!cancelled) {
          setPlayer(playerData);
          setQuests(questsData);
          setLoaded(true);
        }
      } catch (err) {
        console.error("Gagal memuat data dari Supabase:", err);
        if (!cancelled) setLoaded(true);
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [authLoaded, user, router]);

  useEffect(() => {
    if (!loaded || !user) return;
    const currentUser = user;
    if (stateSaveTimeout.current) clearTimeout(stateSaveTimeout.current);
    stateSaveTimeout.current = setTimeout(() => {
      supabase
        .from("player_state")
        .upsert({ user_id: currentUser.id, data: player, updated_at: new Date().toISOString() })
        .then(({ error }) => {
          if (error) console.error("Gagal menyimpan data pemain:", error);
        });
    }, 500);

    return () => {
      if (stateSaveTimeout.current) clearTimeout(stateSaveTimeout.current);
    };
  }, [player, loaded, user]);

  useEffect(() => {
    if (!loaded || !user) return;
    const currentUser = user;
    if (questSaveTimeout.current) clearTimeout(questSaveTimeout.current);
    questSaveTimeout.current = setTimeout(() => {
      supabase
        .from("player_quests")
        .upsert({ user_id: currentUser.id, quests, updated_at: new Date().toISOString() })
        .then(({ error }) => {
          if (error) console.error("Gagal menyimpan quest:", error);
        });
    }, 500);

    return () => {
      if (questSaveTimeout.current) clearTimeout(questSaveTimeout.current);
    };
  }, [quests, loaded, user]);

  useEffect(() => {
    if (!loaded) return;
    const today = getTodayKey();
    if (player.lastPenaltyCheckDate === today) return;

    if (player.lastPenaltyCheckDate === "") {
      setPlayer((prev) => ({ ...prev, lastPenaltyCheckDate: today }));
      return;
    }

    const yesterday = getYesterdayKey();
    const missed = getMissedQuestsOnDate(quests, player.completionLog, yesterday);

    if (missed.length > 0) {
      const until = new Date(Date.now() + PENALTY_DURATION_MS).toISOString();
      setPlayer((prev) => ({ ...prev, penaltyUntil: until, lastPenaltyCheckDate: today }));
      setPenaltyInfo({ missedCount: missed.length, missedTitles: missed.map((q) => q.title) });
      playPenaltyAlert();
    } else {
      setPlayer((prev) => ({ ...prev, lastPenaltyCheckDate: today }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const logProgress = useCallback(
    (id: string, delta: number) => {
      const quest = quests.find((q) => q.id === id);
      if (!quest) return;

      const today = getTodayKey();
      const key = getProgressKey(quest, today);
      const current = player.progressLog[key] ?? 0;
      const newAmount = Math.max(0, current + delta);

      const prevCompleted = current >= quest.target;
      const newCompleted = newAmount >= quest.target;

      if (prevCompleted === newCompleted) {
        setPlayer((prev) => ({
          ...prev,
          progressLog: { ...prev.progressLog, [key]: newAmount },
        }));
        return;
      }

      const completing = newCompleted;
      const isPenaltyActive =
        !!player.penaltyUntil && new Date(player.penaltyUntil).getTime() > Date.now();

      const existingEntry = quest.isDaily
        ? player.completionLog.find((e) => e.questId === id && e.date === today)
        : player.completionLog.find((e) => e.questId === id);

      const prevBadgeInfo = getBadgeInfo(quest.stat, player.completionLog);
      const buffMultiplier = 1 + prevBadgeInfo.buffPercent / 100;
      const penaltyMultiplier = isPenaltyActive ? 0.5 : 1;

      const awardedExp = completing
        ? Math.max(1, Math.round(quest.exp * buffMultiplier * penaltyMultiplier))
        : existingEntry?.exp ?? quest.exp;

      const expDelta = completing ? awardedExp : -awardedExp;
      const affectedDate = completing ? today : existingEntry?.date ?? today;

      const newTotalExp = Math.max(0, player.totalExp + expDelta);
      const prevLevel = getLevelProgress(player.totalExp).level;
      const newLevel = getLevelProgress(newTotalExp).level;

      let newStreak = player.streak;
      let newLastActive = player.lastActiveDate;

      if (completing) {
        const yesterday = getYesterdayKey();
        if (player.lastActiveDate === today) newStreak = player.streak;
        else if (player.lastActiveDate === yesterday) newStreak = player.streak + 1;
        else newStreak = 1;
        newLastActive = today;
      }

      let newLog = player.completionLog;
      if (completing) {
        const entry: QuestCompletion = {
          id: crypto.randomUUID(),
          questId: quest.id,
          questTitle: quest.title,
          stat: quest.stat,
          difficulty: quest.difficulty,
          exp: awardedExp,
          date: today,
          amount: newAmount,
        };
        newLog = [...player.completionLog, entry];
      } else if (existingEntry) {
        newLog = player.completionLog.filter((e) => e.id !== existingEntry.id);
      }

      setPlayer((prev) => ({
        ...prev,
        totalExp: newTotalExp,
        dailyExpMap: {
          ...prev.dailyExpMap,
          [affectedDate]: Math.max(0, (prev.dailyExpMap[affectedDate] ?? 0) + expDelta),
        },
        streak: newStreak,
        lastActiveDate: newLastActive,
        statExp: {
          ...prev.statExp,
          [quest.stat]: Math.max(0, prev.statExp[quest.stat] + expDelta),
        },
        completionLog: newLog,
        progressLog: { ...prev.progressLog, [key]: newAmount },
      }));

      if (newLevel > prevLevel) {
        setLevelUpInfo(newLevel);
        playLevelUp();
      } else if (completing) {
        const newBadgeInfo = getBadgeInfo(quest.stat, newLog);
        if (newBadgeInfo.level > prevBadgeInfo.level) {
          playBadgeUnlock();
        } else {
          playQuestComplete();
        }
      }
    },
    [quests, player]
  );

  const toggleDungeonToday = useCallback(
    (missionId: string) => {
      const found = findMissionById(missionId);
      if (!found) return;
      const { mission, set } = found;

      const today = getTodayKey();
      const checkinKey = `${missionId}:${today}`;
      const alreadyChecked = !!player.dungeonCheckins[checkinKey];

      if (alreadyChecked) {
        const existingEntry = player.completionLog.find(
          (e) => e.questId === missionId && e.date === today
        );
        const expDelta = existingEntry ? -existingEntry.exp : 0;
        const newTotalExp = Math.max(0, player.totalExp + expDelta);

        setPlayer((prev) => ({
          ...prev,
          totalExp: newTotalExp,
          dailyExpMap: {
            ...prev.dailyExpMap,
            [today]: Math.max(0, (prev.dailyExpMap[today] ?? 0) + expDelta),
          },
          statExp: {
            ...prev.statExp,
            [set.stat]: Math.max(0, prev.statExp[set.stat] + expDelta),
          },
          completionLog: existingEntry
            ? prev.completionLog.filter((e) => e.id !== existingEntry.id)
            : prev.completionLog,
          dungeonCheckins: { ...prev.dungeonCheckins, [checkinKey]: false },
        }));
        return;
      }

      const isPenaltyActive =
        !!player.penaltyUntil && new Date(player.penaltyUntil).getTime() > Date.now();
      const prevBadgeInfo = getBadgeInfo(set.stat, player.completionLog);
      const buffMultiplier = 1 + prevBadgeInfo.buffPercent / 100;
      const penaltyMultiplier = isPenaltyActive ? 0.5 : 1;

      const perDayExp = Math.max(1, Math.round(mission.exp / mission.requiredDays));
      const awardedExp = Math.max(1, Math.round(perDayExp * buffMultiplier * penaltyMultiplier));

      const newTotalExp = player.totalExp + awardedExp;
      const prevLevel = getLevelProgress(player.totalExp).level;
      const newLevel = getLevelProgress(newTotalExp).level;

      const yesterday = getYesterdayKey();
      let newStreak = player.streak;
      if (player.lastActiveDate === today) newStreak = player.streak;
      else if (player.lastActiveDate === yesterday) newStreak = player.streak + 1;
      else newStreak = 1;

      const entry: QuestCompletion = {
        id: crypto.randomUUID(),
        questId: missionId,
        questTitle: `[Dungeon] ${mission.title}`,
        stat: set.stat,
        difficulty: "A",
        exp: awardedExp,
        date: today,
      };
      const newLog = [...player.completionLog, entry];

      setPlayer((prev) => ({
        ...prev,
        totalExp: newTotalExp,
        dailyExpMap: {
          ...prev.dailyExpMap,
          [today]: (prev.dailyExpMap[today] ?? 0) + awardedExp,
        },
        streak: newStreak,
        lastActiveDate: today,
        statExp: {
          ...prev.statExp,
          [set.stat]: prev.statExp[set.stat] + awardedExp,
        },
        completionLog: newLog,
        dungeonCheckins: { ...prev.dungeonCheckins, [checkinKey]: true },
      }));

      if (newLevel > prevLevel) {
        setLevelUpInfo(newLevel);
        playLevelUp();
      } else {
        const newBadgeInfo = getBadgeInfo(set.stat, newLog);
        if (newBadgeInfo.level > prevBadgeInfo.level) {
          playBadgeUnlock();
        } else {
          playQuestComplete();
        }
      }
    },
    [player]
  );

  const addQuest = useCallback((newQuest: Omit<Quest, "id">) => {
    setQuests((prev) => [{ ...newQuest, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const updateQuest = useCallback((id: string, updates: Omit<Quest, "id">) => {
    setQuests((prev) => prev.map((q) => (q.id === id ? { ...updates, id } : q)));
  }, []);

  const deleteQuest = useCallback((id: string) => {
    setQuests((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const updateName = useCallback((newName: string) => {
    setPlayer((prev) => ({ ...prev, name: newName }));
  }, []);

  const setFocusStats = useCallback((stats: StatKey[]) => {
    setPlayer((prev) => ({ ...prev, focusStats: stats, onboardingDone: true }));
  }, []);

  const markWelcomeSeen = useCallback(() => {
    setPlayer((prev) => ({ ...prev, welcomeSeen: true }));
  }, []);

  const redeemCode = useCallback(
    async (code: string): Promise<{ success: boolean; message: string }> => {
      const cleaned = code.trim().toUpperCase();

      if (!isValidRedeemCode(cleaned)) {
        return { success: false, message: "Kode tidak valid. Periksa kembali penulisannya." };
      }

      if (!user) {
        return { success: false, message: "Sesi tidak ditemukan, silakan login ulang." };
      }

      if (player.redeemedCode === cleaned) {
        return { success: false, message: "Kode ini sudah pernah kamu gunakan." };
      }

      const { error } = await supabase
        .from("redeemed_codes")
        .insert({ code: cleaned, redeemed_by: user.id });

      if (error) {
        if (error.code === "23505") {
          return { success: false, message: "Kode ini sudah digunakan oleh akun lain." };
        }
        console.error("Gagal redeem kode:", error);
        return { success: false, message: "Terjadi kesalahan, coba lagi." };
      }

      setPlayer((prev) => ({ ...prev, isPremium: true, redeemedCode: cleaned }));
      return { success: true, message: "Premium berhasil diaktifkan!" };
    },
    [player.redeemedCode, user]
  );

  const resetProgress = useCallback(() => {
    setPlayer(defaultPlayerData);
    setQuests(defaultQuests);
  }, []);

  const clearLevelUp = useCallback(() => setLevelUpInfo(null), []);
  const clearPenaltyInfo = useCallback(() => setPenaltyInfo(null), []);

  const progress = getLevelProgress(player.totalExp);

  const statsDetail = STAT_KEYS.reduce((acc, key) => {
    const statProgress = getStatProgress(player.statExp[key]);
    acc[key] = {
      value: player.baseStats[key] + statProgress.statLevel,
      currentExp: statProgress.currentExp,
      expToNext: statProgress.expToNext,
    };
    return acc;
  }, {} as Record<StatKey, StatDetail>);

  const stats: PlayerStats = {
    STR: statsDetail.STR.value,
    AGI: statsDetail.AGI.value,
    INT: statsDetail.INT.value,
    VIT: statsDetail.VIT.value,
    PER: statsDetail.PER.value,
  };

  const badges = STAT_KEYS.reduce((acc, key) => {
    acc[key] = getBadgeInfo(key, player.completionLog);
    return acc;
  }, {} as Record<StatKey, BadgeInfo>);

  const todayKey = getTodayKey();
  const todayExp = player.dailyExpMap[todayKey] ?? 0;

  const questsWithStatus: QuestWithStatus[] = quests.map((q) => {
    const key = getProgressKey(q, todayKey);
    const questProgress = player.progressLog[key] ?? 0;
    return {
      ...q,
      completed: questProgress >= q.target,
      scheduledToday: isQuestScheduledToday(q),
      progress: questProgress,
    };
  });

  const isPenaltyActive =
    !!player.penaltyUntil && new Date(player.penaltyUntil).getTime() > Date.now();

  const monthKey = getMonthKey();
  const daysLeft = getDaysUntilMonthEnd();
  const dungeons: DungeonDisplay[] = getAllActiveDungeons().map((set) => ({
    setId: set.id,
    stat: set.stat,
    name: set.name,
    daysLeft,
    missions: set.missions.map((m) => {
      const checkedToday = !!player.dungeonCheckins[`${m.id}:${todayKey}`];
      const daysCompleted = Object.keys(player.dungeonCheckins).filter(
        (k) => k.startsWith(`${m.id}:${monthKey}`) && player.dungeonCheckins[k]
      ).length;
      return {
        id: m.id,
        title: m.title,
        description: m.description,
        requiredDays: m.requiredDays,
        dailyTarget: m.dailyTarget,
        unit: m.unit,
        exp: m.exp,
        daysCompleted,
        checkedToday,
        completed: daysCompleted >= m.requiredDays,
      };
    }),
  }));

  const canAddMoreQuests = player.isPremium || quests.length < FREE_QUEST_LIMIT;

  return {
    loaded,
    name: player.name,
    rank: player.rank,
    level: progress.level,
    currentExp: progress.currentExp,
    expToNextLevel: progress.expToNextLevel,
    totalExp: player.totalExp,
    todayExp,
    streak: player.streak,
    dailyExpMap: player.dailyExpMap,
    completionLog: player.completionLog,
    stats,
    statsDetail,
    badges,
    quests: questsWithStatus,
    logProgress,
    addQuest,
    updateQuest,
    deleteQuest,
    updateName,
    resetProgress,
    levelUpInfo,
    clearLevelUp,
    penaltyInfo,
    clearPenaltyInfo,
    isPenaltyActive,
    penaltyUntil: player.penaltyUntil,
    focusStats: player.focusStats,
    onboardingDone: player.onboardingDone,
    setFocusStats,
    welcomeSeen: player.welcomeSeen,
    markWelcomeSeen,
    dungeons,
    toggleDungeonToday,
    isPremium: player.isPremium,
    redeemCode,
    redeemedCode: player.redeemedCode,
    canAddMoreQuests,
    freeQuestLimit: FREE_QUEST_LIMIT,
  };
}