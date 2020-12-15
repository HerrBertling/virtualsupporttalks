<template>
  <div>
    <ContentBlocks :blocks="blocks" />
  </div>
</template>

<script>
export default {
  name: 'BasicContent',
  transition: 'page',

  async asyncData({ $contentful, params }) {
    const { items } = await $contentful.getEntries({
      content_type: 'page',
      'fields.slug[in]': params.slug,
    })
    return {
      blocks: items[0].fields.content,
    }
  },
}
</script>
