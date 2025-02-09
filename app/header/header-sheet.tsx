import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import { HeaderLink } from "./header-link";
import { DialogTitle } from "@radix-ui/react-dialog";

export const HeaderSheet = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>

      <DrawerContent className="p-4">
        <DialogTitle className="hidden">Mobile navigation menu</DialogTitle>

        <nav className="flex flex-1 flex-col justify-center gap-6 ">
          <HeaderLink className="w-fit" href="/">
            home
          </HeaderLink>

          <HeaderLink className="w-fit" href="/projects">
            projects
          </HeaderLink>

          <HeaderLink className="w-fit" href="/experiencies">
            experiencies
          </HeaderLink>

          <HeaderLink className="w-fit" href="/about">
            about
          </HeaderLink>

          <HeaderLink className="w-fit" href="/references">
            references
          </HeaderLink>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};
