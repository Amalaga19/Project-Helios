// This file defines the configuration for the site, including the site's name, description, navigation items, and external links.
export type SiteConfig = typeof siteConfig;

// Configuration object containing site-specific settings and navigation items.
export const siteConfig = {
  name: "Project Helios", // The name of the project.
  description: "Lighting up Madrid with solar-powered generators.", // A brief description of the project.
  navItems: [// Array of navigation items for the main menu.
    {
      label: "Home", // Label for the Home page link.
      href: "/", // URL for the Home page.
    },
    {
      label: "Pricing", // Label for the Pricing page link.
      href: "/pricing", // URL for the Pricing page.
    },
    {
      label: "Team", // Label for the Team page link.
      href: "/team", // URL for the Team page.
    },
    {
      label: "Dashboard", // Label for the Dashboard page link.
      href: "/dashboard", // URL for the Dashboard page.
    },
    {
      label: "Login", // Label for the Login page link.
      href: "/login", // URL for the Login page.
    },
    {
      label: "Sign up", // Label for the Sign-up page link.
      href: "/signup", // URL for the Sign-up page.
    },
    {
      label: "User login", // Label for the User Login page link.
      href: "/userlogin", // URL for the User Login page.
    },
    {
      label: "Logout", // Label for the Logout link.
      href: "/logout", // URL for logging out.
    },
  ],
  navMenuItems: [
    {
      label: "Profile", // Label for the Profile page link.
      href: "/profile", // URL for the Profile page.
    },
    {
      label: "Team", // Label for the Team page link.
      href: "/team", // URL for the Team page.
    },
    {
      label: "Logout", // Label for the Logout link.
      href: "/logout", // URL for logging out.
    },
  ],
  links: {
    github: "https://github.com/Amalaga19/Barter-Project", // URL for the project's GitHub repository.
  },
};
