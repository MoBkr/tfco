import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deep:   "#080B14",
        surf1:  "#0D1220",
        surf2:  "#141828",
        cyan:   "#00D4FF",
        gold:   "#D4A843",
        purple: "#7B2FFF",
        live:   "#00E676",
        muted:  "#8892A4",
      },
      fontFamily: {
        tajawal: ["var(--font-tajawal)", "sans-serif"],
        inter:   ["var(--font-inter)",   "sans-serif"],
      },
      backgroundImage: {
        "grad-brand": "linear-gradient(135deg, #00D4FF 0%, #7B2FFF 100%)",
        "grad-gold":  "linear-gradient(135deg, #D4A843 0%, #F0C566 100%)",
      },
      animation: {
        "pulse-glow":  "pulseGlow 2.5s ease-in-out infinite",
        "float":       "float 6s ease-in-out infinite",
        "marquee":     "marquee 25s linear infinite",
        "typewriter":  "typewriter 2s steps(30) forwards",
        "blink":       "blink 1s step-end infinite",
        "hero-pulse":  "heroPulse 12s ease-in-out infinite alternate",
        "flow-dash":   "flowDash 1.5s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(37,211,102,0.4)" },
          "50%":     { boxShadow: "0 0 0 10px rgba(37,211,102,0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        typewriter: {
          "0%":   { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
        heroPulse: {
          "0%":   { filter: "hue-rotate(0deg) brightness(1)" },
          "100%": { filter: "hue-rotate(8deg) brightness(1.05)" },
        },
        flowDash: {
          to: { strokeDashoffset: "-20" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
