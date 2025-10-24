import type { TypeNavigationItem } from "./generated";

export type INavigationItem = TypeNavigationItem<
  "WITHOUT_UNRESOLVABLE_LINKS",
  "de" | "en" | "ru" | "uk"
>;

export type LOCALE_CODE = "de" | "en" | "ru" | "uk";
