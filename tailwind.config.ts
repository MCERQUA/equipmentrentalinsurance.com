import type { Config } from "tailwindcss";

/* ============================================================
   EQUIPMENT RENTAL INSURANCE — "Heavy Iron" palette
   Token NAMES are inherited from the shared component architecture;
   VALUES are remapped to graphite charcoal (primary) / oxide rust
   (secondary) / safety orange (accent).
   clay = graphite charcoal · sage = oxide rust · gold = safety orange
   cream = industrial off-white · sand = cool gray
   ============================================================ */

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F6F7F8",
        sand: "#E6E9EC",
        white: "#FFFFFF",
        clay: {
          DEFAULT: "#2A2E34",
          dark: "#171A1E",
          light: "#373D44",
          50: "#EDF0F2",
          100: "#D3D8DC",
          200: "#A6AEB6",
          300: "#7A838D",
          400: "#5C6470",
          500: "#373D44",
          600: "#2A2E34",
          700: "#171A1E",
          800: "#111418",
          900: "#0B0D0F",
        },
        sage: {
          DEFAULT: "#B5431F",
          dark: "#8E3417",
          light: "#D26842",
          50: "#FBEDE7",
          100: "#F4D2C5",
          200: "#E9A48C",
          300: "#D26842",
          400: "#C2542E",
          500: "#B5431F",
          600: "#8E3417",
          700: "#6B2610",
        },
        gold: {
          DEFAULT: "#E8751E",
          dark: "#B8581A",
          light: "#F19546",
          50: "#FDEEE2",
          100: "#FAD8BE",
          200: "#F4B377",
          300: "#EE8F3A",
          400: "#E8751E",
          500: "#B8581A",
          600: "#914414",
        },
        espresso: "#171A1E",
        cocoa: "#373D44",
        mocha: "#5C6470",
        adobe: "#AEB4BC",
        adobeDark: "#969DA6",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        arch: "2rem 2rem 2rem 2rem",
        arch2: "2.5rem 2.5rem 1.5rem 1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "sunrise-bands":
          "linear-gradient(180deg, #F6F7F8 0%, #ECEFF2 40%, #E6E9EC 70%, #F6F7F8 100%)",
        "warm-radial":
          "radial-gradient(circle at 30% 20%, rgba(42,46,52,0.10) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(232,117,30,0.08) 0%, transparent 55%)",
        "clay-gradient": "linear-gradient(135deg, #2A2E34 0%, #373D44 100%)",
        "sage-gradient": "linear-gradient(135deg, #B5431F 0%, #D26842 100%)",
        "gold-gradient": "linear-gradient(135deg, #E8751E 0%, #F19546 100%)",
      },
      boxShadow: {
        warm: "0 10px 40px -15px rgba(23, 26, 30, 0.28), 0 4px 12px -6px rgba(23, 26, 30, 0.10)",
        "warm-lg": "0 30px 70px -20px rgba(23, 26, 30, 0.34), 0 10px 30px -10px rgba(23, 26, 30, 0.12)",
        card: "0 2px 8px -2px rgba(23, 26, 30, 0.08), 0 1px 3px -1px rgba(23, 26, 30, 0.05)",
        "card-hover": "0 20px 50px -15px rgba(23, 26, 30, 0.30), 0 8px 20px -8px rgba(23, 26, 30, 0.12)",
        arch: "inset 0 -8px 30px -10px rgba(23, 26, 30, 0.12)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "slow-zoom": { "0%, 100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.05)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "arch-rise": { "0%": { transform: "scaleY(0.6)", opacity: "0", transformOrigin: "bottom" }, "100%": { transform: "scaleY(1)", opacity: "1", transformOrigin: "bottom" } },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "slow-zoom": "slow-zoom 20s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "arch-rise": "arch-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
