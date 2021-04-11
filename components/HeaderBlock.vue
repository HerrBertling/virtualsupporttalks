<template>
  <div :class="$style.wrapper" :style="{ backgroundColor: backgroundcolor }">
    <header :class="[$style.header, hasButton && $style.headerPaddingBottom]">
      <div :class="$style.content" :style="styleObject">
        <slot />
      </div>
      <div v-if="hasButton">
        <clever-button :to="buttonUrl" variant="secondary">{{
          buttonText
        }}</clever-button>
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
.wrapper {
  padding-top: 80px;
}

@media (min-width: 768px) {
  .wrapper {
    padding-top: 120px;
  }
}

.header {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  justify-items: center;
}
.headerPaddingBottom {
  padding-bottom: 3rem;
}
.content {
  height: clamp(200px, 35vh, 300px);
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .content {
    height: clamp(300px, 40vh, 500px);
  }
}
</style>
