"use client";

import { QuestWithStatus } from "@/types/quest";
import CountdownTimer from "./CountdownTimer";

interface StatusAlertsProps {
  quests: QuestWithStatus[];
  isPenaltyActive: boolean;
  penaltyUntil: string | null;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export default function StatusAlerts({ quests, isPenaltyActive, penaltyUntil }: StatusAlertsProps) {
  const pending = quests.filter((q) => q.scheduledToday && !q.completed);

  if (!isPenaltyActive && pending.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {isPenaltyActive && penaltyUntil && (
        <div className="rounded-xl border border-danger/60 bg-danger/10 px-3.5 py-2.5">
          <p className="text-xs font-semibold text-danger">
            ⚠ Penalty aktif — EXP dipotong 50% sampai {formatTime(penaltyUntil)}
          </p>
          <p className="mt-0.5 text-[11px] text-text-dim">
            Ada quest harian kemarin yang tidak diselesaikan.
          </p>
        </div>
      )}

      {pending.length > 0 && (
        <>
          <div className="rounded-xl border border-gold/40 bg-gold/5 px-3.5 py-2.5">
            <p className="text-xs font-semibold text-gold">Quest hari ini belum selesai</p>
            <p className="mt-0.5 text-[11px] text-text-dim">
              {pending.length} quest menunggu diselesaikan.
            </p>
          </div>
          <CountdownTimer />
        </>
      )}
    </div>
  );
}