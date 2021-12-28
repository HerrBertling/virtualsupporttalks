<template>
  <section
    class="grid grid-cols-1 w-screen lg:grid-cols-2"
    :style="{ backgroundColor: backgroundColor }"
  >
    <img
      :src="image"
      :class="[
        'object-cover h-auto max-h-[60vh] w-full lg:h-full lg:max-h-max',
        imageRight && 'lg:col-start-2 lg:row-start-1',
      ]"
    />
    <div
      :class="[
        'py-8 px-4 lg:px-12 lg:pb-12 lg:pt-36 lg:max-w-[70ch]',
        imageRight && 'col-start-1 row-start-1 ml-auto',
      ]"
    >
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
