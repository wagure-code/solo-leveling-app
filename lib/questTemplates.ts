import { Difficulty, StatKey } from "@/types/quest";

export interface QuestTemplate {
  title: string;
  stat: StatKey;
  difficulty: Difficulty;
  isDaily: boolean;
  activeDays: number[];
  target: number;
  unit: string;
}

export const QUEST_TEMPLATES: QuestTemplate[] = [
  { title: "Push up", stat: "STR", difficulty: "D", isDaily: true, activeDays: [], target: 30, unit: "reps" },
  { title: "Jalan kaki", stat: "STR", difficulty: "E", isDaily: true, activeDays: [], target: 20, unit: "menit" },
  { title: "Lari", stat: "STR", difficulty: "C", isDaily: true, activeDays: [], target: 2, unit: "km" },
  { title: "Latihan beban di gym", stat: "STR", difficulty: "B", isDaily: true, activeDays: [1, 3, 5], target: 1, unit: "sesi" },
  { title: "Stretching pagi", stat: "STR", difficulty: "E", isDaily: true, activeDays: [], target: 10, unit: "menit" },

  { title: "Rapikan meja kerja", stat: "AGI", difficulty: "E", isDaily: true, activeDays: [], target: 1, unit: "kali" },
  { title: "Selesaikan tugas prioritas", stat: "AGI", difficulty: "D", isDaily: true, activeDays: [], target: 1, unit: "tugas" },
  { title: "Rencanakan jadwal besok", stat: "AGI", difficulty: "E", isDaily: true, activeDays: [], target: 1, unit: "kali" },
  { title: "Batasi scroll medsos", stat: "AGI", difficulty: "C", isDaily: true, activeDays: [], target: 1, unit: "jam" },
  { title: "Bersihkan & rapikan kamar", stat: "AGI", difficulty: "D", isDaily: true, activeDays: [0, 6], target: 1, unit: "kali" },

  { title: "Tidur sebelum jam 23:00", stat: "VIT", difficulty: "E", isDaily: true, activeDays: [], target: 1, unit: "kali" },
  { title: "Minum air putih", stat: "VIT", difficulty: "E", isDaily: true, activeDays: [], target: 8, unit: "gelas" },
  { title: "Makan sayur & buah", stat: "VIT", difficulty: "D", isDaily: true, activeDays: [], target: 1, unit: "porsi" },
  { title: "Hindari begadang", stat: "VIT", difficulty: "D", isDaily: true, activeDays: [], target: 1, unit: "kali" },
  { title: "Meditasi relaksasi", stat: "VIT", difficulty: "E", isDaily: true, activeDays: [], target: 5, unit: "menit" },

  { title: "Baca buku", stat: "INT", difficulty: "E", isDaily: true, activeDays: [], target: 15, unit: "halaman" },
  { title: "Belajar skill baru", stat: "INT", difficulty: "D", isDaily: true, activeDays: [], target: 30, unit: "menit" },
  { title: "Tonton video edukasi", stat: "INT", difficulty: "E", isDaily: true, activeDays: [], target: 1, unit: "video" },
  { title: "Kerjakan modul kursus online", stat: "INT", difficulty: "C", isDaily: true, activeDays: [], target: 1, unit: "modul" },
  { title: "Tulis jurnal refleksi", stat: "INT", difficulty: "E", isDaily: true, activeDays: [], target: 1, unit: "kali" },

  { title: "Meditasi fokus", stat: "PER", difficulty: "D", isDaily: true, activeDays: [], target: 10, unit: "menit" },
  { title: "Matikan notifikasi HP", stat: "PER", difficulty: "D", isDaily: true, activeDays: [], target: 1, unit: "jam" },
  { title: "Ngobrol santai dengan orang terdekat", stat: "PER", difficulty: "E", isDaily: true, activeDays: [], target: 1, unit: "kali" },
  { title: "Deep work tanpa distraksi", stat: "PER", difficulty: "C", isDaily: true, activeDays: [], target: 45, unit: "menit" },
  { title: "Tulis hal yang disyukuri", stat: "PER", difficulty: "E", isDaily: true, activeDays: [], target: 3, unit: "hal" },
];