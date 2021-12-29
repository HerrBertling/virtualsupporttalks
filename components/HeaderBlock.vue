<template>
  <div class="pt-20 md:pt-32" :style="{ backgroundColor: backgroundcolor }">
    <header
      :class="[
        'grid grid-cols-1 gap-4 justify-items-center',
        hasButton && 'pb-12',
      ]"
    >
      <div
        :class="[$style.content, 'w-full bg-contain bg-center bg-no-repeat']"
        :style="styleObject"
      >
        <slot />
      </div>
      <div v-if="hasButton">
        <clever-button :to="buttonUrl" variant="secondary">
          {{ buttonText }}
        </clever-button>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: 'HeaderBlock',

  props: {
    backgroundcolor: {
      type: String,
      default: '#fff',
    },
    image: {
      type: Object,
      default: () => ({}),
    },
    buttonUrl: {
      type: String,
      default: null,
    },
    buttonText: {
      type: String,
      default: null,
    },
  },

  computed: {
    styleObject() {
      return {
        backgroundcolor: this.backgroundcolor,
        backgroundImage: `url(${this.image.fields.file.url})`,
      }
    },
    hasButton() {
      return this.buttonUrl && this.buttonText
    },
  },
}
</script>
<style module>
.content {
  height: clamp(200px, 35vh, 300px);
}

@media (min-width: 768px) {
  .content {
    height: clamp(300px, 40vh, 500px);
  }
}
</style>
