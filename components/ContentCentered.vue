<template>
  <section
    :class="[$style.wrapper, hasButton && $style.withButton]"
    :style="styleObject"
  >
    <div :class="$style.content">
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
    textColor: {
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
      return { backgroundColor: this.backgroundcolor, color: this.textColor }
    },
    hasButton() {
      return this.buttonUrl && this.buttonText
    },
  },
}
</script>
<style module>
.wrapper {
  padding: 3rem 1rem;
}

@media (min-width: 768px) {
  .wrapper {
    padding: 3rem;
  }
}

.withButton {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  justify-items: center;
  padding-bottom: 3rem;
}

.content {
  max-width: var(--widthContentMax);
  width: 100%;
  margin: 0 auto;
}
</style>
