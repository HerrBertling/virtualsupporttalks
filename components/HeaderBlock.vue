<template>
  <div
    class="cb_pageHeader_wrapper"
    :style="{ backgroundColor: backgroundColor }"
  >
    <header class="cb_pageHeader" :style="styleObject">
      <slot />
    </header>
  </div>
</template>
<script>
export default {
  name: "HeaderBlock",

  props: {
    backgroundColor: {
      type: String,
      default: "#fff",
    },
    backgroundImage: {
      type: String,
      default: null,
    },
  },

  computed: {
    bgImg() {
      return require(`~/${this.backgroundImage}`);
    },
    styleObject() {
      return {
        backgroundColor: this.backgroundColor,
        backgroundImage: `url(${this.bgImg})`,
      };
    },
  },
};
</script>
<style scoped>
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
