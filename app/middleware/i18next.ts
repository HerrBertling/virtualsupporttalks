import { createI18nextMiddleware } from "remix-i18next/middleware";
import translationDE from "../../public/locales/de/translation";
import translationEN from "../../public/locales/en/translation";
import translationRU from "../../public/locales/ru/translation";
import translationUKR from "../../public/locales/uk/translation";

export const [i18nextMiddleware, getLocale, getInstance] = createI18nextMiddleware({
  detection: {
    supportedLanguages: ["de", "en", "ru", "uk"],
    fallbackLanguage: "de",
    async findLocale(request) {
      const pathname = new URL(request.url).pathname;
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
