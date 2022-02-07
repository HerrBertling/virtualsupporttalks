<template>
  <ClientOnly>
    <button
      v-if="canShare"
      class="border-full w-8 h-8 flex items-center justify-center border border-vsp-300 rounded-full -translate-y-1 text-gray-500 hover:text-gray-800 hover:border-vsp-600 hover:bg-vsp-100 active:text-gray-800 active:border-vsp-600 active:bg-vsp-100 focus:text-gray-800 focus:border-vsp-600 focus:bg-vsp-100"
      @click="shareItem"
    >
      <IconsShare :height="20" :width="20" />
    </button>
    <a
      v-else
      :href="`mailto:?subject=${title}&body=${url}%0D%0A%0D%0A${text}`"
      target="_blank"
      rel="noopener noreferrer"
      class="border-full w-8 h-8 flex items-center justify-center border border-vsp-300 rounded-full -translate-y-1 text-gray-500 hover:text-gray-800 hover:border-vsp-600 hover:bg-vsp-100 active:text-gray-800 active:border-vsp-600 active:bg-vsp-100 focus:text-gray-800 focus:border-vsp-600 focus:bg-vsp-100"
    >
      <IconsMail :height="20" :width="20" />
    </a>
  </ClientOnly>
</template>
<script>
export default {
  name: 'ShareButton',
  props: {
    title: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      canShare: false,
    }
  },
  mounted() {
    this.canShare = this.browserCanShare()
  },
  methods: {
    browserCanShare() {
      if (!navigator) {
        return false
      }
      return Boolean(navigator.share)
    },
    async shareItem() {
      try {
        await navigator.share({
          title: this.title,
          text: this.text,
          url: this.url,
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Could not share, sorry!')
      }
    },
  },
}
</script>
