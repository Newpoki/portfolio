import { HeaderLink } from "./header-link";
import JavascriptIcon from "@/public/icons/javascript.svg";
import { HeaderMenu } from "./header-menu";

export const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between py-4 font-semibold">
      <HeaderMenu />

      <JavascriptIcon className="w-8 lg:w-8" />

      <ul className="hidden gap-8 lg:flex">
        <li>
          <HeaderLink href="/">home</HeaderLink>
        </li>
        <li>
          <HeaderLink href="/projects">projects</HeaderLink>
        </li>
        <li>
          <HeaderLink href="/experiencies">experiencies</HeaderLink>
        </li>
        <li>
          <HeaderLink href="/about">about</HeaderLink>
        </li>
      </ul>
    </header>
  );
};
