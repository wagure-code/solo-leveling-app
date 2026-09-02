"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StatKey } from "@/types/quest";

interface OnboardingModalProps {
  open: boolean;
  initialFocus: StatKey[];
  dismissable: boolean;
  onSubmit: (focus: StatKey[]) => void;
  onDismiss: () => void;
}

const ASPECTS: { key: StatKey; title: string; desc: string }[] = [
  { key: "STR", title: "Fisik & Olahraga", desc: "Kekuatan, stamina, aktivitas fisik" },
  { key: "AGI", title: "Produktivitas & Kebiasaan", desc: "Rutinitas, efisiensi, manajemen waktu" },
  { key: "VIT", title: "Kesehatan & Istirahat", desc: "Tidur, pola makan, pemulihan" },
  { key: "INT", title: "Belajar & Skill", desc: "Ilmu baru, kemampuan, wawasan" },
  { key: "PER", title: "Fokus & Mental", desc: "Konsentrasi, ketenangan, kesadaran diri" },
];

export default function OnboardingModal({
  open,
  initialFocus,
  dismissable,
  onSubmit,
  onDismiss,
}: OnboardingModalProps) {
  const [selected, setSelected] = useState<StatKey[]>(initialFocus);

  useEffect(() => {
    if (open) setSelected(initialFocus);
  }, [open, initialFocus]);

  const toggle = (key: StatKey) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    onSubmit(selected);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="hud-corner relative flex max-h-[88vh] w-full max-w-md flex-col overflow-y-auto rounded-2xl border border-cyan-glow/50 bg-panel/95 p-5 shadow-glow-cyan sm:p-6"
          >
            {dismissable && (
              <button
                onClick={onDismiss}
                aria-label="Tutup"
                className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-text-dim transition hover:bg-border/40 hover:text-text-hi"
              >
                ×
              </button>
            )}

            <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-glow">Awakening</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-text-hi">
              Aspek Apa yang Ingin Kamu Tingkatkan?
            </h2>
            <p className="mt-2 text-sm text-text-mid">
              Ketuk sesuai urutan prioritas — yang paling penting duluan. Sistem akan menyarankan
              quest berdasarkan pilihanmu.
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              {ASPECTS.map((aspect) => {
                const priority = selected.indexOf(aspect.key);
                const isSelected = priority !== -1;
                return (
                  <button
                    key={aspect.key}
                    type="button"
                    onClick={() => toggle(aspect.key)}
                    className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition ${
                      isSelected
                        ? "border-cyan-glow bg-cyan-glow/10 shadow-glow-cyan-sm"
                        : "border-border/50 bg-panel-light/30 hover:border-border"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                        isSelected
                          ? "border-cyan-glow bg-cyan-glow/20 text-cyan-glow"
                          : "border-border/60 text-text-dim"
                      }`}
                    >
                      {isSelected ? priority + 1 : ""}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-text-hi">{aspect.title}</p>
                      <p className="text-[11px] text-text-dim">{aspect.desc}</p>
                    </div>
                    <span className="flex-shrink-0 rounded-full border border-border/50 px-2 py-0.5 text-[10px] uppercase text-text-dim">
                      {aspect.key}
                    </span>
                  </button>
                );
              })}
            </div>

            {selected.length === 0 && (
              <p className="mt-3 text-center text-[11px] text-text-dim">
                Pilih minimal 1 aspek untuk melanjutkan.
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={selected.length === 0}
              className="mt-5 rounded-full border border-cyan-glow bg-cyan-glow/10 py-2.5 text-sm font-semibold text-cyan-glow transition hover:bg-cyan-glow/20 hover:shadow-glow-cyan-sm active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Mulai Perjalanan
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}