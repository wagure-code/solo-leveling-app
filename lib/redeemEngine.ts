function computeChecksum(base: string): string {
  let sum = 0;
  for (let i = 0; i < base.length; i++) {
    sum += base.charCodeAt(i) * (i + 1);
  }
  const val = sum % 1296; // 36^2
  return val.toString(36).toUpperCase().padStart(2, "0");
}

// Dipakai OFFLINE oleh kamu (bukan di app) buat generate kode yang mau dijual.
// Cara pakai: buka Console browser di halaman manapun, paste isi file ini,
// lalu jalankan generateCode(1), generateCode(2), dst.
export function generateCode(serial: number): string {
  const base = `SLST${serial.toString().padStart(6, "0")}`;
  const checksum = computeChecksum(base);
  return `${base}-${checksum}`;
}

// Dipakai DI DALAM app buat validasi kode yang diinput user.
export function isValidRedeemCode(code: string): boolean {
  const cleaned = code.trim().toUpperCase();
  const match = cleaned.match(/^SLST(\d{6})-([A-Z0-9]{2})$/);
  if (!match) return false;
  const [, serialStr] = match;
  const base = `SLST${serialStr}`;
  const expectedChecksum = computeChecksum(base);
  return cleaned === `${base}-${expectedChecksum}`;
}