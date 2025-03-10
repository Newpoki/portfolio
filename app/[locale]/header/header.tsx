import JavascriptIcon from "@/public/icons/javascript.svg";
import { HeaderDrawer } from "./header-drawer";
import { HeaderLink } from "./header-link";
import { ThemeDropdown } from "../theme/theme-dropdown";
import { getTranslations } from "next-intl/server";
import { LocaleDropdown } from "../i18n/locale-dropdown";
import { HeaderProfile } from "./header-profile";

export const Header = async () => {
  const t = await getTranslations("HEADER");

  return (
    <div className="main-layout-px border-b-border supports-backdrop-filter:bg-background/60 sticky top-0 z-50 mb-[var(--header-m-b)] flex h-[var(--header-h)] border-b py-4 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[var(--app-max-w)] items-center justify-between">
        <HeaderDrawer
          className="flex lg:hidden"
          // Using this pattern allow me to use server component inside a client component
          profile={<HeaderProfile />}
        />

        <JavascriptIcon className="w-8 text-black lg:w-8" />

        <nav className="hidden gap-8 lg:flex">
          <HeaderLink href="/">{t("links.home")}</HeaderLink>
          <HeaderLink href="/projects">{t("links.projects")}</HeaderLink>
          <HeaderLink href="/experiencies">
            {t("links.experiencies")}
          </HeaderLink>
          <HeaderLink href="/about">{t("links.about")}</HeaderLink>
          <HeaderLink href="/references">{t("links.references")}</HeaderLink>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeDropdown />

          <LocaleDropdown />

          <HeaderProfile />
        </div>
      </div>
    </div>
  );
};
