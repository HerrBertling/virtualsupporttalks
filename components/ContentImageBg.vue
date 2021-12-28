<template>
  <section
    :class="[
      'relative flex bg-cover bg-center bg-no-repeat min-h-[400px] text-center',
      'after:content-[\'\'], after:block after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after::z-0 after:bg-gray-400/70',
      hasButton && 'grid grid-cols-1 gap-4 justify-center pb-12',
    ]"
    :style="{ backgroundImage: `url(${usedBackgroundImage})` }"
  >
    <div
      :class="[
        'py-12 px-4 max-w-4xl w-screen m-auto z-10',
        withPaddingTop && 'pt-28 px-4 py-12',
      ]"
    >
      <slot />
    </div>
    <div
      v-if="hasButton"
      class="flex flex-row flex-wrap items-center justify-center gap-8 z-10"
    >
      <clever-button :to="buttonUrl">
        {{ buttonText }}
      </clever-button>
      <AmazonCharityBanner v-if="withCharityBanner" />
    </div>
  </section>
</template>
<script>
export default {
  name: 'ContentImageBg',

  props: {
    backgroundImage: {
      type: Object,
      default: () => ({}),
    },
    withPaddingTop: {
      type: Boolean,
      default: false,
    },
    buttonUrl: {
      type: String,
      default: null,
    },
    buttonText: {
      type: String,
      default: null,
    },
    withCharityBanner: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasButton() {
      return this.buttonUrl && this.buttonText
    },
    usedBackgroundImage() {
      return this.backgroundImage?.fields?.file?.url
    },
  },
}
</script>
