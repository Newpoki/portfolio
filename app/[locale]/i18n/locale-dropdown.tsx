"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AVAILABLE_LOCALES, Locale } from "./routing";
import { useLocale } from "next-intl";
import { Link, usePathname } from "./navigation";
import { useParams } from "next/navigation";
import { I18NFlag } from "./i18n-flag";

const LOCALES_OPTIONS = {
  en: "English",
  fr: "Français",
} as const satisfies Record<Locale, string>;

export const LocaleDropdown = () => {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <I18NFlag locale={currentLocale as Locale} />

          <span className="lg:hidden">
            {LOCALES_OPTIONS[currentLocale as Locale]}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {AVAILABLE_LOCALES.map((locale) => {
          return (
            <DropdownMenuItem key={locale} asChild>
              <Link
                // @ts-expect-error TS has strict validation about pathname / params combo
                // But as we're already on the page, this combo is 100% good, so we can ignore here
                href={{ pathname, params }}
                locale={locale}
              >
                <I18NFlag locale={locale} />

                <span>{LOCALES_OPTIONS[locale]}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
