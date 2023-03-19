import translationDE from "../../public/locales/de/translation.json";
import translationEN from "../../public/locales/en/translation.json";
import translationUKR from "../../public/locales/uk/translation.json";
import translationRU from "../../public/locales/ru/translation.json";

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
