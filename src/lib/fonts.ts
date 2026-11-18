import localFont from "next/font/local";

// Body font — Inter (clean, highly legible modern sans for dense coverage copy)
export const bodyFont = localFont({
  src: [
    { path: "./fonts/Inter-variable.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Inter-variable.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Inter-variable.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Inter-variable.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

// Heading font — Fraunces (warm variable serif; editorial, premium, pastoral feel)
export const headingFont = localFont({
  src: [
    { path: "./fonts/Fraunces-variable.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Fraunces-variable.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Fraunces-variable.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Fraunces-variable.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Fraunces-variable.woff2", weight: "800", style: "normal" },
    { path: "./fonts/Fraunces-variable.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
