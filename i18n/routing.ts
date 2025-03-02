import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "fr"],

  // Used when no locale matches
  defaultLocale: "en",

  pathnames: {
    "/projects": {
      en: "/projects",
      fr: "/projets",
    },
    "/projects/[project-slug]": {
      en: "/projects/[project-slug]",
      fr: "/projets/[project-slug]",
    },
    "/experiencies": {
      en: "/experiencies",
      fr: "/experiences",
    },
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
