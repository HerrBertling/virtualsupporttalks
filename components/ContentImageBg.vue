<template>
  <section
    :class="[$style.wrapper, hasButton && $style.withButton]"
    :style="{ backgroundImage: `url(${usedBackgroundImage})` }"
  >
    <div :class="[$style.content, withPaddingTop && $style.paddingTop]">
      <slot />
    </div>
    <div v-if="hasButton" :class="$style.buttonWrapper">
      <clever-button :to="buttonUrl">
        {{ buttonText }}
      </clever-button>
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
<style module>
.wrapper {
  position: relative;
  display: flex;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 400px;
  text-align: center;
}

.withButton {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  justify-items: center;
  padding-bottom: 3rem;
}

.content {
  padding: 3rem 1rem;
  max-width: var(--widthContentMax);
  width: 100vw;
  margin: auto;
  z-index: 1;
}

.buttonWrapper {
  z-index: 1;
}

.paddingTop {
  padding: 7rem 1rem 3rem;
}

.wrapper::after {
  content: '';
  display: block;
  background-color: rgba(192, 192, 192, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}
</style>
