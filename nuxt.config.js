import { createClient } from 'contentful'

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
})

export default {
  target: 'static',
  modern: true,
  components: [{ path: '~/components' }],
  publicRuntimeConfig: {
    contentfulKey: process.env.CONTENTFUL_ACCESSTOKEN,
    contentfulSpace: process.env.CONTENTFUL_SPACE,
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | REDEZEIT FÜR DICH #virtualsupporttalks',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☎️</text></svg>',
      },
    ],
  },
  generate: {
    routes() {
      return Promise.all([
        contentfulClient.getEntries({
          content_type: 'page',
        }),
      ]).then(([pages]) => {
        return [...pages.items.map((entry) => entry.fields.slug)]
      })
    },
  },
  sitemap: {
    hostname: 'https://www.virtualsupporttalks.de',
    gzip: true,
  },
  googleAnalytics: {
    id: ' UA-164320013-1',
    disabled: true,
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/base.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/contentful',
    '~/plugins/observe.client.js',
    { src: '~/plugins/cookie-law', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    'nuxt-esbuild',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-analytics',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  /*
   ** Build configuration
   */
  build: {
    loaders: {
      cssModules: {
        modules: {
          localIdentName: '[hash:base64:4]',
        },
      },
    },
  },
}
