// This file defines Tailwind CSS variants using the `tailwind-variants` library to create styled components.
import { tv } from "tailwind-variants";
// Title component with base styles and variant options for color, size, and full width.
export const title = tv({ // Color variants for the title with gradient background options.
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: { // Size variants for the title with different text sizes and line heights.
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-[3rem]", // Increased line height
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: { // Full width variant for the title.
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md", // Default size variant.
  },
  compoundVariants: [
    { // Compound variant to apply gradient text color to all color options.
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

// Subtitle component with base styles and variant options for full width.
export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: { // Full width variant for the subtitle.
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true, // Default full width variant.
  },
});
