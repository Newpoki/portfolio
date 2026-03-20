import { I18NFlag } from "./i18n-flag";
import type { Locale} from "@/paraglide/runtime";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLocale, setLocale } from "@/paraglide/runtime";

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
          <I18NFlag locale={currentLocale} />

          <span className="lg:hidden">
            {LOCALES_OPTIONS[currentLocale]}
          </span>
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
                <I18NFlag locale={locale} />

                <span>{LOCALES_OPTIONS[locale]}</span>
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
