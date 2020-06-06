<template>
  <section :class="$style.cb_centeredContent" :style="styleObject">
    <div :class="$style.cb_centeredContent_content">
      <slot />
    </div>
  </section>
</template>
<script>
export default {
  name: "CenteredContent",

  props: {
    backgroundColor: {
      type: String,
      default: "#fff",
    },
    textColor: {
      type: String,
      default: "#000",
    },
  },

  computed: {
    styleObject() {
      return {
        backgroundColor: this.backgroundColor,
        color: this.textColor,
      };
    },
  },
};
</script>
<style module>
.cb_centeredContent {
  padding: 1rem;
}

@media (min-width: 768px) {
  .cb_centeredContent {
    padding: 3rem;
  }
}

.cb_centeredContent_content {
  max-width: var(--widthContentMax);
  width: 100%;
  margin: 0 auto;
}
</style>
