<template>
  <div class="flex gap-2">
    <NuxtLink
      v-for="tag in tags"
      :key="tag"
      :to="`/blog/tag/${tag}/`"
      class="inline-block bg-vsp-200 text-vsp-900 hover:bg-vsp-300 rounded-full px-3 py-1 text-xs font-semibold"
    >
      {{ tag }}
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
