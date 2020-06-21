<template>
  <section
    :class="$style.cb_contentFullSizeImg"
    :style="{ backgroundColor: backgroundColor }"
  >
    <img
      :src="img"
      :class="[
        $style.cb_contentFullSizeImg__image,
        imageRight && $style.imageRight,
      ]"
    />
    <div
      :class="[
        $style.cb_contentFullSizeImg__content,
        imageRight && $style.imageRight,
      ]"
    >
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: "ContentWithFullSizeImage",

  props: {
    backgroundColor: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    imagePlacement: {
      type: String,
      default: "left",
    },
  },

  computed: {
    img() {
      return require(`~/${this.image}`);
    },
    imageRight() {
      return this.imagePlacement === "right";
    },
  },
};
</script>

<style module>
.cb_contentFullSizeImg {
  display: grid;
  grid-template-columns: 100vw;
}

.cb_contentFullSizeImg__image {
  object-fit: cover;
  height: 60vh;
  width: 100%;
}

.cb_contentFullSizeImg__content {
  padding: 2rem 1rem;
}

@media (min-width: 960px) {
  .cb_contentFullSizeImg {
    grid-template-columns: repeat(2, 50vw);
  }
  .cb_contentFullSizeImg__image {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .cb_contentFullSizeImg__image.imageRight {
    grid-column: 2;
    grid-row: 1;
  }

  .cb_contentFullSizeImg__content {
    padding: 3rem;
    padding-top: 9rem;
  }
  .cb_contentFullSizeImg__content.imageRight {
    grid-column: 1;
    grid-row: 1;
  }
}
</style>
