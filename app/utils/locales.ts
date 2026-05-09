import i18next from "i18next";
import type { LOCALE_CODE } from "types/contentful";
import { isScannerProbe, teapotResponse } from "./scannerTrap";

export const availableLocales: LOCALE_CODE[] = ["de", "en", "ru", "uk"];

export const getCurrentLocale = (pathname: string): string => {
  if (!pathname) return i18next.language || "de";
  const urlLocale = pathname?.split("/")[1];
  return urlLocale || i18next.language || "de";
};

// Throws a Response. Used at the start of every locale-aware loader to avoid
// pinging Contentful with a bogus locale (which it rejects with HTTP 400).
// Vulnerability scanners get HTTP 418 instead of a plain 404.
export function assertSupportedLocale(
  locale: string | undefined,
  request: Request
): asserts locale is LOCALE_CODE {
  if (locale && availableLocales.includes(locale as LOCALE_CODE)) return;
  if (isScannerProbe(request)) throw teapotResponse();
  throw new Response("Not Found", { status: 404 });
}
