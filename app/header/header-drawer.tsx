"use client";

import { useCallback } from "react";
import { HeaderLink } from "./header-link";
import MenuIcon from "@/public/icons/close.svg";

export const HeaderDrawer = () => {
  const handleCloseDrawer = useCallback(() => {
    const { activeElement } = document;

    if (
      activeElement != null &&
      "blur" in activeElement &&
      typeof activeElement.blur === "function"
    ) {
      activeElement.blur();
    }
  }, []);

  return (
    <dialog
      className="top-0 z-50 m-0 flex h-[100dvh] w-[100dvw] translate-x-[-100dvw] flex-col bg-transparent p-4 backdrop-blur-md transition-transform duration-500 group-focus-within/menu:translate-x-0"
      open
    >
      <button className="flex self-start" onClick={handleCloseDrawer}>
        <MenuIcon width={24} />
      </button>

      <div className="flex flex-1 flex-col justify-center gap-6 ">
        <HeaderLink className="self-start" href="/">
          home
        </HeaderLink>
        <HeaderLink className="self-start" href="/projects">
          projects
        </HeaderLink>
        <HeaderLink className="self-start" href="/experiencies">
          experiencies
        </HeaderLink>
        <HeaderLink className="self-start" href="/about">
          about
        </HeaderLink>
      </div>
    </dialog>
  );
};
