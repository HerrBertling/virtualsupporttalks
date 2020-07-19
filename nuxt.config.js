export default {
  mode: "universal",
  target: "static",
  components: [{ path: "~/components" }],
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s | REDEZEIT FÜR DICH #virtualsupporttalks",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
      { name: "robots", content: "noindex" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href:
          "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☎️</text></svg>",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
      {
        rel: "preload",
        as: "style",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Roboto:wght@400;700&display=swap",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Roboto:wght@400;700&display=swap",
        media: "print",
        onload: "this.media='all'",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/css/base.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  content: {
    markdown: {
      basePlugins: [
        "remark-squeeze-paragraphs",
        "remark-slug",
        "remark-external-links",
        "remark-footnotes",
      ],
    },
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    // Doc: https://github.com/nuxt-community/stylelint-module
    "@nuxtjs/stylelint-module",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa", "@nuxt/content"],
  /*
   ** Build configuration
   */
  build: {
    loaders: {
      cssModules: {
        modules: {
          localIdentName: "[hash:base64:4]",
        },
      },
    },
  },
};
