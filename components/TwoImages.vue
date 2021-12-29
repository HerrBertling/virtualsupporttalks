<template>
  <section
    class="grid grid-cols-1 md:grid-cols-2 gap-6 py-16 px-4 max-w-7xl mx-auto"
  >
    <fade-in v-for="{ image, link, text } in images" :key="link">
      <nuxt-link
        class="group block max-w-full overflow-hidden rounded-md shadow-lg no-underline bg-gray-300"
        :to="localePath(link)"
      >
        <img
          :src="image"
          :alt="text"
          class="w-full h-[400px] object-cover transition-opacity duration-300 group-hover:opacity-80"
        />

        <h2 class="m-0 px-4 py-8 text-2xl font-bold font-headline">
          {{ text }}
        </h2>
      </nuxt-link>
    </fade-in>
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

  computed: {
    images() {
      return [
        {
          image: this.image1,
          text: this.text1,
          link: this.link1,
        },
        {
          image: this.image2,
          text: this.text2,
          link: this.link2,
        },
      ]
    },
  },
}
</script>
