import { LocaleDropdown } from "../i18n/locale-dropdown";
import { ThemeDropdown } from "../theme/theme-dropdown";
import { HeaderDrawer } from "./header-drawer";
import { HeaderLink } from "./header-link";
import { HeaderProfile } from "./header-profile";
import JavascriptIcon from "@/icons/javascript.svg?react";
import { m } from "@/paraglide/messages";

export const Header = () => {
  return (
    <div className="main-layout-px border-b-border supports-backdrop-filter:bg-background/60 sticky top-0 z-50 mb-(--header-m-b) flex h-(--header-h) border-b py-4 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-(--app-max-w) items-center justify-between">
        <HeaderDrawer
          className="flex lg:hidden"
          // Using this pattern allow me to use server component inside a client component
          profile={<HeaderProfile />}
        />

        <JavascriptIcon className="w-8 text-black lg:w-8" />

        <nav className="hidden gap-8 lg:flex">
          <HeaderLink to="/"> {m.header_links_home()}</HeaderLink>
          <HeaderLink to="/projects"> {m.header_links_projects()}</HeaderLink>
          <HeaderLink to="/experiencies">
            {m.header_links_experiencies()}
          </HeaderLink>
          <HeaderLink to="/about"> {m.header_links_about()}</HeaderLink>
          <HeaderLink to="/references">
            {m.header_links_references()}
          </HeaderLink>
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
