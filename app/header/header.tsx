import { useRef } from "react";
import { HeaderDrawer } from "./header-drawer";
import { HeaderLink } from "./header-link";
import Hamburger from "@/public/icons/hamburger.svg";

export const Header = () => {
  return (
    <header className="mb-8 flex justify-between py-4 font-semibold">
      <div className=" group/menu flex lg:hidden">
        <button>
          <Hamburger width={32} />
        </button>

        <HeaderDrawer />
      </div>

      <span>Jason Savelli</span>

      <div className="hidden gap-8 lg:flex">
        <HeaderLink href="/">home</HeaderLink>
        <HeaderLink href="/projects">projects</HeaderLink>
        <HeaderLink href="/experiencies">experiencies</HeaderLink>
        <HeaderLink href="/about">about</HeaderLink>
      </div>
    </header>
  );
};
