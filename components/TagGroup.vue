<template>
  <div class="flex gap-2 items-start">
    <NuxtLink
      v-for="tag in tags"
      :key="tag.fields.tagName"
      :to="`/blog/tag/${tag.fields.slug}/`"
      class="inline-block bg-vsp-200 text-vsp-900 hover:bg-vsp-300 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap"
    >
      {{ tag.fields.tagName }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'TagGroup',
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
}
</script>
