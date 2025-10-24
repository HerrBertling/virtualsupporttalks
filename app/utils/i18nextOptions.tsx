import translationDE from "../../public/locales/de/translation";
import translationEN from "../../public/locales/en/translation";
import translationRU from "../../public/locales/ru/translation";
import translationUKR from "../../public/locales/uk/translation";

export default {
  debug: false,
  fallbackLng: "de",
  supportedLngs: ["en", "de", "uk", "ru"],
  react: { useSuspense: false },
  resources: {
    en: translationEN,
    de: translationDE,
    uk: translationUKR,
    ru: translationRU,
  },
};
