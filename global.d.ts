import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages;
}

declare module "next-intl" {
  interface AppConfig {
    // ...
    Locale: (typeof routing.locales)[number];
  }
}
