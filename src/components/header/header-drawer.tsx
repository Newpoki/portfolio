import { MenuIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { ThemeButtonGroup } from "../theme/theme-button-group";
import { LocaleDropdown } from "../i18n/locale-dropdown";
import { HeaderLink } from "./header-link";
import { m } from "@/paraglide/messages";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type HeaderDrawerProps = {
  className: string;
  profile: React.ReactNode;
};

export const HeaderDrawer = ({ className, profile }: HeaderDrawerProps) => {
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
              {m.header_drawer_title()}
            </DrawerTitle>

            <div className="flex flex-col items-start gap-6">
              <h2>{m.header_drawer_navigation()}</h2>

              <nav className="flex flex-1 flex-col justify-center gap-4">
                <HeaderLink
                  onClick={handleCloseDrawer}
                  className="w-fit"
                  to="/"
                >
                  {m.header_links_home()}
                </HeaderLink>

                <HeaderLink onClick={handleCloseDrawer} to="/projects">
                  {m.header_links_projects()}
                </HeaderLink>

                <HeaderLink onClick={handleCloseDrawer} to="/experiencies">
                  {m.header_links_experiencies()}
                </HeaderLink>

                <HeaderLink onClick={handleCloseDrawer} to="/about">
                  {m.header_links_about()}
                </HeaderLink>

                <HeaderLink onClick={handleCloseDrawer} to="/references">
                  {m.header_links_references()}
                </HeaderLink>
              </nav>
            </div>
          </section>

          <div className="flex w-full flex-col items-start gap-6">
            <h2 className="flex w-full items-center justify-between">
              {m.header_drawer_settings()}

              <div
                className="flex items-center gap-4"
                onClick={handleCloseDrawer}
              >
                {profile}
              </div>
            </h2>

            <div>
              <ThemeButtonGroup />

              <LocaleDropdown />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
