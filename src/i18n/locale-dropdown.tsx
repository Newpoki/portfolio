import { LocaleFlag } from "./locale-flag";
import type { Locale } from "@/i18n/paraglide/runtime";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { getLocale, setLocale } from "@/i18n/paraglide/runtime";

const LOCALES_OPTIONS = {
  en: "English",
  fr: "Français",
} as const satisfies Record<Locale, string>;

const AVAILABLE_LOCALES = Object.keys(LOCALES_OPTIONS) as Array<Locale>;

export const LocaleDropdown = () => {
  const currentLocale = getLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <LocaleFlag locale={currentLocale} />

          <span className="lg:hidden">{LOCALES_OPTIONS[currentLocale]}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {AVAILABLE_LOCALES.map((locale) => {
          return (
            <DropdownMenuItem
              key={locale}
              asChild
              onClick={() => setLocale(locale)}
            >
              <span>
                <LocaleFlag locale={locale} />

                <span>{LOCALES_OPTIONS[locale]}</span>
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
