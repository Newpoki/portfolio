"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import { HeaderLink } from "./header-link";
import { useCallback, useState } from "react";
import { ThemeButtonGroup } from "../theme/theme-button-group";

type HeaderDrawerProps = {
  className: string;
};
export const HeaderDrawer = ({ className }: HeaderDrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger className={className}>
        <MenuIcon />
      </DrawerTrigger>

      <DrawerContent className="gap-10 p-4">
        <div className="flex flex-col items-start gap-20">
          <section>
            <DrawerTitle className="hidden">
              Mobile navigation menu and settings
            </DrawerTitle>

            <nav className="flex flex-1 flex-col justify-center gap-4">
              <HeaderLink
                onClick={handleCloseDrawer}
                className="w-fit"
                href="/"
              >
                home
              </HeaderLink>

              <HeaderLink onClick={handleCloseDrawer} href="/projects">
                projects
              </HeaderLink>

              <HeaderLink onClick={handleCloseDrawer} href="/experiencies">
                experiencies
              </HeaderLink>

              <HeaderLink onClick={handleCloseDrawer} href="/about">
                about
              </HeaderLink>

              <HeaderLink onClick={handleCloseDrawer} href="/references">
                references
              </HeaderLink>
            </nav>
          </section>

          <ThemeButtonGroup />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
