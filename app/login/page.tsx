"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/authHelpers";
import HudPanel from "@/components/ui/HudPanel";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        setMessage({ text: error.message, ok: false });
      } else {
        router.push("/");
      }
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        setMessage({ text: error.message, ok: false });
      } else {
        setMessage({ text: "Akun berhasil dibuat! Silakan login.", ok: true });
        setMode("login");
      }
    }

    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="bg-ambient" />

      <HudPanel glow className="w-full max-w-sm p-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-glow">Sistem</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-text-hi">
          {mode === "login" ? "Masuk" : "Daftar Hunter Baru"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-border bg-void px-3.5 py-3 text-sm text-text-hi outline-none focus:border-cyan-glow"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min. 6 karakter)"
            className="w-full rounded-xl border border-border bg-void px-3.5 py-3 text-sm text-text-hi outline-none focus:border-cyan-glow"
          />

          {message && (
            <p className={`text-center text-xs ${message.ok ? "text-cyan-glow" : "text-danger"}`}>
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-xl border border-cyan-glow bg-cyan-glow/10 py-3 text-sm font-semibold text-cyan-glow transition hover:bg-cyan-glow/20 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMessage(null);
          }}
          className="mt-4 w-full text-center text-xs text-text-mid hover:text-cyan-glow"
        >
          {mode === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
        </button>
      </HudPanel>
    </div>
  );
}