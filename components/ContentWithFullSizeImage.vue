<template>
  <section
    :class="$style.wrapper"
    :style="{ backgroundColor: backgroundColor }"
  >
    <img
      :src="image"
      :class="[$style.image, imageRight && $style.imageRight]"
    />
    <div :class="[$style.content, imageRight && $style.imageRight]">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContentWithFullSizeImage',

  props: {
    backgroundColor: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    imageRight: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style module>
.wrapper {
  display: grid;
  grid-template-columns: 100vw;
}

.image {
  object-fit: cover;
  height: 60vh;
  width: 100%;
}

.content {
  padding: 2rem 1rem;
}

@media (min-width: 960px) {
  .wrapper {
    grid-template-columns: repeat(2, 50vw);
  }
  .image {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .image.imageRight {
    grid-column: 2;
    grid-row: 1;
  }

  .content {
    padding: 3rem;
    padding-top: 9rem;
    max-width: 70ch;
  }
  .content.imageRight {
    grid-column: 1;
    grid-row: 1;
    margin-left: auto;
  }
}
</style>
