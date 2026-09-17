import type { Config } from "tailwindcss";

/**
 * Maldovia dizayn tokenlari.
 * Palitra: "bitta dunyo, ikki qonun" — yashil SMP, qizil Anarxiya,
 * ularni ajratib turuvchi binafsha yoriq (brend aksenti).
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        void: "#0A0B0F",
        coal: "#0F1117",
        stone: "#161922",
        line: "#242835",
        bone: "#E9EAF1",
        ash: "#8C93A8",
        iris: { DEFAULT: "#7C5CFF", soft: "#A88CFF", deep: "#4C34C7" },
        moss: { DEFAULT: "#34D399", deep: "#1C5238" },
        ember: { DEFAULT: "#F0563E", deep: "#7A2418" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        pixel: ["var(--font-pixel)", "monospace"],
      },
      letterSpacing: { tightest: "-0.045em" },
      boxShadow: {
        block: "0 0 0 1px rgba(36,40,53,1), 0 18px 50px -24px rgba(0,0,0,0.9)",
        iris: "0 0 0 1px rgba(124,92,255,0.45), 0 0 34px -6px rgba(124,92,255,0.5)",
        moss: "0 0 0 1px rgba(52,211,153,0.4), 0 0 34px -6px rgba(52,211,153,0.35)",
        ember: "0 0 0 1px rgba(240,86,62,0.4), 0 0 34px -6px rgba(240,86,62,0.35)",
      },
      keyframes: {
        "pulse-dot": { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.22s ease-out",
        "accordion-up": "accordion-up 0.22s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
