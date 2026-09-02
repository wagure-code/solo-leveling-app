"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlayerData } from "@/hooks/usePlayerData";
import { signOut } from "@/lib/authHelpers";
import { PREMIUM_PERKS } from "@/lib/premiumConfig";
import { isSoundEnabled, setSoundEnabled } from "@/lib/soundEngine";
import PageShell from "@/components/ui/PageShell";
import HudPanel from "@/components/ui/HudPanel";
import OnboardingModal from "@/components/onboarding/OnboardingModal";

export default function AccountPage() {
  const router = useRouter();
  const {
    loaded,
    name,
    rank,
    level,
    totalExp,
    streak,
    updateName,
    resetProgress,
    focusStats,
    setFocusStats,
    isPremium,
    redeemCode,
    redeemedCode,
  } = usePlayerData();

  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [confirmReset, setConfirmReset] = useState(false);
  const [focusModalOpen, setFocusModalOpen] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [redeemMessage, setRedeemMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSound = () => {
    const newValue = !soundOn;
    setSoundEnabled(newValue);
    setSoundOn(newValue);
  };

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-text-dim">
        Memuat...
      </div>
    );
  }

  const saveName = () => {
    const trimmed = draftName.trim();
    if (trimmed) updateName(trimmed);
    setEditing(false);
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetProgress();
    setConfirmReset(false);
  };

  const handleRedeem = () => {
    const result = redeemCode(codeInput);
    setRedeemMessage({ text: result.message, ok: result.success });
    if (result.success) setCodeInput("");
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <PageShell>
      <HudPanel glow className="p-5 text-center sm:p-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan-glow/50 bg-cyan-glow/10">
          <span className="font-display text-2xl font-bold text-cyan-glow">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>

        {editing ? (
          <div className="mt-3 flex items-center justify-center gap-2">
            <input
              autoFocus
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              className="w-40 rounded-full border border-border bg-void px-3 py-1.5 text-center text-sm text-text-hi outline-none focus:border-cyan-glow"
            />
            <button
              onClick={saveName}
              className="rounded-full border border-cyan-glow/60 bg-cyan-glow/10 px-3 py-1.5 text-xs font-semibold text-cyan-glow"
            >
              Simpan
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setDraftName(name);
              setEditing(true);
            }}
            className="mt-3 block w-full"
          >
            <h1 className="font-display text-xl font-bold text-text-hi">{name}</h1>
            <span className="text-[11px] text-text-dim">Ketuk untuk ubah nama</span>
          </button>
        )}

        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="inline-block rounded-full border border-violet-glow/50 bg-violet-glow/10 px-3 py-1 text-[11px] font-semibold text-violet-glow">
            RANK {rank} · LV {level}
          </span>
          {isPremium && (
            <span className="inline-block rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold">
              ✦ Premium
            </span>
          )}
        </div>
      </HudPanel>

      <HudPanel className="p-4 sm:p-6">
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-text-mid">Ringkasan</p>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-border/50 bg-panel-light/30 px-3 py-3 text-center">
            <p className="font-display text-lg font-bold text-cyan-glow">
              {totalExp.toLocaleString("id-ID")}
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-text-dim">Total EXP</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-panel-light/30 px-3 py-3 text-center">
            <p className="font-display text-lg font-bold text-gold">{streak} hari</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-text-dim">Streak</p>
          </div>
        </div>
      </HudPanel>

      <HudPanel className={`p-4 sm:p-6 ${isPremium ? "border-gold/40" : ""}`}>
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.2em] text-text-mid">Status Langganan</p>
          {isPremium ? (
            <span className="rounded-full border border-gold/50 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold text-gold">
              Aktif
            </span>
          ) : (
            <span className="rounded-full border border-border/50 px-2.5 py-0.5 text-[10px] font-semibold text-text-dim">
              Gratis
            </span>
          )}
        </div>

        <ul className="mt-3 flex flex-col gap-1.5">
          {PREMIUM_PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-xs text-text-mid">
              <span
                className={`h-1 w-1 flex-shrink-0 rounded-full ${
                  isPremium ? "bg-gold" : "bg-border"
                }`}
              />
              {perk}
            </li>
          ))}
        </ul>

        {isPremium ? (
          <div className="mt-3 rounded-xl border border-gold/40 bg-gold/5 px-3.5 py-3 text-center">
            <p className="text-xs text-text-mid">
              Kode aktif: <span className="font-mono font-semibold text-gold">{redeemedCode}</span>
            </p>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            <input
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRedeem()}
              placeholder="SLST-000000-00"
              className="w-full rounded-xl border border-border bg-void px-3 py-3 text-center font-mono text-sm uppercase text-text-hi outline-none focus:border-gold"
            />
            {redeemMessage && (
              <p className={`text-center text-xs ${redeemMessage.ok ? "text-cyan-glow" : "text-danger"}`}>
                {redeemMessage.text}
              </p>
            )}
            <button
              onClick={handleRedeem}
              className="w-full rounded-xl border border-gold bg-gold/10 py-3 text-sm font-semibold text-gold transition hover:bg-gold/20 active:scale-[0.98]"
            >
              Redeem Kode Premium
            </button>
          </div>
        )}
      </HudPanel>

      <HudPanel className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-text-mid">Suara</p>
            <p className="mt-0.5 text-xs text-text-dim">Efek suara quest selesai & level up</p>
          </div>
          <button
            onClick={toggleSound}
            aria-label={soundOn ? "Matikan suara" : "Nyalakan suara"}
            className={`h-7 w-12 flex-shrink-0 rounded-full border transition ${
              soundOn ? "border-cyan-glow bg-cyan-glow/20" : "border-border bg-void"
            }`}
          >
            <div
              className={`h-5 w-5 rounded-full bg-current transition-transform ${
                soundOn ? "translate-x-5 text-cyan-glow" : "translate-x-0.5 text-text-dim"
              }`}
            />
          </button>
        </div>
      </HudPanel>

      <HudPanel className="p-4 sm:p-6">
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-text-mid">Fokus Aspek</p>
        <p className="mb-3 text-xs text-text-dim">
          {focusStats.length > 0
            ? `Prioritas saat ini: ${focusStats.join(" → ")}`
            : "Belum ada aspek yang dipilih."}
        </p>
        <button
          onClick={() => setFocusModalOpen(true)}
          className="w-full rounded-full border border-cyan-glow/50 bg-cyan-glow/5 py-2 text-sm font-semibold text-cyan-glow transition hover:bg-cyan-glow/15"
        >
          Ubah Fokus Aspek
        </button>
      </HudPanel>

      <HudPanel className="p-4 sm:p-6">
        <button
          onClick={handleLogout}
          className="w-full rounded-xl border border-border/60 py-3 text-sm font-semibold text-text-mid transition hover:border-danger/50 hover:text-danger"
        >
          Keluar dari Akun
        </button>
      </HudPanel>

      <HudPanel className="p-4 sm:p-6">
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-text-mid">Lainnya</p>
        <button
          onClick={handleReset}
          className={`w-full rounded-full border py-2.5 text-sm font-semibold transition ${
            confirmReset
              ? "border-danger bg-danger/10 text-danger"
              : "border-border/60 text-text-mid hover:border-danger/50 hover:text-danger"
          }`}
        >
          {confirmReset ? "Yakin? Ketuk sekali lagi untuk hapus semua progress" : "Reset Progress"}
        </button>
      </HudPanel>

      <OnboardingModal
        open={focusModalOpen}
        initialFocus={focusStats}
        dismissable={true}
        onSubmit={(f) => {
          setFocusStats(f);
          setFocusModalOpen(false);
        }}
        onDismiss={() => setFocusModalOpen(false)}
      />
    </PageShell>
  );
}