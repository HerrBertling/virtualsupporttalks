<template>
  <section
    :class="$style.cb_contentImageBg"
    :style="{ backgroundImage: `url(${bgImg})` }"
  >
    <div :class="$style.cb_contentImageBg_content">
      <slot />
    </div>
  </section>
</template>
<script>
export default {
  name: "ContentImageBg",

  props: {
    backgroundImage: {
      type: String,
      default: null,
    },
  },

  computed: {
    bgImg() {
      return require(`~/${this.backgroundImage}`);
    },
  },
};
</script>
<style module>
.cb_contentImageBg {
  position: relative;
  display: flex;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 400px;
  text-align: center;
}

.cb_contentImageBg_content {
  padding: 3rem 1rem;
  max-width: var(--widthContentMax);
  width: 100vw;
  margin: auto;
  z-index: 1;
}

.cb_contentImageBg::after {
  content: "";
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
