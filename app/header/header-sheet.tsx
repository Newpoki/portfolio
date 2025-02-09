"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import { HeaderLink } from "./header-link";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useCallback, useState } from "react";

type HeaderDrawerProps = {
  className: string;
};
export const HeaderSheet = ({ className }: HeaderDrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleOpenDrawer}>
      <DrawerTrigger className={className}>
        <MenuIcon />
      </DrawerTrigger>

      <DrawerContent className="p-4">
        <DialogTitle className="hidden">Mobile navigation menu</DialogTitle>

        <nav className="flex flex-1 flex-col justify-center gap-6 ">
          <HeaderLink onClick={handleCloseDrawer} className="w-fit" href="/">
            home
          </HeaderLink>

          <HeaderLink
            onClick={handleCloseDrawer}
            className="w-fit"
            href="/projects"
          >
            projects
          </HeaderLink>

          <HeaderLink
            onClick={handleCloseDrawer}
            className="w-fit"
            href="/experiencies"
          >
            experiencies
          </HeaderLink>

          <HeaderLink
            onClick={handleCloseDrawer}
            className="w-fit"
            href="/about"
          >
            about
          </HeaderLink>

          <HeaderLink
            onClick={handleCloseDrawer}
            className="w-fit"
            href="/references"
          >
            references
          </HeaderLink>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};
