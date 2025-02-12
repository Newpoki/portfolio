import JavascriptIcon from "@/public/icons/javascript.svg";
import { HeaderDrawer } from "./header-drawer";
import { HeaderLink } from "./header-link";
import { HeaderThemeToggle } from "./header-theme-toggle";

export const Header = () => {
  return (
    <div className="main-layout-px border-b-border supports-backdrop-filter:bg-background/60 sticky top-0 z-50 mb-8 flex items-center justify-between border-b py-4 backdrop-blur-sm">
      <HeaderDrawer className="flex lg:hidden" />

      <JavascriptIcon className="w-8 lg:w-8" />

      <nav className="hidden gap-8 lg:flex">
        <HeaderLink href="/">home</HeaderLink>
        <HeaderLink href="/projects">projects</HeaderLink>
        <HeaderLink href="/experiencies">experiencies</HeaderLink>
        <HeaderLink href="/about">about</HeaderLink>
        <HeaderLink href="/references">references</HeaderLink>
      </nav>

      <HeaderThemeToggle />
    </div>
  );
};
