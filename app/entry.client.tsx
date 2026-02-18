import i18next, { type Resource } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";

// biome-ignore lint/suspicious/noExplicitAny: i18next resource type requires flexible typing
type TranslationModule = { default: Record<string, any> };

const localeImports: Record<string, () => Promise<TranslationModule>> = {
  de: () => import("../public/locales/de/translation"),
  en: () => import("../public/locales/en/translation"),
  ru: () => import("../public/locales/ru/translation"),
  uk: () => import("../public/locales/uk/translation"),
};

async function hydrate() {
  const detectedLocale = document.documentElement.lang || "de";
  const locale = detectedLocale in localeImports ? detectedLocale : "de";

  const [currentTranslation, fallbackTranslation] = await Promise.all([
    localeImports[locale]().then((m) => m.default),
    locale !== "de" ? localeImports.de().then((m) => m.default) : Promise.resolve(null),
  ]);

  const resources: Resource = {
    [locale]: currentTranslation,
  };
  if (fallbackTranslation) {
    resources.de = fallbackTranslation;
  }

  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      debug: false,
      fallbackLng: "de",
      supportedLngs: ["de", "en", "ru", "uk"],
      ns: Object.keys(currentTranslation),
      defaultNS: "common",
      resources,
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
