<template>
  <section :class="$style.img_link_wrapper">
    <nuxt-link :class="$style.img_link" :to="link1">
      <img :src="image1" :alt="text1" />

      <h2>{{ text1 }}</h2>
    </nuxt-link>

    <nuxt-link :class="$style.img_link" :to="link2">
      <img :src="image2" :alt="text2" />

      <h2>{{ text2 }}</h2>
    </nuxt-link>
  </section>
</template>
<script>
export default {
  name: 'TwoImages',

  props: {
    image1: {
      type: String,
      default: '',
    },
    image2: {
      type: String,
      default: '',
    },
    text1: {
      type: String,
      default: '',
    },
    text2: {
      type: String,
      default: '',
    },
    link1: {
      type: String,
      default: '',
    },
    link2: {
      type: String,
      default: '',
    },
  },
}
</script>
<style module>
.img_link_wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  padding: 4rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .img_link_wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

.img_link[href]:link,
.img_link[href]:visited {
  max-width: 100%;
  overflow: hidden;
  text-decoration: none;
  background: #c0c0c0;
}

.img_link[href]:hover img,
.img_link[href]:focus img,
.img_link[href]:active img {
  opacity: 0.8;
}

.img_link img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: opacity 300ms ease-in;
}

.img_link h2 {
  margin: 0;
  padding: 1rem;
}
</style>
