interface LogoProps {
  className?: string;
  glow?: boolean;
}

export default function Logo({ className = "h-14 w-14", glow = true }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={`${className} ${glow ? "drop-shadow-[0_0_10px_rgba(56,225,255,0.5)]" : ""}`}
    >
      <path d="M10 18 V10 H18" stroke="#38e1ff" strokeWidth="3" strokeLinecap="round" />
      <path d="M54 46 V54 H46" stroke="#38e1ff" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 14 L50 32 L32 50 L14 32 Z" stroke="#38e1ff" strokeWidth="2.5" />
      <path
        d="M24 38 L32 30 L40 38"
        stroke="#38e1ff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 30 L32 22 L40 30"
        stroke="#38e1ff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}