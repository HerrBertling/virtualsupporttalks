<template>
  <div
    v-observe-visibility="visibilityChanged"
    :class="[$style.wrapper, isVisible && $style.visible]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FadeIn',

  data() {
    return {
      isVisible: false,
    }
  },

  methods: {
    visibilityChanged(isVisible, entry) {
      if (!this.isVisible && isVisible) {
        this.isVisible = true
      }
    },
  },
}
</script>

<style module>
.wrapper {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: opacity 300ms ease-in, transform 300ms ease-in;
}

.visible {
  opacity: 1;
  transform: none;
}
</style>
