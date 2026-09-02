// Ganti email di bawah ini dengan email akun kamu sendiri.
export const ADMIN_EMAILS = [
  "altafg402@gmail.com",
];

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}