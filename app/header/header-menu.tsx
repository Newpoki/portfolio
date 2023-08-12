"use client";

import Hamburger from "@/public/icons/hamburger.svg";
import { HeaderDrawer } from "./header-drawer";
import { useCallback, useState } from "react";

export const HeaderMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <div className="flex lg:hidden">
      <button
        type="button"
        onClick={handleOpenDrawer}
        name="drawer navigation button"
      >
        <Hamburger width={32} />
      </button>

      <HeaderDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </div>
  );
};
