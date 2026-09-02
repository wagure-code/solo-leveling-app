"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { isAdminEmail } from "@/lib/adminConfig";
import PageShell from "@/components/ui/PageShell";
import HudPanel from "@/components/ui/HudPanel";
import { generateCode } from "@/lib/redeemEngine";

export default function AdminCodesPage() {
  const router = useRouter();
  const { user, authLoaded } = useAuth();

  const [startFrom, setStartFrom] = useState("1");
  const [amount, setAmount] = useState("20");
  const [codes, setCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  if (!authLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-text-dim">
        Memuat...
      </div>
    );
  }

  if (!user || !isAdminEmail(user.email)) {
    router.push("/");
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-text-dim">
        Akses ditolak. Mengalihkan...
      </div>
    );
  }

  const handleGenerate = () => {
    const start = Math.max(1, Number(startFrom) || 1);
    const count = Math.min(500, Math.max(1, Number(amount) || 1));
    const result: string[] = [];
    for (let i = start; i < start + count; i++) {
      result.push(generateCode(i));
    }
    setCodes(result);
    setCopied(false);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(codes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageShell>
      <HudPanel glow className="p-4 sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-danger">Halaman Internal</p>
        <h1 className="mt-0.5 font-display text-2xl font-bold text-text-hi">
          Generator Kode Premium
        </h1>
        <p className="mt-2 text-xs text-text-dim">
          Halaman ini cuma bisa diakses oleh akunmu sendiri. Simpan kode yang di-generate ke
          spreadsheet, catat mana yang sudah terjual.
        </p>
      </HudPanel>

      <HudPanel className="p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-wide text-text-mid">
              Mulai dari nomor
            </label>
            <input
              type="number"
              value={startFrom}
              onChange={(e) => setStartFrom(e.target.value)}
              className="w-full rounded-xl border border-border bg-void px-3 py-2.5 text-sm text-text-hi outline-none focus:border-cyan-glow"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-wide text-text-mid">
              Jumlah kode
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-border bg-void px-3 py-2.5 text-sm text-text-hi outline-none focus:border-cyan-glow"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="mt-3 w-full rounded-xl border border-cyan-glow bg-cyan-glow/10 py-3 text-sm font-semibold text-cyan-glow transition hover:bg-cyan-glow/20 active:scale-[0.98]"
        >
          Generate Kode
        </button>
      </HudPanel>

      {codes.length > 0 && (
        <HudPanel className="p-4 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.2em] text-text-mid">
              {codes.length} Kode Dihasilkan
            </p>
            <button
              onClick={handleCopyAll}
              className="rounded-full border border-border/60 px-3 py-1.5 text-xs font-semibold text-text-mid transition hover:border-cyan-dim hover:text-cyan-glow"
            >
              {copied ? "Tersalin ✓" : "Salin Semua"}
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto rounded-xl border border-border/40 bg-void/60 p-3">
            <pre className="whitespace-pre-wrap break-all font-mono text-xs text-text-hi">
              {codes.join("\n")}
            </pre>
          </div>
        </HudPanel>
      )}
    </PageShell>
  );
}