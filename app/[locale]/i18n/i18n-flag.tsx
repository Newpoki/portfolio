"use client";

import { useTranslations } from "next-intl";
import { Locale } from "./routing";
import Image from "next/image";

// According to flagcdn documentation, it's using ISO 3166 code
const LOCALES_FLAG_MAPPING = {
  en: "gb",
  fr: "fr",
} as const satisfies Record<Locale, string>;

type IN18NFlagProps = {
  locale: Locale;
};

export const I18NFlag = ({ locale }: IN18NFlagProps) => {
  const t = useTranslations("I18N");

  return (
    <Image
      src={`https://flagcdn.com/w20/${LOCALES_FLAG_MAPPING[locale]}.webp`}
      width={24}
      height={18}
      alt={t("flag-alt", { flagCode: locale })}
      className="shrink-0"
    />
  );
};
