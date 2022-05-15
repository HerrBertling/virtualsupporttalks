import { LOCALE_CODE } from "@types/generated/contentful";
import i18next from "i18next";

export const availableLocales: LOCALE_CODE[] = ["de", "en", "ru", "uk"];

export const getCurrentLocale = (): string => i18next.language || "de";
