<template>
  <div class="flex gap-2 items-start">
    <NuxtLink
      v-for="tag in tags"
      :key="tag"
      :to="`/blog/tag/${slugifiedLink(tag)}/`"
      class="inline-block bg-vsp-200 text-vsp-900 hover:bg-vsp-300 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap"
    >
      {{ tag }}
    </NuxtLink>
  </div>
</template>

<script>
import slugify from 'slugify'
export default {
  name: 'TagGroup',
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  methods: {
    slugifiedLink(tag) {
      return slugify(tag, { lower: true, locale: this.$i18n.locale })
    },
  },
}
</script>
