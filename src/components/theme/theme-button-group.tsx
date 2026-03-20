import { Moon, Sun, SunMoon } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { THEME, setThemeServerFn, themeSchema } from "./theme";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { m } from "@/paraglide/messages";

export const ThemeButtonGroup = () => {
  const router = useRouter();

  const handleChangeTheme = (value: string) => {
    const parsed = themeSchema.safeParse(value);

    // This shouldn't happening, only to satify TS
    if (parsed.error) return;

    setThemeServerFn({ data: parsed.data }).then(() => {
      router.invalidate();
    });
  };

  return (
    <ToggleGroup type="single" size="lg" onValueChange={handleChangeTheme}>
      <ToggleGroupItem value={THEME.LIGHT}>
        <Sun className="h-5 w-5 scale-100 rotate-0 transition-all" />
        <span>{m.theme_light()}</span>
      </ToggleGroupItem>

      <ToggleGroupItem value={THEME.DARK}>
        <Moon className="h-5 w-5 scale-100 rotate-90 transition-all" />
        <span>{m.theme_dark()}</span>
      </ToggleGroupItem>

      <ToggleGroupItem value={THEME.AUTO}>
        <SunMoon className="h-5 w-5 scale-100 rotate-90 transition-all" />
        <span>{m.theme_system()}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
