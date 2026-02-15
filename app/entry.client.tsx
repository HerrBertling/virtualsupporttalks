import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";
import translationDE from "../public/locales/de/translation";
import translationEN from "../public/locales/en/translation";
import translationRU from "../public/locales/ru/translation";
import translationUKR from "../public/locales/uk/translation";

async function hydrate() {
  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      debug: false,
      fallbackLng: "de",
      supportedLngs: ["de", "en", "ru", "uk"],
      ns: Object.keys(translationDE),
      defaultNS: "common",
      resources: {
        de: translationDE,
        en: translationEN,
        ru: translationRU,
        uk: translationUKR,
      },
      react: { useSuspense: false },
      detection: {
        order: ["htmlTag"],
        caches: [],
      },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
