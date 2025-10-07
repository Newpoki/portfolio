import { defineRouting } from "next-intl/routing";

export const AVAILABLE_LOCALES = ["en", "fr"] as const;

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: AVAILABLE_LOCALES,

  // Used when no locale matches
  defaultLocale: "en",

  pathnames: {
    "/": {
      en: "/",
      fr: "/",
    },
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
    "/references": {
      en: "/references",
      fr: "/references",
    },
    "/signin": {
      en: "/signin",
      fr: "/signin",
    },
    "/admin": {
      en: "/admin",
      fr: "/admin",
    },
    "/admin/experiencies": {
      en: "/admin/experiencies",
      fr: "/admin/experiences",
    },
    "/admin/experiencies/new": {
      en: "/admin/experiencies/new",
      fr: "/admin/experiences/new",
    },
    "/admin/experiencies/[id]": {
      en: "/admin/experiencies/[id]",
      fr: "/admin/experiences/[id]",
    },
    "/admin/projects": {
      en: "/admin/projects",
      fr: "/admin/projets",
    },
    "/admin/projects/new": {
      en: "/admin/projects/new",
      fr: "/admin/projets/new",
    },
    "/admin/projects/[id]": {
      en: "/admin/projects/[id]",
      fr: "/admin/projets/[id]",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
