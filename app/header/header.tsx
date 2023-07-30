import { HeaderDrawer } from "./header-drawer";
import { HeaderLink } from "./header-link";
import Hamburger from "@/public/icons/hamburger.svg";
import JavascriptIcon from "@/public/icons/javascript.svg";

export const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between py-4 font-semibold">
      <div className=" group/menu flex lg:hidden">
        <button>
          <Hamburger width={32} />
        </button>

        <HeaderDrawer />
      </div>

      <JavascriptIcon className="w-8 lg:w-8" />

      <div className="hidden gap-8 lg:flex">
        <HeaderLink href="/">home</HeaderLink>
        <HeaderLink href="/projects">projects</HeaderLink>
        <HeaderLink href="/experiencies">experiencies</HeaderLink>
        <HeaderLink href="/about">about</HeaderLink>
      </div>
    </header>
  );
};
