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
  },
  router: {
    trailingSlash: true,
  },
  generate: {
    routes() {
      return Promise.all([
        contentfulClient.getEntries({
          content_type: 'page',
          locale: '*',
        }),
      ]).then(([pages]) => {
        const slugs = [
          // the startpage
          '/',
          // all german slugs if available
          ...pages.items
            .filter((entry) => !!entry.fields.slug.de)
            .map((entry) => {
              return `/${entry.fields.slug.de}`
            }),
          // all english slugs if available
          ...pages.items
            .filter((entry) => !!entry.fields.slug.en)
            .map((entry) => {
              return `/en/${entry.fields.slug.en}`
            }),
        ]
        return slugs
      })
    },
  },
  sitemap: {
    hostname: 'https://www.virtualsupporttalks.de',
    gzip: true,
    trailingSlash: true,
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
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-analytics',
    '@nuxt/postcss8',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/pwa', { workbox: false }],
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-i18n',
  ],

  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    vueI18n: {
      fallbackLocale: 'de',
      messages: {
        de: {
          blog: {
            overview: {
              title: 'Die neuesten Blog-Beiträge',
            },
          },
          coach: {
            filter: 'Liste der Zuhörer:innen filtern',
            count: 'angezeigt',
            focus: 'Meine Schwerpunkte:',
            email: 'E-Mail',
            website: 'Webseite',
            langFilter: 'Nach Sprache filtern',
            loading: 'Lade Zuhörer:innen…',
            emergency: 'Schnell erreichbar',
          },
          languages: {
            de: 'Deutsch',
            en: 'English',
            dan: 'Dansk',
            por: 'Português',
            pol: 'Polskie',
            nl: 'Nederlands',
            ukr: 'Український',
            ru: 'русский',
            esp: 'Español',
            fr: 'Français',
            tur: 'Türk',
            arab: 'عربي',
            nor: 'Norsk',
          },
          network: 'Unser Netzwerk',
          partner: 'Unsere Unternehmenspartner',
          media: 'Redezeit in den Medien',
          contributorHeadline: 'Das Team von REDEZEIT FÜR DICH',
          cookie: {
            accept: 'Akzeptieren',
            decline: 'Ablehnen',
            intro:
              'Diese Website verwendet Cookies. Weitere Informationen finden sich auf der',
            privacyPage: 'Datenschutz-Seite',
            settings: 'Cookie-Einstellungen bearbeiten',
            deactivate: 'Cookies aktiv',
            activate: 'Cookies nicht aktiv',
          },
          initiator: {
            more: 'Mehr über',
          },
        },
        en: {
          blog: {
            overview: {
              title: 'Latest blogposts',
            },
          },
          coach: {
            filter: 'Filter list of listeners',
            count: 'shown',
            focus: 'My focus areas:',
            email: 'Email',
            website: 'Website',
            langFilter: 'Filter by language',
            loading: 'Loading listeners…',
            emergency: 'Quick response',
          },
          languages: {
            de: 'Deutsch',
            en: 'English',
            dan: 'Dansk',
            por: 'Português',
            pol: 'Polskie',
            nl: 'Nederlands',
            ukr: 'Український',
            ru: 'русский',
          },
          network: 'Our network',
          partner: 'Our company partners',
          media: 'Redezeit in the media',
          contributorHeadline: 'The team of REDEZEIT FÜR DICH',
          cookie: {
            accept: 'Accept',
            decline: 'Decline',
            intro:
              'This website uses cookies. More informationen can be found on the',
            privacyPage: 'privacy page',
            settings: 'Adjust cookie settings',
            deactivate: 'Cookies enabled',
            activate: 'Cookies disabled',
          },
          initiator: {
            more: 'More about',
          },
        },
      },
    },
  },
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
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
