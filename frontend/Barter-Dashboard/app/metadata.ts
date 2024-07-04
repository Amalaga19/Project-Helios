// Importing the Metadata type from the Next.js framework.
import { Metadata } from "next";

// Importing the site configuration object from the local config file.
import { siteConfig } from "@/config/site";

// Defining metadata for the site, which includes title, description, and icons.
export const metadata: Metadata = {
  // Title object with default and template properties.
  // The default title is set to the site's name from the site configuration.
  // The template allows dynamic titles for different pages by inserting the page-specific title (%s)
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  // The description of the site, pulled from the site configuration.
  description: siteConfig.description,
  // The path to the site's favicon icon.
  icons: {
    icon: "/favicon.ico",
  },
};

// Defining viewport-related properties, including theme color preferences.
export const viewport = {
  // themeColor is an array of objects specifying different colors based on the user's color scheme preference.
  // When the user's color scheme is light, the theme color will be white.
  // When the user's color scheme is dark, the theme color will be black.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
