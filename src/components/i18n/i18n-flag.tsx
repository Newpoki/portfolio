import type { Locale } from "@/paraglide/runtime";
import { m } from "@/paraglide/messages";

// According to flagcdn documentation, it's using ISO 3166 code
// For english and fr only, it seems useless, but its still important
const LOCALES_FLAG_MAPPING = {
  en: "gb",
  fr: "fr",
} as const satisfies Record<Locale, string>;

type IN18NFlagProps = {
  locale: Locale;
};

export const I18NFlag = ({ locale }: IN18NFlagProps) => {
  return (
    <img
      src={`https://flagcdn.com/w20/${LOCALES_FLAG_MAPPING[locale]}.webp`}
      width={24}
      height={18}
      alt={m.i18n_flag_alt({ flagCode: locale })}
      className="shrink-0"
    />
  );
};
