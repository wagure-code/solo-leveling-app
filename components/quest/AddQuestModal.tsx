"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import {
  DIFFICULTY_EXP,
  DIFFICULTY_LABEL,
  Difficulty,
  Quest,
  StatKey,
} from "@/types/quest";
import { DAY_LABELS } from "@/lib/scheduleEngine";

interface AddQuestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (quest: Omit<Quest, "id">) => void;
  editQuest?: Quest | null;
  onEditSubmit?: (id: string, quest: Omit<Quest, "id">) => void;
}

const STAT_OPTIONS: StatKey[] = ["STR", "AGI", "INT", "VIT", "PER"];
const DIFFICULTY_OPTIONS: Difficulty[] = ["E", "D", "C", "B", "A"];
const UNIT_OPTIONS = ["kali", "reps", "menit", "jam", "halaman", "km", "gelas", "set", "porsi"];
const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

export default function AddQuestModal({
  open,
  onClose,
  onSubmit,
  editQuest = null,
  onEditSubmit,
}: AddQuestModalProps) {
  const isEditMode = !!editQuest;

  const [title, setTitle] = useState("");
  const [stat, setStat] = useState<StatKey>("STR");
  const [difficulty, setDifficulty] = useState<Difficulty>("E");
  const [target, setTarget] = useState("1");
  const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
  const [repeat, setRepeat] = useState<"once" | "daily">("daily");
  const [selectedDays, setSelectedDays] = useState<number[]>(ALL_DAYS);

  useEffect(() => {
    if (!open) return;

    if (editQuest) {
      setTitle(editQuest.title);
      setStat(editQuest.stat);
      setDifficulty(editQuest.difficulty);
      setTarget(String(editQuest.target));
      setUnit(editQuest.unit);
      setRepeat(editQuest.isDaily ? "daily" : "once");
      setSelectedDays(
        editQuest.activeDays && editQuest.activeDays.length > 0 ? editQuest.activeDays : ALL_DAYS
      );
    } else {
      setTitle("");
      setStat("STR");
      setDifficulty("E");
      setTarget("1");
      setUnit(UNIT_OPTIONS[0]);
      setRepeat("daily");
      setSelectedDays(ALL_DAYS);
    }
  }, [open, editQuest]);

  const resetAndClose = () => {
    onClose();
  };

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b)
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (repeat === "daily" && selectedDays.length === 0) return;

    const targetNum = Math.max(1, Number(target) || 1);
    const isDaily = repeat === "daily";
    const activeDays = isDaily && selectedDays.length < 7 ? selectedDays : [];

    const payload: Omit<Quest, "id"> = {
      title: title.trim(),
      stat,
      difficulty,
      exp: DIFFICULTY_EXP[difficulty],
      isDaily,
      activeDays,
      target: targetNum,
      unit: unit.trim() || "kali",
    };

    if (isEditMode && editQuest && onEditSubmit) {
      onEditSubmit(editQuest.id, payload);
    } else {
      onSubmit(payload);
    }
    resetAndClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-void/80 backdrop-blur-sm sm:items-center"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="hud-corner relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border border-cyan-glow/50 bg-panel/95 backdrop-blur-md p-5 shadow-glow-cyan sm:p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-text-mid">Sistem</p>
            <h2 className="mb-4 font-display text-xl font-bold text-text-hi">
              {isEditMode ? "Edit Quest" : "Buat Quest Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wide text-text-mid">
                  Nama Quest
                </label>
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="cth. Push up"
                  className="w-full border border-border bg-void px-3 py-2 text-sm text-text-hi outline-none focus:border-cyan-glow"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] uppercase tracking-wide text-text-mid">
                    Target
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full border border-border bg-void px-3 py-2 text-sm text-text-hi outline-none focus:border-cyan-glow"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] uppercase tracking-wide text-text-mid">
                    Satuan
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full border border-border bg-void px-3 py-2 text-sm text-text-hi outline-none focus:border-cyan-glow"
                  >
                    {UNIT_OPTIONS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] uppercase tracking-wide text-text-mid">
                    Stat
                  </label>
                  <select
                    value={stat}
                    onChange={(e) => setStat(e.target.value as StatKey)}
                    className="w-full border border-border bg-void px-3 py-2 text-sm text-text-hi outline-none focus:border-cyan-glow"
                  >
                    {STAT_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] uppercase tracking-wide text-text-mid">
                    Kesulitan
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    className="w-full border border-border bg-void px-3 py-2 text-sm text-text-hi outline-none focus:border-cyan-glow"
                  >
                    {DIFFICULTY_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {DIFFICULTY_LABEL[d]} (+{DIFFICULTY_EXP[d]} EXP)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-wide text-text-mid">
                  Pengulangan
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRepeat("daily")}
                    className={`flex-1 rounded-full border py-1.5 text-xs font-semibold transition ${
                      repeat === "daily"
                        ? "border-cyan-glow bg-cyan-glow/10 text-cyan-glow"
                        : "border-border/60 text-text-dim"
                    }`}
                  >
                    Berulang
                  </button>
                  <button
                    type="button"
                    onClick={() => setRepeat("once")}
                    className={`flex-1 rounded-full border py-1.5 text-xs font-semibold transition ${
                      repeat === "once"
                        ? "border-cyan-glow bg-cyan-glow/10 text-cyan-glow"
                        : "border-border/60 text-text-dim"
                    }`}
                  >
                    Sekali
                  </button>
                </div>
              </div>

              {repeat === "daily" && (
                <div>
                  <label className="mb-1.5 block text-[11px] uppercase tracking-wide text-text-mid">
                    Hari Pengerjaan
                  </label>
                  <div className="flex justify-between gap-1">
                    {DAY_LABELS.map((label, index) => {
                      const active = selectedDays.includes(index);
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => toggleDay(index)}
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition ${
                            active
                              ? "border-cyan-glow bg-cyan-glow/15 text-cyan-glow shadow-glow-cyan-sm"
                              : "border-border/60 text-text-dim hover:border-text-mid"
                          }`}
                        >
                          {label.charAt(0)}
                        </button>
                      );
                    })}
                  </div>
                  {selectedDays.length === 0 && (
                    <p className="mt-1.5 text-[11px] text-danger">Pilih minimal 1 hari.</p>
                  )}
                  {selectedDays.length === 7 && (
                    <p className="mt-1.5 text-[11px] text-text-dim">Quest ini aktif setiap hari.</p>
                  )}
                </div>
              )}

              <div className="mt-1 flex gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="rounded-full flex-1 border border-border py-2 text-sm text-text-mid transition hover:border-text-mid"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-full flex-1 border border-cyan-glow bg-cyan-glow/10 py-2 text-sm font-semibold text-cyan-glow transition hover:bg-cyan-glow/20 hover:shadow-glow-cyan-sm active:scale-[0.98]"
                >
                  {isEditMode ? "Simpan Perubahan" : "Terima Quest"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}