import translationEN from "../../public/locales/en/translation.json";
import translationDE from "../../public/locales/de/translation.json";

export default {
  debug: false,
  // process.env.NODE_ENV !== "production",
  fallbackLng: "de",
  supportedLngs: ["en", "de"],
  defaultNS: "",
  ns: ["networkPartnerMedia", "searchingCoach"],
  react: { useSuspense: false },
  resources: {
    en: translationEN,
    de: translationDE,
  },
};
