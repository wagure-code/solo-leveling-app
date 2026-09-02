# Solo Status — Tahap 1 (UI Mockup)

## Cara pasang

1. Buat project Next.js baru (kalau belum ada):
   ```bash
   npx create-next-app@latest solo-status --typescript --tailwind --app
   cd solo-status
   ```

2. Install dependency tambahan:
   ```bash
   npm install framer-motion
   ```
   (Howler.js belum dipakai di Tahap 1 — nanti ditambahkan di Tahap 5 untuk sound FX.)

3. Salin semua file dari struktur ini ke project kamu, timpa file yang bentrok
   (`app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`).

4. Pastikan `tsconfig.json` punya path alias `@/*` (biasanya sudah otomatis dari
   `create-next-app`). Kalau belum, tambahkan di `compilerOptions`:
   ```json
   "paths": { "@/*": ["./*"] }
   ```

5. Jalankan:
   ```bash
   npm run dev
   ```

## Struktur folder

```
app/
  layout.tsx        -> load font Rajdhani + JetBrains Mono
  page.tsx           -> render StatusWindow dengan mock data
  globals.css        -> base style + clip-path sudut terpotong
components/
  ui/
    HudPanel.tsx      -> panel dasar bertema (elemen ciri khas, dipakai berulang)
  status/
    StatusWindow.tsx  -> komponen utama, menyatukan semua bagian
    StatusHeader.tsx  -> nama, rank, level
    ExpBar.tsx        -> progress bar EXP
    StatBlock.tsx     -> grid stat STR/AGI/INT/VIT/PER + alokasi poin
  quest/
    QuestList.tsx     -> daftar quest + tombol tambah
    QuestItem.tsx      -> satu baris quest
    AddQuestModal.tsx  -> form tambah quest custom
types/
  quest.ts            -> semua tipe TypeScript (Quest, PlayerStatus, dst)
data/
  mockData.ts         -> data dummy untuk demo Tahap 1
tailwind.config.ts     -> warna, shadow glow, animasi custom
```

## Catatan untuk Tahap 2

- State saat ini (`useState` di `StatusWindow.tsx`) masih lokal & hilang saat
  refresh — ini memang disengaja karena Tahap 1 fokus ke tampilan.
- Titik yang perlu disambungkan ke logika EXP/Level Up nanti:
  - `handleToggleQuest` di `StatusWindow.tsx` — saat quest ditandai selesai,
    di sini nanti ditambahkan penambahan EXP ke `player.currentExp` dan
    pengecekan level up.
  - `handleAddQuest` — sudah generate `exp` otomatis dari difficulty lewat
    `DIFFICULTY_EXP`, tinggal dipersist ke localStorage.
