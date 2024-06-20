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
      label: "Signup",
      href: "/signup",
    },
    {
      label: "Userlogin",
      href: "/userlogin",
    }
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Amalaga19/Barter-Project",
    docs: "https://nextui.org",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
