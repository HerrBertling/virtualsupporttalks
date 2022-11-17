export default function getFlagCode(languages: string[] | undefined) {
  const flagCodes = {
    dan: "DK",
    de: "DE",
    en: "GB",
    esp: "ES",
    fr: "FR",
    nl: "NL",
    nor: "NO",
    pol: "PL",
    por: "PT",
    ru: "RU",
    ukr: "UA",
  };
  const result: string[] = [];

  languages
    ? languages.forEach((lang) => {
        result.push(flagCodes[lang as keyof typeof flagCodes]);
      })
    : ["DE"];

  return [...new Set(result)];
}
