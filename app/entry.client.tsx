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

  // Load every supported locale, not just the one this document was rendered
  // with. The language switcher navigates client-side, so useChangeLanguage can
  // move i18next to any locale without a reload. A locale whose bundle is absent
  // silently resolves through fallbackLng instead, which renders German UI on an
  // English page while the CMS content (from the loader) is correctly English.
  const availableLocales = Object.keys(localeImports);
  const translations = await Promise.all(
    availableLocales.map((lng) => localeImports[lng]().then((m) => m.default))
  );

  const resources: Resource = Object.fromEntries(
    availableLocales.map((lng, index) => [lng, translations[index]])
  );

  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      debug: false,
      fallbackLng: "de",
      supportedLngs: ["de", "en", "ru", "uk"],
      ns: Object.keys(resources[locale]),
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
