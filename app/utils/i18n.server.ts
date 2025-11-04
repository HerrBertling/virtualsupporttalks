import { RemixI18Next } from "remix-i18next/server";

import i18nextOptions from "./i18nextOptions";

const i18next = new RemixI18Next({
  detection: {
    fallbackLanguage: i18nextOptions.fallbackLng,
    supportedLanguages: i18nextOptions.supportedLngs,
  },
  i18next: i18nextOptions,
});

export default i18next;
