import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#04060c",
        panel: "#0b1120",
        "panel-light": "#111a2e",
        border: {
          DEFAULT: "#1e3a5f",
          glow: "#38e1ff",
        },
        cyan: {
          glow: "#38e1ff",
          dim: "#0f6a80",
        },
        violet: {
          glow: "#8b5cf6",
          dim: "#4c3a91",
        },
        text: {
          hi: "#eaf6ff",
          mid: "#8fa8c4",
          dim: "#4a5b73",
        },
        danger: "#ff3b5c",
        gold: "#ffd166",
      },
      fontFamily: {
        display: ["var(--font-rajdhani)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(56,225,255,0.25), 0 0 2px rgba(56,225,255,0.6)",
        "glow-cyan-sm": "0 0 10px rgba(56,225,255,0.25)",
        "glow-violet": "0 0 16px rgba(139,92,246,0.3)",
        "glow-gold": "0 0 18px rgba(255,209,102,0.4)",
        soft: "0 8px 24px rgba(0,0,0,0.35)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        scanline: "scanline 2.4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;