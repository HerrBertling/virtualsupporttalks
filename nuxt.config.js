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
              return `
              /en/${entry.fields.slug.en}`
            }),
          // all ukrainian slugs if available
          ...pages.items
            .filter((entry) => !!entry.fields.slug.uk)
            .map((entry) => {
              return `/uk/${entry.fields.slug.uk}`
            }), // all english slugs if available
          ...pages.items
            .filter((entry) => !!entry.fields.slug.ru)
            .map((entry) => {
              return `/ru/${entry.fields.slug.ru}`
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
    locales: [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'de',
        name: 'Deutsch',
      },
      {
        code: 'uk',
        name: 'Ukrainian',
      },
      {
        code: 'ru',
        name: 'Russian',
      },
    ],
    defaultLocale: 'de',
    vueI18n: {
      fallbackLocale: 'de',
      messages: {
        de: {
          blog: {
            overview: {
              title: 'Die neuesten Blog-Beiträge',
            },
            tag: {
              title: 'mit dem Schlagwort',
            },
          },
          email: 'E-Mail',
          phone: 'Telefon',
          website: 'Web',
          coach: {
            filter: 'Was ist dein Thema?',
            count: 'Zuhörer*innen angezeigt',
            focus: 'Meine Schwerpunkte:',
            email: 'E-Mail',
            website: 'Webseite',
            langFilter: 'In welcher Sprache möchtest du mit jemandem reden?',
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
            uk: 'Український',
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
            tag: {
              title: 'with the tag',
            },
          },
          email: 'Email',
          phone: 'Phone',
          website: 'Web',
          coach: {
            filter: 'Filter list of listeners by topic',
            count: 'coaches shown',
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
            uk: 'Український',
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
        uk: {
          blog: {
            overview: {
              title: 'Останні публікації в блозі',
            },
            tag: {
              title: 'з тегом',
            },
          },
          email: 'електронна пошта',
          phone: 'Телефон',
          website: 'Інтернет',
          coach: {
            filter: 'Фільтрувати список слухачів за темою',
            count: 'показані тренери',
            focus: 'Мої напрямки діяльності:',
            email: 'електронна пошта',
            website: 'Інтернет',
            langFilter: 'Фільтрувати за мовою',
            loading: 'Завантаження слухачів…',
            emergency: 'Швидка відповідь',
          },
          languages: {
            de: 'Deutsch',
            en: 'English',
            dan: 'Dansk',
            por: 'Português',
            pol: 'Polskie',
            nl: 'Nederlands',
            uk: 'Український',
            ru: 'русский',
          },
          network: 'Наша мережа',
          partner: 'Партнери нашої компанії',
          media: 'Редайт у ЗМІ',
          contributorHeadline: 'Команда REDEZEIT FÜR DICH',
          cookie: {
            accept: 'Прийняти',
            decline: 'Відхилення',
            intro:
              'Цей веб-сайт використовує файли cookie. Більше інформації можна знайти на',
            privacyPage: 'сторінку конфіденційності',
            settings: 'Налаштуйте параметри cookie',
            deactivate: 'Файли cookie ввімкнено',
            activate: 'Файли cookie вимкнено',
          },
          initiator: {
            more: 'Більше про',
          },
        },
        ru: {
          blog: {
            overview: {
              title: 'Последние сообщения в блогах',
            },
            tag: {
              title: 'с тегом',
            },
          },
          email: 'Эл. адрес',
          phone: 'Телефон',
          website: 'Интернет',
          coach: {
            filter: 'Фильтровать список слушателей по теме',
            count: 'показаны тренеры',
            focus: 'Мои направления:',
            email: 'Эл. адрес',
            website: 'Интернет сайт',
            langFilter: 'Фильтровать по языку',
            loading: 'Загрузка слушателей…',
            emergency: 'Быстрый ответ',
          },
          languages: {
            de: 'Deutsch',
            en: 'English',
            dan: 'Dansk',
            por: 'Português',
            pol: 'Polskie',
            nl: 'Nederlands',
            uk: 'Український',
            ru: 'русский',
          },
          network: 'Наша сеть',
          partner: 'Партнеры нашей компании',
          media: 'Редезейт в СМИ',
          contributorHeadline: 'Команда REDEZEIT FÜR DICH',
          cookie: {
            accept: 'Принимать',
            decline: 'Отклонить',
            intro:
              'Этот веб-сайт использует файлы cookie. Дополнительную информацию можно найти на',
            privacyPage: 'страница конфиденциальности',
            settings: 'Изменить настройки файлов cookie',
            deactivate: 'Файлы cookie включены',
            activate: 'Файлы cookie отключены',
          },
          initiator: {
            more: 'Больше о',
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
