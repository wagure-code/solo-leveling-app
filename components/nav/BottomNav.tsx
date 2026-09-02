"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
      </svg>
    ),
  },
  {
    href: "/quests",
    label: "Quest",
    icon: (active: boolean) => (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="m8 12 2.5 2.5L16 9" />
      </svg>
    ),
  },
  {
    href: "/dungeons",
    label: "Dungeon",
    icon: (active: boolean) => (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polygon points="12,8 14,12 12,16 10,12" />
      </svg>
    ),
  },
  {
    href: "/stats",
    label: "Statistik",
    icon: (active: boolean) => (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V10" />
        <path d="M12 20V4" />
        <path d="M20 20v-7" />
      </svg>
    ),
  },
  {
    href: "/account",
    label: "Akun",
    icon: (active: boolean) => (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/50 bg-panel/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-md justify-around px-1 py-2 sm:max-w-lg">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5 transition ${
                active ? "text-cyan-glow" : "text-text-dim hover:text-text-mid"
              }`}
            >
              {item.icon(active)}
              <span className="text-[9px] font-medium uppercase tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}