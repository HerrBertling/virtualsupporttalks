<template>
  <div
    :class="$style.cb_pageHeader_wrapper"
    :style="{ backgroundColor: backgroundColor }"
  >
    <header :class="$style.cb_pageHeader" :style="styleObject">
      <slot />
    </header>
  </div>
</template>
<script>
export default {
  name: 'HeaderBlock',

  props: {
    backgroundColor: {
      type: String,
      default: '#fff',
    },
    backgroundImage: {
      type: String,
      default: null,
    },
  },

  computed: {
    styleObject() {
      return {
        backgroundColor: this.backgroundColor,
        backgroundImage: `url(${this.backgroundImage})`,
      }
    },
  },
}
</script>
<style module>
.cb_pageHeader_wrapper {
  padding-top: 120px;
}
.cb_pageHeader {
  height: 40vh;
  min-height: 300px;
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
