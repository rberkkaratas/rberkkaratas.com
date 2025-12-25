export const site = {
    name: import.meta.env.VITE_SITE_NAME ?? "R.Berk Karataş",
    description: import.meta.env.VITE_SITE_DESCRIPTION ?? "Personal website, projects, and writing.",
    siteUrl: import.meta.env.VITE_SITE_URL ?? "https://rberkkaratas.com",
    nav: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" }
    ],
    social: {
      github: "https://github.com/rberkkaratas",
      linkedin: "https://www.linkedin.com/in/rberkkaratas/"
    }
  } as const;
  