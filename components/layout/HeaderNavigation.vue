<template>
  <nav class="relative z-30 lg:max-w-4xl" aria-role="navigation">
    <button
      :class="[
        'lg:hidden rounded-full w-12 h-12 flex items-center justify-center',
        navExpanded && 'bg-white',
      ]"
      :aria-expanded="navExpanded"
      aria-controls="navigation"
      @click="toggleNav"
    >
      <span class="sr-only">Menu</span>
      <span class="inline-block w-6 h-6">
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
        'flex flex-col rounded-md overflow-hidden shadow-2xl fixed top-24 right-0 w-screen max-w-[90vw] transition-transform duration-300 bg-white lg:flex-row lg:static lg:w-auto lg:shadow-none lg:rounded-none lg:bg-transparent lg:justify-end lg:items-center lg:h-auto lg:transform-none lg:top-auto lg:left-auto z-30',
        navExpanded && '-translate-x-[5vw]',
        !navExpanded && 'translate-x-[90vw]',
      ]"
    >
      <LayoutNavItem
        v-for="item in navigation"
        :key="item.sys.id"
        :to="getNavLink(item)"
        @click="closeNav"
      >
        {{ item.fields.title }}
      </LayoutNavItem>
      <LayoutNavItem
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="localePath('/', locale.code)"
        >{{ locale.name }}</LayoutNavItem
      >
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HeaderNavigation',
  data() {
    return {
      navExpanded: false,
      navigation: [],
    }
  },
  async fetch() {
    const navItems = await this.$contentful.getEntry('67EXX84GGCZfZayO0JxrFg', {
      include: 3,
      locale: this.$i18n.locale,
    })
    this.navigation = navItems.fields.items
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  watch: {
    navExpanded(newValue) {
      this.$emit('navigation-active', newValue)
    },
    lang(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$fetch()
      }
    },
  },
  methods: {
    toggleNav() {
      this.navExpanded = !this.navExpanded
    },
    closeNav() {
      this.navExpanded = false
    },
    getNavLink(item) {
      const isGerman = this.$i18n.locale === 'de'

      const finalUrl = item.fields.page
        ? `${isGerman ? '/' : `/${this.$i18n.locale}/`}${
            item.fields.page.fields.slug
          }/`
        : isGerman
        ? `${item.fields.url.replace('https://www.virtualsupporttalks.de', '')}`
        : item.fields.url.replace(
            'https://www.virtualsupporttalks.de/',
            `/${this.$i18n.locale}/`
          )
      return finalUrl
    },
  },
}
</script>
