<template>
  <nav class="relative z-30 lg:max-w-4xl" aria-role="navigation">
    <button
      class="lg:hidden"
      :aria-expanded="navExpanded"
      aria-controls="navigation"
      @click="toggleNav"
    >
      <span class="sr-only">Menu</span>
      <span class="w-6 h-6">
        <svg
          v-if="!navExpanded"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    </button>
    <ul
      :class="[
        'flex flex-col fixed top-16 right-0 w-screen max-w-[50rem] transition-transform duration-300 translate-x-[50rem] bg-white lg:flex-row lg:static lg:w-auto lg:bg-transparent lg:justify-end lg:items-center lg:h-auto lg:transform-none lg:top-auto lg:left-auto z-30',
        navExpanded && 'translate-x-0',
      ]"
    >
      <LayoutNavItem
        v-for="item in navigationItems"
        :key="item.path.de"
        :to="item.path[$i18n.locale]"
        @click="closeNav"
      >
        {{ item.title[$i18n.locale] }}
      </LayoutNavItem>
      <LayoutNavItem v-if="$i18n.locale === 'de'" :to="localePath('/', 'en')">
        English version
      </LayoutNavItem>
      <LayoutNavItem v-else :to="localePath('/', 'de')">
        Deutsche Version
      </LayoutNavItem>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HeaderNavigation',
  data() {
    return {
      navExpanded: false,
      navigationItems: [
        {
          title: {
            de: 'Ich suche Redezeit',
            en: 'I need speaking time',
          },
          path: {
            de: '/ich-suche-redezeit/',
            en: '/en/i-need-speaking-time/',
          },
        },
        {
          title: {
            de: 'Ich biete Redezeit',
            en: 'I offer speaking time',
          },
          path: {
            de: '/ich-biete-redezeit/',
            en: '/en/i-offer-speaking-time/',
          },
        },
        {
          title: {
            de: 'Netzwerk, Partner + Medien',
            en: 'Network, partner + media',
          },
          path: {
            de: '/netzwerk-partner-medien/',
            en: '/en/network-partner-media/',
          },
        },
        {
          title: {
            de: 'Spenden',
            en: 'Donate',
          },
          path: {
            de: '/jetzt-unterstuetzen-spende-an-redezeit/',
            en: '/en/support-now-donate-to-redezeit/',
          },
        },
        {
          title: {
            de: 'Blog',
            en: 'Blog',
          },
          path: {
            de: '/blog/',
            en: '/en/blog/',
          },
        },
      ],
    }
  },
  watch: {
    navExpanded(newValue) {
      this.$emit('navigation-active', newValue)
    },
  },
  methods: {
    toggleNav() {
      this.navExpanded = !this.navExpanded
    },
    closeNav() {
      this.navExpanded = false
    },
  },
}
</script>
