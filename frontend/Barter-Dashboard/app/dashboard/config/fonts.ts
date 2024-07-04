// Importing specific fonts from the next/font/google package.
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

// Configuring the Inter font (imported as FontSans) with specific options.
export const fontSans = FontSans({
  // Specifying the subsets of the font to be used. In this case, only the Latin subset.
  subsets: ["latin"],
  // Defining a CSS variable name that will be used to apply this font throughout the application.
  variable: "--font-sans",
});

// Configuring the Fira Code font (imported as FontMono) with specific options.
export const fontMono = FontMono({
  // Specifying the subsets of the font to be used. In this case, only the Latin subset.
  subsets: ["latin"],
  // Defining a CSS variable name that will be used to apply this font throughout the application.
  variable: "--font-mono",
});
