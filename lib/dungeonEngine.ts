import { StatKey } from "@/types/quest";

export interface DungeonMission {
  id: string;
  title: string;
  description: string;
  requiredDays: number;
  dailyTarget: number;
  unit: string;
  exp: number;
}

export interface DungeonSet {
  id: string;
  stat: StatKey;
  name: string;
  missions: DungeonMission[];
}

export const DUNGEON_SETS: DungeonSet[] = [
  { id: "str-1", stat: "STR", name: "Dungeon: Trial of Iron", missions: [
    { id: "str-1-a", title: "Push-up Marathon", description: "Bangun daya tahan otot dada dan lengan dengan menyelesaikan push-up setiap hari.", requiredDays: 16, dailyTarget: 30, unit: "reps", exp: 300 },
    { id: "str-1-b", title: "Distance Conqueror", description: "Tempuh jarak lari atau jalan cepat setiap hari untuk melatih stamina kardio.", requiredDays: 16, dailyTarget: 2, unit: "km", exp: 320 },
    { id: "str-1-c", title: "Iron Gym Circuit", description: "Selesaikan satu sesi latihan beban penuh di gym setiap hari.", requiredDays: 16, dailyTarget: 1, unit: "sesi", exp: 280 },
  ]},
  { id: "str-2", stat: "STR", name: "Dungeon: Trial of Stone", missions: [
    { id: "str-2-a", title: "Squat Onslaught", description: "Perkuat otot kaki dan inti tubuh dengan squat setiap hari.", requiredDays: 18, dailyTarget: 25, unit: "reps", exp: 320 },
    { id: "str-2-b", title: "Stair Climber", description: "Naik tangga setiap hari untuk melatih daya tahan kaki dan jantung.", requiredDays: 18, dailyTarget: 5, unit: "lantai", exp: 300 },
    { id: "str-2-c", title: "Weighted Carry", description: "Latih kekuatan genggaman dan inti tubuh dengan membawa beban setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "sesi", exp: 300 },
  ]},
  { id: "str-3", stat: "STR", name: "Dungeon: Trial of Storm", missions: [
    { id: "str-3-a", title: "Sprint Repeats", description: "Latih kecepatan dan ledakan tenaga lewat sprint setiap hari.", requiredDays: 20, dailyTarget: 3, unit: "sprint", exp: 350 },
    { id: "str-3-b", title: "Burpee Gauntlet", description: "Uji ketahanan seluruh tubuh lewat burpee setiap hari.", requiredDays: 20, dailyTarget: 20, unit: "reps", exp: 340 },
    { id: "str-3-c", title: "Endurance Row", description: "Bangun stamina dan kekuatan punggung lewat rowing setiap hari.", requiredDays: 20, dailyTarget: 1, unit: "sesi", exp: 320 },
  ]},
  { id: "str-4", stat: "STR", name: "Dungeon: Trial of Titan", missions: [
    { id: "str-4-a", title: "Deadlift Volume", description: "Latih kekuatan maksimal lewat deadlift setiap hari.", requiredDays: 24, dailyTarget: 200, unit: "kg", exp: 400 },
    { id: "str-4-b", title: "Pull-up Challenge", description: "Latih kekuatan tubuh bagian atas lewat pull-up setiap hari.", requiredDays: 24, dailyTarget: 10, unit: "reps", exp: 380 },
    { id: "str-4-c", title: "Full Body Circuit", description: "Selesaikan sesi latihan sirkuit seluruh tubuh setiap hari.", requiredDays: 24, dailyTarget: 1, unit: "sesi", exp: 370 },
  ]},
  { id: "str-5", stat: "STR", name: "Dungeon: Trial of Colossus", missions: [
    { id: "str-5-a", title: "Marathon Prep", description: "Bangun fondasi stamina jarak jauh sebagai persiapan lari jarak jauh.", requiredDays: 28, dailyTarget: 3, unit: "km", exp: 450 },
    { id: "str-5-b", title: "Strength Test", description: "Uji batas kekuatan lewat latihan berat setiap hari.", requiredDays: 28, dailyTarget: 25, unit: "reps", exp: 430 },
    { id: "str-5-c", title: "Iron Will Session", description: "Jalani sesi latihan intensif setiap hari yang menguji kedisiplinan fisik.", requiredDays: 28, dailyTarget: 1, unit: "sesi", exp: 420 },
  ]},

  { id: "agi-1", stat: "AGI", name: "Dungeon: Trial of Momentum", missions: [
    { id: "agi-1-a", title: "Deep Focus Streak", description: "Kerjakan sesi fokus tanpa distraksi setiap hari.", requiredDays: 16, dailyTarget: 2, unit: "jam", exp: 300 },
    { id: "agi-1-b", title: "Task Slayer", description: "Selesaikan tugas harian dalam jumlah tertentu untuk melatih produktivitas.", requiredDays: 16, dailyTarget: 5, unit: "tugas", exp: 320 },
    { id: "agi-1-c", title: "Inbox Zero Challenge", description: "Bereskan pekerjaan/pesan tertunda setiap hari.", requiredDays: 16, dailyTarget: 1, unit: "kali", exp: 280 },
  ]},
  { id: "agi-2", stat: "AGI", name: "Dungeon: Trial of Discipline", missions: [
    { id: "agi-2-a", title: "Early Riser Chain", description: "Bangun pagi sesuai target waktumu setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "kali", exp: 340 },
    { id: "agi-2-b", title: "No-Scroll Streak", description: "Batasi scroll media sosial berlebihan setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "kali", exp: 300 },
    { id: "agi-2-c", title: "Weekly Planner Master", description: "Susun/evaluasi rencana harianmu setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "kali", exp: 300 },
  ]},
  { id: "agi-3", stat: "AGI", name: "Dungeon: Trial of Velocity", missions: [
    { id: "agi-3-a", title: "Sprint Task Clear", description: "Selesaikan tugas-tugas kecil dengan cepat setiap hari.", requiredDays: 20, dailyTarget: 5, unit: "tugas", exp: 350 },
    { id: "agi-3-b", title: "Clutter Purge", description: "Bersihkan hal yang mengganggu produktivitas setiap hari.", requiredDays: 20, dailyTarget: 1, unit: "kali", exp: 320 },
    { id: "agi-3-c", title: "Deadline Crusher", description: "Selesaikan tugas penting sebelum tenggat waktu setiap hari.", requiredDays: 20, dailyTarget: 2, unit: "tugas", exp: 330 },
  ]},
  { id: "agi-4", stat: "AGI", name: "Dungeon: Trial of Order", missions: [
    { id: "agi-4-a", title: "System Builder", description: "Bangun/jalankan sistem kerja barumu setiap hari.", requiredDays: 24, dailyTarget: 1, unit: "kali", exp: 390 },
    { id: "agi-4-b", title: "Routine Lockdown", description: "Jaga rutinitas harianmu tetap konsisten setiap hari.", requiredDays: 24, dailyTarget: 1, unit: "kali", exp: 400 },
    { id: "agi-4-c", title: "Focus Block Master", description: "Jalani blok waktu fokus terjadwal setiap hari.", requiredDays: 24, dailyTarget: 2, unit: "jam", exp: 380 },
  ]},
  { id: "agi-5", stat: "AGI", name: "Dungeon: Trial of Flow", missions: [
    { id: "agi-5-a", title: "Zero-Distraction Marathon", description: "Bekerja panjang tanpa gangguan setiap hari.", requiredDays: 28, dailyTarget: 2, unit: "jam", exp: 440 },
    { id: "agi-5-b", title: "Project Finisher", description: "Buat progress nyata pada proyek besarmu setiap hari.", requiredDays: 28, dailyTarget: 1, unit: "kali", exp: 430 },
    { id: "agi-5-c", title: "Habit Streak Supreme", description: "Pertahankan kebiasaan produktifmu setiap hari.", requiredDays: 28, dailyTarget: 1, unit: "kali", exp: 450 },
  ]},

  { id: "vit-1", stat: "VIT", name: "Dungeon: Trial of Vitality", missions: [
    { id: "vit-1-a", title: "Hydration Streak", description: "Cukupi asupan air harianmu setiap hari.", requiredDays: 16, dailyTarget: 8, unit: "gelas", exp: 280 },
    { id: "vit-1-b", title: "Sleep Discipline", description: "Tidur di jam yang konsisten setiap hari.", requiredDays: 16, dailyTarget: 1, unit: "kali", exp: 320 },
    { id: "vit-1-c", title: "Clean Eating Chain", description: "Jaga pola makan sehat setiap hari.", requiredDays: 16, dailyTarget: 1, unit: "kali", exp: 300 },
  ]},
  { id: "vit-2", stat: "VIT", name: "Dungeon: Trial of Recovery", missions: [
    { id: "vit-2-a", title: "Stretch & Recover", description: "Lakukan sesi peregangan setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "sesi", exp: 300 },
    { id: "vit-2-b", title: "Meditation Streak", description: "Jalani sesi meditasi setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "sesi", exp: 320 },
    { id: "vit-2-c", title: "No Junk Food Chain", description: "Hindari makanan tidak sehat setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "kali", exp: 300 },
  ]},
  { id: "vit-3", stat: "VIT", name: "Dungeon: Trial of Balance", missions: [
    { id: "vit-3-a", title: "Digital Sunset Streak", description: "Batasi layar menjelang tidur setiap hari.", requiredDays: 20, dailyTarget: 1, unit: "kali", exp: 330 },
    { id: "vit-3-b", title: "Wholefood Warrior", description: "Makan makanan utuh dan bergizi setiap hari.", requiredDays: 20, dailyTarget: 1, unit: "porsi", exp: 340 },
    { id: "vit-3-c", title: "Deep Sleep Guardian", description: "Jaga kualitas tidur malammu setiap hari.", requiredDays: 20, dailyTarget: 1, unit: "kali", exp: 350 },
  ]},
  { id: "vit-4", stat: "VIT", name: "Dungeon: Trial of Renewal", missions: [
    { id: "vit-4-a", title: "Full Detox Month", description: "Jalani gaya hidup bersih setiap hari.", requiredDays: 24, dailyTarget: 1, unit: "kali", exp: 400 },
    { id: "vit-4-b", title: "Water Intake Master", description: "Capai target minum air harianmu setiap hari.", requiredDays: 24, dailyTarget: 8, unit: "gelas", exp: 380 },
    { id: "vit-4-c", title: "Consistent Rest Chain", description: "Jaga pola istirahatmu tetap teratur setiap hari.", requiredDays: 24, dailyTarget: 1, unit: "kali", exp: 390 },
  ]},
  { id: "vit-5", stat: "VIT", name: "Dungeon: Trial of Immortal Vessel", missions: [
    { id: "vit-5-a", title: "Perfect Sleep Streak", description: "Jaga pola tidurmu ideal setiap hari.", requiredDays: 28, dailyTarget: 1, unit: "kali", exp: 450 },
    { id: "vit-5-b", title: "Nutrition Perfection", description: "Jaga pola makanmu bergizi penuh setiap hari.", requiredDays: 28, dailyTarget: 1, unit: "kali", exp: 440 },
    { id: "vit-5-c", title: "Zero Burnout Month", description: "Kelola energi dan istirahatmu setiap hari agar terhindar dari kelelahan.", requiredDays: 28, dailyTarget: 1, unit: "kali", exp: 430 },
  ]},

  { id: "int-1", stat: "INT", name: "Dungeon: Trial of Knowledge", missions: [
    { id: "int-1-a", title: "Reading Marathon", description: "Baca sesuai target halaman harianmu setiap hari.", requiredDays: 16, dailyTarget: 15, unit: "halaman", exp: 300 },
    { id: "int-1-b", title: "Skill Grind", description: "Berlatih keterampilan baru setiap hari.", requiredDays: 16, dailyTarget: 1, unit: "jam", exp: 320 },
    { id: "int-1-c", title: "Course Completion", description: "Kerjakan materi kursus setiap hari.", requiredDays: 16, dailyTarget: 1, unit: "sesi", exp: 290 },
  ]},
  { id: "int-2", stat: "INT", name: "Dungeon: Trial of Insight", missions: [
    { id: "int-2-a", title: "Journal Consistency", description: "Tulis refleksi harianmu setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "kali", exp: 290 },
    { id: "int-2-b", title: "Research Deep Dive", description: "Pelajari topik baru secara mendalam setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "topik", exp: 330 },
    { id: "int-2-c", title: "Video Course Binge", description: "Tonton materi edukasi setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "video", exp: 300 },
  ]},
  { id: "int-3", stat: "INT", name: "Dungeon: Trial of Mastery", missions: [
    { id: "int-3-a", title: "Book Finisher", description: "Baca menuju penyelesaian buku setiap hari.", requiredDays: 20, dailyTarget: 20, unit: "halaman", exp: 350 },
    { id: "int-3-b", title: "Practice Drill", description: "Berlatih keterampilan lewat sesi drill setiap hari.", requiredDays: 20, dailyTarget: 1, unit: "sesi", exp: 330 },
    { id: "int-3-c", title: "New Skill Unlock", description: "Latih penguasaan skill baru setiap hari.", requiredDays: 20, dailyTarget: 1, unit: "jam", exp: 340 },
  ]},
  { id: "int-4", stat: "INT", name: "Dungeon: Trial of Arcane Study", missions: [
    { id: "int-4-a", title: "Deep Learning Sprint", description: "Belajar intensif setiap hari.", requiredDays: 24, dailyTarget: 2, unit: "jam", exp: 400 },
    { id: "int-4-b", title: "Knowledge Vault", description: "Baca dalam volume besar setiap hari.", requiredDays: 24, dailyTarget: 15, unit: "halaman", exp: 390 },
    { id: "int-4-c", title: "Certification Push", description: "Kerjakan materi sertifikasi setiap hari.", requiredDays: 24, dailyTarget: 1, unit: "sesi", exp: 410 },
  ]},
  { id: "int-5", stat: "INT", name: "Dungeon: Trial of Omniscience", missions: [
    { id: "int-5-a", title: "Master Reading List", description: "Selesaikan target bacaan harianmu setiap hari.", requiredDays: 28, dailyTarget: 15, unit: "halaman", exp: 450 },
    { id: "int-5-b", title: "Skill Fusion", description: "Latih gabungan keterampilanmu setiap hari.", requiredDays: 28, dailyTarget: 1, unit: "jam", exp: 440 },
    { id: "int-5-c", title: "Teach What You Learn", description: "Bagikan ilmu yang kamu pelajari setiap hari.", requiredDays: 28, dailyTarget: 1, unit: "kali", exp: 420 },
  ]},

  { id: "per-1", stat: "PER", name: "Dungeon: Trial of Awareness", missions: [
    { id: "per-1-a", title: "Focus Session Streak", description: "Jalani sesi fokus harianmu setiap hari.", requiredDays: 16, dailyTarget: 1, unit: "sesi", exp: 300 },
    { id: "per-1-b", title: "Mindfulness Chain", description: "Berlatih mindfulness setiap hari.", requiredDays: 16, dailyTarget: 1, unit: "sesi", exp: 280 },
    { id: "per-1-c", title: "Gratitude Log", description: "Catat hal yang disyukuri setiap hari.", requiredDays: 16, dailyTarget: 3, unit: "hal", exp: 270 },
  ]},
  { id: "per-2", stat: "PER", name: "Dungeon: Trial of Clarity", missions: [
    { id: "per-2-a", title: "Notification Fast", description: "Kurangi gangguan notifikasi HP setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "kali", exp: 300 },
    { id: "per-2-b", title: "Silent Reflection", description: "Luangkan waktu hening untuk merenung setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "sesi", exp: 290 },
    { id: "per-2-c", title: "Single-Task Discipline", description: "Fokus satu tugas tanpa multitasking setiap hari.", requiredDays: 18, dailyTarget: 1, unit: "kali", exp: 320 },
  ]},
  { id: "per-3", stat: "PER", name: "Dungeon: Trial of Stillness", missions: [
    { id: "per-3-a", title: "Deep Meditation Streak", description: "Jalani meditasi mendalam setiap hari.", requiredDays: 20, dailyTarget: 1, unit: "sesi", exp: 330 },
    { id: "per-3-b", title: "Social Connection Quest", description: "Bangun koneksi sosial bermakna setiap hari.", requiredDays: 20, dailyTarget: 1, unit: "kali", exp: 300 },
    { id: "per-3-c", title: "Emotional Journaling", description: "Tulis dan proses emosimu setiap hari.", requiredDays: 20, dailyTarget: 1, unit: "kali", exp: 310 },
  ]},
  { id: "per-4", stat: "PER", name: "Dungeon: Trial of the Void Watcher", missions: [
    { id: "per-4-a", title: "Zero Distraction Streak", description: "Jaga fokusmu tanpa gangguan setiap hari.", requiredDays: 24, dailyTarget: 1, unit: "kali", exp: 400 },
    { id: "per-4-b", title: "Deep Work Vault", description: "Bekerja mendalam dengan konsentrasi penuh setiap hari.", requiredDays: 24, dailyTarget: 2, unit: "jam", exp: 410 },
    { id: "per-4-c", title: "Presence Practice", description: "Berlatih kehadiran penuh di momen ini setiap hari.", requiredDays: 24, dailyTarget: 1, unit: "sesi", exp: 390 },
  ]},
  { id: "per-5", stat: "PER", name: "Dungeon: Trial of Absolute Perception", missions: [
    { id: "per-5-a", title: "Perfect Focus Month", description: "Jaga level fokusmu tetap optimal setiap hari.", requiredDays: 28, dailyTarget: 1, unit: "kali", exp: 450 },
    { id: "per-5-b", title: "Master Meditator", description: "Jalani sesi meditasi rutin setiap hari.", requiredDays: 28, dailyTarget: 1, unit: "sesi", exp: 430 },
    { id: "per-5-c", title: "Unshaken Mind Chain", description: "Jaga ketenangan pikiranmu setiap hari.", requiredDays: 28, dailyTarget: 1, unit: "kali", exp: 440 },
  ]},
];

export function getMonthKey(date: Date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function getActiveDungeon(stat: StatKey, date: Date = new Date()): DungeonSet {
  const setsForStat = DUNGEON_SETS.filter((s) => s.stat === stat);
  const monthIndex = date.getFullYear() * 12 + date.getMonth();
  const index = monthIndex % setsForStat.length;
  return setsForStat[index];
}

export function getAllActiveDungeons(date: Date = new Date()): DungeonSet[] {
  const stats: StatKey[] = ["STR", "AGI", "INT", "VIT", "PER"];
  return stats.map((s) => getActiveDungeon(s, date));
}

export function findMissionById(id: string): { mission: DungeonMission; set: DungeonSet } | null {
  for (const set of DUNGEON_SETS) {
    const mission = set.missions.find((m) => m.id === id);
    if (mission) return { mission, set };
  }
  return null;
}

export function getDaysUntilMonthEnd(date: Date = new Date()): number {
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const diffMs = end.getTime() - date.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}