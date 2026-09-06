import { createI18nextMiddleware } from "remix-i18next";
import translationDE from "../../public/locales/de/translation";
import translationEN from "../../public/locales/en/translation";
import translationRU from "../../public/locales/ru/translation";
import translationUKR from "../../public/locales/uk/translation";

export const [i18nextMiddleware, getLocale, getInstance] = createI18nextMiddleware({
  detection: {
    supportedLanguages: ["de", "en", "ru", "uk"],
    fallbackLanguage: "de",
    async findLocale({ request }) {
      // React Router 8 hands middleware the raw single-fetch URL, so a
      // client-side navigation to a locale root arrives as "/uk.data" rather
      // than "/uk". Strip the suffix before reading the locale segment.
      const pathname = new URL(request.url).pathname.replace(/\.data$/, "");
      return pathname.split("/").at(1) || null;
    },
  },
  i18next: {
    resources: {
      de: translationDE,
      en: translationEN,
      ru: translationRU,
      uk: translationUKR,
    },
  },
});
