<template>
  <div
    :class="[
      'p-4 max-w-7xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12',
      withPaddingTop && 'pt-20',
    ]"
  >
    <figure
      v-for="{ sys, fields } in images"
      :key="sys.id"
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
            class="max-w-full h-auto"
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
