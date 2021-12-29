<template>
  <a
    :href="url"
    class="flex items-center justify-center transition-opacity no-underline hover:opacity-80 focus:opacity-80 active:opacity-80 supporter"
    target="_blank"
    rel="noreferrer noopener"
    loading="lazy"
  >
    <div class="text-center">
      <picture>
        <source
          :srcset="`${image}?w=240&h=240&fit=pad&fm=webp`"
          type="image/webp"
        />
        <source
          :srcset="`${image}?w=240&h=240&fit=pad&fm=jpeg`"
          type="image/webp"
        />
        <img
          :src="`${image}?w=240&h=240&fit=pad`"
          :alt="title"
          loading="lazy"
          class="object-cover max-w-[300px] max-h-[300px] w-[80%] m-auto"
        />
      </picture>
      <h3 v-if="title" class="m-0 font-bold text-lg">{{ title }}</h3>
    </div>
  </a>
</template>

<script>
export default {
  name: 'SupporterTile',

  props: {
    url: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>
.supporter {
  content-visibility: auto;
  contain-intrinsic-size: 350px;
}
</style>
