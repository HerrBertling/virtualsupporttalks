import translationDE from "../../public/locales/de/translation.json";
import translationEN from "../../public/locales/en/translation.json";

export default {
  debug: false,
  fallbackLng: "de",
  supportedLngs: ["en", "de", "uk", "ru"],

  ns: [
    "networkPartnerMedia",
    "searchingCoach",
    "blogpostCard",
    "blogpostByTag",
  ],

  react: { useSuspense: false },
  resources: {
    en: translationEN,
    de: translationDE,
  },
};
