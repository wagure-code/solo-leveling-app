interface StatusHeaderProps {
  name: string;
  rank: string;
  level: number;
  onLevelClick?: () => void;
}

export default function StatusHeader({ name, rank, level, onLevelClick }: StatusHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-text-mid">
          Status Window
        </p>
        <h1 className="mt-0.5 font-display text-2xl font-bold tracking-wide text-text-hi sm:text-3xl">
          {name}
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full border border-violet-glow/50 bg-violet-glow/10 px-3 py-1 text-[11px] font-semibold text-violet-glow">
            RANK {rank}
          </span>
        </div>
      </div>

      <button
        onClick={onLevelClick}
        disabled={!onLevelClick}
        aria-label="Lihat kebutuhan EXP per level"
        className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-cyan-glow/60 bg-void/60 shadow-glow-cyan-sm animate-float transition hover:border-cyan-glow hover:shadow-glow-cyan active:scale-95"
      >
        <span className="text-[9px] uppercase tracking-wider text-text-mid">Lv.</span>
        <span className="font-display text-2xl font-bold leading-none text-cyan-glow">
          {level}
        </span>
      </button>
    </div>
  );
}