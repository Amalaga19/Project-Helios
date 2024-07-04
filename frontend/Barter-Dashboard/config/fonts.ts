// This file imports and configures the Google Fonts to be used in the project.
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

// Configure the Inter font with Latin subset and assign it to a CSS variable.
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Configure the Fira Code font with Latin subset and assign it to a CSS variable.
export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
