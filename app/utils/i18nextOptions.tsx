export default {
  debug: process.env.NODE_ENV !== "production",
  fallbackLng: "de",
  supportedLngs: ["en", "de"],
  defaultNS: "common",
  ns: ["common"],
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
