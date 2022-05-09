import i18next from "i18next";

export const availableLocales = ["de", "en", "ru", "uk"];

export const getCurrentLocale = (): string => i18next.language || "de";
