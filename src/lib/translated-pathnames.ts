import type { FileRoutesByTo } from "../routeTree.gen";
import type { Locale } from "@/i18n/paraglide/runtime";

type RoutePath = keyof FileRoutesByTo;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const excludedPaths = ["admin", "docs", "api"] as const;

type PublicRoutePath = Exclude<
  RoutePath,
  `${string}${(typeof excludedPaths)[number]}${string}`
>;

type TranslatedPathname = {
  pattern: string;
  localized: Array<[Locale, string]>;
};

function toUrlPattern(path: string) {
  if (path === "/") return ""; // root stays empty for pattern matching

  return (
    path
      // .replace(/\/\$$/, "/:path(.*)?")
      .replace(/\/\$$/, "/:path(.*)?")
      // .replace(/\{-\$([a-zA-Z0-9_]+)\}/g, ":$1?")
      .replace(/\{-\$([a-zA-Z0-9_]+)\}/g, ":$1?")
      // .replace(/\$([a-zA-Z0-9_]+)/g, ":$1")
      .replace(/\$([a-zA-Z0-9_]+)/g, ":$1")
      // remove trailing slash
      .replace(/\/+$/, "")
  );
}

function createTranslatedPathnames(
  input: Record<PublicRoutePath, Record<Locale, string>>,
): Array<TranslatedPathname> {
  return Object.entries(input).map(([pattern, locales]) => ({
    pattern: toUrlPattern(pattern) || "/", // 👈 empty string → "/"
    localized: Object.entries(locales).map(
      ([locale, path]) =>
        [locale as Locale, `/${locale}${toUrlPattern(path)}`] satisfies [
          Locale,
          string,
        ],
    ),
  }));
}

export const translatedPathnames = createTranslatedPathnames({
  "/": {
    en: "/",
    fr: "/",
  },
  "/projects": {
    en: "/projects",
    fr: "/projets",
  },
  "/projects/$slug": {
    en: "/projects/$slug",
    fr: "/projets/$slug",
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
  "/login": {
    en: "/login",
    fr: "/login",
  },
});
