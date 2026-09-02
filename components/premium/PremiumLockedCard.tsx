import Link from "next/link";
import { PREMIUM_PERKS } from "@/lib/premiumConfig";

interface PremiumLockedCardProps {
  title: string;
  description: string;
}

export default function PremiumLockedCard({ title, description }: PremiumLockedCardProps) {
  return (
    <div className="hud-corner rounded-2xl border border-gold/40 bg-gold/5 p-5 text-center sm:p-6">
      <span className="inline-block rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold">
        Fitur Premium
      </span>
      <h2 className="mt-3 font-display text-lg font-bold text-text-hi">{title}</h2>
      <p className="mt-1.5 text-sm text-text-mid">{description}</p>

      <ul className="mt-4 flex flex-col gap-1.5 text-left">
        {PREMIUM_PERKS.map((perk) => (
          <li key={perk} className="flex items-center gap-2 text-xs text-text-mid">
            <span className="h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
            {perk}
          </li>
        ))}
      </ul>

      <Link
        href="/account"
        className="mt-5 inline-block w-full rounded-xl border border-gold bg-gold/10 py-3 text-sm font-semibold text-gold transition hover:bg-gold/20 active:scale-[0.98]"
      >
        Lihat Opsi Premium
      </Link>
    </div>
  );
}