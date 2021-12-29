<template>
  <div
    v-observe-visibility="visibilityChanged"
    :class="[
      'opacity-0 translate-y-10 scale-95 transition-all duration-300',
      isVisible && 'opacity-100 transform-none',
    ]"
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
