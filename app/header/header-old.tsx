import { HeaderLink } from "./header-link";
import JavascriptIcon from "@/public/icons/javascript.svg";
import { HeaderMenu } from "./header-menu";

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 mb-8 flex items-center justify-between bg-white py-4 font-semibold">
      <HeaderMenu />

      <JavascriptIcon className="w-8 lg:w-8" />

      <nav className="hidden gap-8 lg:flex">
        <HeaderLink href="/">home</HeaderLink>
        <HeaderLink href="/projects">projects</HeaderLink>
        <HeaderLink href="/experiencies">experiencies</HeaderLink>
        <HeaderLink href="/about">about</HeaderLink>
        <HeaderLink href="/references">references</HeaderLink>
      </nav>
    </div>
  );
};
