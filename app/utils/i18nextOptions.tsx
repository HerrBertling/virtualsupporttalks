export default {
  debug: false,
  // process.env.NODE_ENV !== "production",
  fallbackLng: "de",
  supportedLngs: ["en", "de"],
  defaultNS: "",
  ns: ["networkPartnerMedia", "searchingCoach"],
  react: { useSuspense: false },
  resources: {
    en: {
      networkPartnerMedia: {
        title: {
          network: "Our network",
          partner: "Our company partners",
          media: "Redezeit in de Media",
        },
      },
      searchingCoach: {
        filter: {
          language: "TESTFilter by language",
          tag: "TESTFilter by tag",
          submitCta: "TESTApply filter",
        },
      },
    },
    de: {
      networkPartnerMedia: {
        title: {
          network: "Unser Netzwerk",
          partner: "Unsere Unternehmenspartner",
          media: "Redezeit in den Medien",
        },
      },
    },
  },
};
