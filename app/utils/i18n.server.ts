import { RemixI18Next } from "remix-i18next";

import i18nextOptions from "./i18nextOptions";

let i18next = new RemixI18Next({
  detection: {
    fallbackLanguage: i18nextOptions.fallbackLng,
    supportedLanguages: i18nextOptions.supportedLngs,
  },
  i18next: i18nextOptions,
});

export default i18next;
