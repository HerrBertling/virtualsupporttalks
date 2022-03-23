export default function getFlagCode(languages: string[] | undefined) {
  const flagCodes = {
    ukr: "UA",
    ru: "RU",
    de: "DE",
    en: "GB",
    esp: "ES",
    nl: "NL",
    nor: "NO",
    pol: "PL",
    por: "PT",
  };
  const result = [];

  // Add DE language always and as default
  if (!languages) {
    result.push("DE");
  } else {
    if (!languages.includes("de")) {
      result.unshift("DE");
    }
    languages.forEach((lang: string) => result.push(flagCodes[lang]));
  }
  return result;
}
