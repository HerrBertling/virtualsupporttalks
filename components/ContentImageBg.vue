<template>
  <section
    :class="$style.wrapper"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div :class="[$style.content, withPaddingTop && $style.paddingTop]">
      <slot />
    </div>
  </section>
</template>
<script>
export default {
  name: 'ContentImageBg',

  props: {
    backgroundImage: {
      type: String,
      default: null,
    },
    withPaddingTop: {
      type: Boolean,
      default: false,
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

.content {
  padding: 3rem 1rem;
  max-width: var(--widthContentMax);
  width: 100vw;
  margin: auto;
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
