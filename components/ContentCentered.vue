<template>
  <section
    :class="[
      `py-12 px-4 md:px-12 ${colors}`,
      hasButton && 'grid grid-cols-1 gap-4 justify-items-center pb-12',
    ]"
  >
    <div class="w-full mx-auto max-w-3xl">
      <ContentfulRichText :content="content" :use-white-prose="useWhiteProse" />
    </div>
    <div v-if="hasButton">
      <clever-button :to="buttonUrl" variant="secondary">
        {{ buttonText }}
      </clever-button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'CenteredContent',
  props: {
    backgroundcolor: {
      type: String,
      default: '#fff',
    },
    textcolor: {
      type: String,
      default: '#000',
    },
    buttonUrl: {
      type: String,
      default: null,
    },
    buttonText: {
      type: String,
      default: null,
    },
    content: {
      type: Object,
      default: () => ({}),
    },
    bgcolor: {
      type: String,
      default: 'white',
    },
  },
  computed: {
    styleObject() {
      return { backgroundColor: this.backgroundcolor, color: this.textcolor }
    },
    colors() {
      if (this.bgcolor === 'gray') {
        return 'bg-gray-400'
      }
      if (this.bgcolor === 'green') {
        return 'bg-vsp-500'
      }
      return 'bg-white'
    },
    useWhiteProse() {
      return this.bgcolor !== 'white'
    },
    hasButton() {
      return this.buttonUrl && this.buttonText
    },
  },
}
</script>
