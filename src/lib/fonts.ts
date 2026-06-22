import { Fraunces, Inter } from "next/font/google";

// Body font — Inter (clean, highly legible modern sans for dense coverage copy)
export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Heading font — Fraunces (warm variable serif; editorial, premium, pastoral feel)
export const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});
