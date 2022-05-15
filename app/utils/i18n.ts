import { FileSystemBackend, RemixI18Next } from "remix-i18next";
import i18nextOptions from "./i18nextOptions";

let backend = new FileSystemBackend("../public/locales");

export let i18n = new RemixI18Next(backend, {
  fallbackLng: i18nextOptions.fallbackLng,
  supportedLanguages: i18nextOptions.supportedLngs,
});
