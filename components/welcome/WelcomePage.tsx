"use client";

import { motion } from "framer-motion";

interface WelcomePageProps {
  onContinue: () => void;
}

const PILLARS = [
  {
    title: "Progress yang Benar-Benar Terukur",
    desc: "Setiap quest punya target dan satuan jelas — bukan sekadar centang, tapi angka yang nyata mencerminkan usahamu.",
  },
  {
    title: "Tumbuh di Aspek yang Kamu Pilih",
    desc: "Sistem menyesuaikan rekomendasi quest dengan aspek hidup yang ingin kamu tingkatkan, bukan generik untuk semua orang.",
  },
  {
    title: "Konsistensi yang Dihargai",
    desc: "Streak, badge, dan level naik seiring kedisiplinanmu — momentum yang kamu bangun hari ini akan terlihat hasilnya.",
  },
];

export default function WelcomePage({ onContinue }: WelcomePageProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-10">
      <div className="bg-ambient" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-glow animate-pulse-glow">
          Sistem Terdeteksi
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-text-hi sm:text-4xl">
          Kualitas Dirimu
          <br />
          <span className="text-cyan-glow">Bisa Diukur & Ditingkatkan</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-mid">
          Kamu akan menjalani jalur peningkatan diri yang terstruktur — setiap usaha kecil
          tercatat, setiap konsistensi berbuah level, dan setiap divisi yang kamu kuasai
          menghasilkan kekuatan nyata.
        </p>
      </motion.div>

      <div className="mt-8 flex w-full max-w-md flex-col gap-3">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
            className="hud-corner rounded-2xl border border-border/50 bg-panel/70 px-4 py-3.5 text-left backdrop-blur-md"
          >
            <p className="font-display text-sm font-semibold text-text-hi">{pillar.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-text-dim">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-8 w-full max-w-md"
      >
        <div className="rounded-2xl border border-cyan-glow/40 bg-cyan-glow/5 px-4 py-3.5 text-center">
          <p className="text-xs text-text-mid">
            <span className="font-semibold text-cyan-glow">Level 1</span> bukan awal yang lemah —
            itu titik di mana perjalananmu tercatat resmi dimulai.
          </p>
        </div>

        <button
          onClick={onContinue}
          className="mt-4 w-full rounded-xl border border-cyan-glow bg-cyan-glow/10 py-3.5 text-base font-semibold text-cyan-glow shadow-glow-cyan-sm transition hover:bg-cyan-glow/20 active:scale-[0.98]"
        >
          Mulai Kebangkitan
        </button>
      </motion.div>
    </div>
  );
}