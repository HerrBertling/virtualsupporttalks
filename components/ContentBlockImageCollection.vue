<template>
  <div :class="$style.imageCollection">
    <figure
      v-for="{ sys, fields } in images"
      :key="sys.id"
      :class="$style.collectionImage"
      role="figure"
      :aria-label="fields.title"
    >
      <picture>
        <source
          :srcset="`${fields.file.url}?h=450&fm=webp, ${fields.file.url}?h=900&fm=webp 2x`"
          type="image/webp"
        />
        <source
          :srcset="`${fields.file.url}?h=450&fm=jpeg, ${fields.file.url}?h=900&fm=jpeg 2x`"
          type="image/jpeg"
        />
        <img
          :src="`${fields.file.url}?h=450`"
          :alt="name"
          height="450"
          loading="lazy"
          :class="$style.image"
        />
      </picture>
      <figcaption>{{ name }}</figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  name: 'ContentBlockImageCollection',

  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style module>
.imageCollection {
  padding: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .imageCollection {
    grid-template-columns: 1fr 1fr;
  }
}

.image {
  max-width: 100%;
  height: auto;
}
</style>
