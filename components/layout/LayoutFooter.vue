<template>
  <nav class="p-8 text-xs">
    <ul class="flex flex-col items-center justify-center md:flex-row">
      <li v-for="{ link, title } in footerNav" :key="link.de">
        <nuxt-link
          class="block p-2 underline md:py-4 md:px-2"
          :to="link[$i18n.locale]"
        >
          {{ title[$i18n.locale] }}
        </nuxt-link>
      </li>
    </ul>
    <a
      class="block my-8"
      href="https://www.contentful.com/"
      rel="nofollow"
      target="_blank"
    >
      <img
        src="https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"
        class="max-w-[100px] mx-auto w-full"
        alt="Powered by Contentful"
      />
    </a>
    <client-only>
      <cookie-law theme="dark-lime">
        <div
          slot-scope="props"
          class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8"
        >
          <p class="text-sm m-0 col-span-2">
            {{ $t('cookie.intro') }}
            <nuxt-link class="text-inherit" to="/datenschutz/">
              {{ $t('cookie.privacyPage') }}
            </nuxt-link>
          </p>
          <div class="md:text-center">
            <button
              class="bg-vsp-500 py-2 px-4 rounded-md border-2 text-sm text-white font-[inherit] border-vsp-500"
              @click="acceptCookies(props.accept)"
            >
              <span>{{ $t('cookie.accept') }}</span>
            </button>
          </div>
          <div class="md:text-center">
            <button
              class="bg-transparent py-2 px-4 rounded-md border-2 text-sm text-white font-[inherit] border-vsp-500"
              @click="declineCookies(props.close)"
            >
              <span>{{ $t('cookie.decline') }}</span>
            </button>
          </div>
        </div>
      </cookie-law>
    </client-only>
  </nav>
</template>

<script>
export default {
  name: 'LayoutFooter',
  props: {
    footerNav: {
      type: Array,
      default: () => [
        {
          link: {
            de: '/impressum/',
            en: '/en/imprint/',
            ru: '/ru/Выходные-данные /',
            uk: '/uk/Відомості/',
          },
          title: {
            de: 'Impressum',
            en: 'Legal info',
            ru: 'Юридическая информация',
            uk: 'Юридична інформація',
          },
        },

        {
          link: {
            de: '/datenschutz/',
            en: '/en/privacy/',
            ru: '/ru/Защита-данных/',
            uk: '/uk/Захист-даних/',
          },
          title: {
            de: 'Datenschutz',
            en: 'Privacy',
            ru: 'Конфиденциальность',
            uk: 'Конфіденційність',
          },
        },
      ],
    },
  },
  methods: {
    acceptCookies(handler) {
      this.$ga.enable()
      handler()
    },
    declineCookies(handler) {
      this.$ga.disable()
      handler()
    },
  },
}
</script>
