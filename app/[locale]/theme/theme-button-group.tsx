"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "next-themes";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTranslations } from "next-intl";

export const ThemeButtonGroup = () => {
  const { setTheme } = useTheme();
  const t = useTranslations("THEME");

  return (
    <ToggleGroup type="single" size="lg" onValueChange={setTheme}>
      <ToggleGroupItem value="light">
        <Sun className="h-5 w-5 scale-100 rotate-0 transition-all" />
        <span>{t("light")}</span>
      </ToggleGroupItem>

      <ToggleGroupItem value="dark">
        <Moon className="h-5 w-5 scale-100 rotate-90 transition-all" />
        <span>{t("dark")}</span>
      </ToggleGroupItem>

      <ToggleGroupItem value="system">
        <SunMoon className="h-5 w-5 scale-100 rotate-90 transition-all" />
        <span>{t("system")}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
