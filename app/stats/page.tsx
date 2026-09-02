"use client";

import { usePlayerData } from "@/hooks/usePlayerData";
import {
  getLast7DaysExp,
  getStatDistribution,
  getActiveDaysCount,
  getAverageExpPerActiveDay,
} from "@/lib/statsEngine";
import PageShell from "@/components/ui/PageShell";
import HudPanel from "@/components/ui/HudPanel";
import TrendChart from "@/components/charts/TrendChart";
import RadarChart from "@/components/charts/RadarChart";
import PremiumLockedCard from "@/components/premium/PremiumLockedCard";

export default function StatsPage() {
  const { loaded, dailyExpMap, completionLog, isPremium } = usePlayerData();

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-text-dim">
        Memuat...
      </div>
    );
  }

  const trend = getLast7DaysExp(dailyExpMap);
  const distribution = getStatDistribution(completionLog);
  const activeDays = getActiveDaysCount(dailyExpMap);
  const avgExp = getAverageExpPerActiveDay(dailyExpMap);
  const recentCompletions = [...completionLog].reverse().slice(0, 8);

  function formatIndoDate(dateKey: string): string {
    const [y, m, d] = dateKey.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  }

  return (
    <PageShell>
      <HudPanel glow className="p-4 sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-text-mid">Statistik</p>
        <h1 className="mt-0.5 font-display text-2xl font-bold text-text-hi">Progress Hunter</h1>
      </HudPanel>

      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-xl border border-border/50 bg-panel-light/30 px-2 py-3 text-center">
          <p className="font-display text-lg font-bold text-cyan-glow">{completionLog.length}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-text-dim">Quest Selesai</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-panel-light/30 px-2 py-3 text-center">
          <p className="font-display text-lg font-bold text-gold">{activeDays}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-text-dim">Hari Aktif</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-panel-light/30 px-2 py-3 text-center">
          <p className="font-display text-lg font-bold text-violet-glow">{avgExp}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-text-dim">Rata² EXP/Hari</p>
        </div>
      </div>

      <HudPanel className="p-4 sm:p-6">
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-text-mid">
          EXP 7 Hari Terakhir
        </p>
        <TrendChart data={trend} />
      </HudPanel>

      {!isPremium ? (
        <PremiumLockedCard
          title="Diagram & Riwayat Lengkap Terkunci"
          description="Distribusi fokus stat dan riwayat quest lengkap adalah fitur Premium."
        />
      ) : (
        <>
          <HudPanel className="p-4 sm:p-6">
            <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-text-mid">
              Distribusi Fokus Stat
            </p>
            <p className="mb-2 text-[11px] text-text-dim">
              Berdasarkan seberapa sering quest tiap stat diselesaikan
            </p>
            <RadarChart data={distribution} />
          </HudPanel>

          <HudPanel className="p-4 sm:p-6">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-text-mid">
              Riwayat Terbaru
            </p>
            {recentCompletions.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border/60 py-8 text-center text-sm text-text-dim">
                Belum ada quest yang diselesaikan.
              </p>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {recentCompletions.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-center justify-between rounded-lg border border-border/40 bg-panel-light/20 px-3 py-2 text-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-text-hi">{entry.questTitle}</p>
                      <p className="text-[10px] uppercase tracking-wide text-text-dim">
                        {entry.stat} · {formatIndoDate(entry.date)}
                      </p>
                    </div>
                    <span className="ml-2 flex-shrink-0 text-xs font-semibold text-gold">
                      +{entry.exp}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </HudPanel>
        </>
      )}
    </PageShell>
  );
}