<template>
  <div
    :class="[$style.imageCollection, withPaddingTop && $style.withPaddingTop]"
  >
    <figure
      v-for="{ sys, fields } in images"
      :key="sys.id"
      :class="$style.collectionImage"
      role="figure"
      :aria-label="fields.image.fields.title"
    >
      <component :is="getComponent(fields)" v-bind="getFieldData(fields)">
        <picture>
          <source
            :srcset="`
              ${fields.image.fields.file.url}?h=450&fm=webp,
              ${fields.image.fields.file.url}?h=900&fm=webp 2x`"
            type="image/webp"
          />
          <source
            :srcset="`
              ${fields.image.fields.file.url}?h=450&fm=jpeg,
              ${fields.image.fields.file.url}?h=900&fm=jpeg 2x`"
            type="image/jpeg"
          />
          <img
            :src="`${fields.image.fields.file.url}?h=450`"
            :alt="fields.image.fields.title"
            height="450"
            loading="lazy"
            :class="$style.image"
          />
        </picture>
      </component>
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
    withPaddingTop: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getComponent(fields) {
      if (fields.url) {
        return 'a'
      }
      return 'div'
    },

    getFieldData(fields) {
      if (fields.url) {
        return {
          href: fields.url,
          target: '_blank',
        }
      }
      return {}
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

@media (min-width: 1024px) {
  .imageCollection {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.withPaddingTop {
  padding-top: 5rem;
}

.image {
  max-width: 100%;
  height: auto;
}
</style>
