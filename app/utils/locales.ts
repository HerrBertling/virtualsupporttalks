import i18next from "i18next";
import type { LOCALE_CODE } from "../../@types/generated/contentful";

export const availableLocales: LOCALE_CODE[] = ["de", "en", "ru", "uk"];

export const getCurrentLocale = (pathname: string): string => {
  if (!pathname) return i18next.language || "de";
  const urlLocale = pathname?.split("/")[1];
  return urlLocale || i18next.language || "de";
};
