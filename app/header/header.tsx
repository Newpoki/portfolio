import JavascriptIcon from "@/public/icons/javascript.svg";
import { HeaderSheet } from "./header-sheet";
import { HeaderLink } from "./header-link";

export const Header = () => {
  return (
    <div className="main-layout-page-wrapper sticky top-0 z-50 mb-8 flex items-center justify-between border-b-1 border-b-gray-100 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <HeaderSheet className="flex lg:hidden" />

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
