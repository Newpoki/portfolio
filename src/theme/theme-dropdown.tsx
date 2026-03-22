import { Moon, Sun } from "lucide-react";

import { useRouter } from "@tanstack/react-router";
import { THEME, setThemeServerFn } from "./theme";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { m } from "@/i18n/paraglide/messages";

const OPTIONS = [
  { value: THEME.LIGHT, label: m.theme_light() },
  { value: THEME.DARK, label: m.theme_dark() },
  { value: THEME.AUTO, label: m.theme_system() },
];

export const ThemeDropdown = () => {
  const router = useRouter();

  const handleChangeTheme = (option: (typeof OPTIONS)[number]) => {
    setThemeServerFn({ data: option.value }).then(() => {
      router.invalidate();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{m.theme_toggle_theme()}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleChangeTheme(option)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
