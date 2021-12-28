<template>
  <section
    :class="[
      'py-12 px-4 md:px-12',
      hasButton && 'grid grid-cols-1 gap-4 justify-items-center pb-12',
    ]"
    :style="styleObject"
  >
    <div class="w-full mx-auto max-w-3xl">
      <slot />
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
  },
  computed: {
    styleObject() {
      return { backgroundColor: this.backgroundcolor, color: this.textcolor }
    },
    hasButton() {
      return this.buttonUrl && this.buttonText
    },
  },
}
</script>
