import type { CoachLanguage } from "../../types/contentful";

const flagCodes: Partial<Record<CoachLanguage, string>> = {
  bos: "BA",
  dan: "DK",
  de: "DE",
  en: "GB",
  esp: "ES",
  fr: "FR",
  hrv: "HR",
  nl: "NL",
  nor: "NO",
  pol: "PL",
  por: "PT",
  ru: "RU",
  tur: "TR",
  uk: "UA",
  vn: "VN",
};

export default function getFlagCode(languages: CoachLanguage[] | undefined): string[] {
  if (!languages) return ["DE"];
  const codes = languages.map((lang) => flagCodes[lang]).filter((c): c is string => Boolean(c));
  return [...new Set(codes)];
}
