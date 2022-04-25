<template>
  <div
    v-click-outside="onClickOutside"
    class="w-auto mr-1"
    @click="show = !show"
  >
    <div
      class="block p-4 no-underline lg:inline-block lg:py-1 lg:px-2 lg:rounded-md rounded-md cursor-pointer hover:text-vsp-500 hover:bg-white"
    >
      <button class="justify-center flex items-center">
        <GlobeIcon :height="40" :width="40" class="mr-1" />
        {{ $i18n.locale.toUpperCase() }}
      </button>
    </div>
    <div
      v-if="show"
      class="bg-white absolute flex flex-col items-center z-50 mt-4 lg:rounded-md rounded-md"
    >
      <div
        v-for="lang in availableLocales"
        :key="lang.code"
        class="my-4 mx-3 hover:text-vsp-500"
      >
        <nuxt-link
          :to="localePath('/', lang.code)"
          class="p-4 no-underline block lg:py-1 lg:px-2 lg:rounded-md rounded-md hover:text-vsp-500"
        >
          {{ lang.code.toUpperCase() }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import GlobeIcon from '~/components/icons/globe.vue'

export default {
  name: 'LanguageSwitcher',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    GlobeIcon,
  },
  props: {
    locales: {
      type: [String],
      default: null,
    },
    navExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      locale: this.$i18n.localeProperties.name,
      displayLocales: this.$i18n.locales.filter((loc) => loc !== this.locale),
      show: false,
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  methods: {
    handleClick(lang) {
      this.show = false
      this.displayLocales = this.locales.filter((loc) => loc !== lang)
      return (this.locale = lang)
    },
    onClickOutside(event) {
      if (this.show) {
        this.show = false
      }
    },
  },
}
</script>
