export default {
  debug: false,
  // process.env.NODE_ENV !== "production",
  fallbackLng: "de",
  supportedLngs: ["en", "de"],
  defaultNS: "networkPartnerMedia",
  ns: ["networkPartnerMedia"],
  react: { useSuspense: true },
  resources: {
    en: {
      networkPartnerMedia: {
        title: {
          network: "Our network",
          partner: "Our company partners",
          media: "Redezeit in de Media",
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
