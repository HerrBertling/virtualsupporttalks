export default {
  debug: process.env.NODE_ENV !== "production",
  fallbackLng: "de",
  supportedLngs: ["de"],
  defaultNS: "common",
  ns: [],
  react: { useSuspense: true },
  resources: {
    en: {
      common: {
        key: "hello from english site",
      },
    },
    de: {
      common: {
        key: "this is the german page",
      },
    },
  },
};
