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
import { useTranslations } from "next-intl";
import { LocaleDropdown } from "../i18n/locale-dropdown";

type HeaderDrawerProps = {
  className: string;
  profile: React.ReactNode;
};

export const HeaderDrawer = ({ className, profile }: HeaderDrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const t = useTranslations("HEADER");

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
            <DrawerTitle className="hidden">{t("drawer.title")}</DrawerTitle>

            <div className="flex flex-col items-start gap-6">
              <h2>{t("drawer.navigation")}</h2>

              <nav className="flex flex-1 flex-col justify-center gap-4">
                <HeaderLink
                  onClick={handleCloseDrawer}
                  className="w-fit"
                  href="/"
                >
                  {t("links.home")}
                </HeaderLink>

                <HeaderLink onClick={handleCloseDrawer} href="/projects">
                  {t("links.projects")}
                </HeaderLink>

                <HeaderLink onClick={handleCloseDrawer} href="/experiencies">
                  {t("links.experiencies")}
                </HeaderLink>

                <HeaderLink onClick={handleCloseDrawer} href="/about">
                  {t("links.about")}
                </HeaderLink>

                <HeaderLink onClick={handleCloseDrawer} href="/references">
                  {t("links.references")}
                </HeaderLink>
              </nav>
            </div>
          </section>

          <div className="flex w-full flex-col items-start gap-6">
            <h2 className="flex w-full items-center justify-between">
              {t("drawer.settings")}

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
