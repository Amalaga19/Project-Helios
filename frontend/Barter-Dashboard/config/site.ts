export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Project Helios",
  description: "Lighting up Madrid with solar-powered generators.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Sign up", // Correct label
      href: "/signup",
    },
    {
      label: "User login", // Correct label
      href: "/userlogin",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Amalaga19/Barter-Project",
  },
};
