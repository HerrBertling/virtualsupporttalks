<template>
  <div>
    <ContentBlocks :blocks="blocks" />
  </div>
</template>

<script>
export default {
  name: 'BasicContent',
  async asyncData({ $contentful, params }) {
    const { items } = await $contentful.getEntries({
      content_type: 'page',
      'fields.slug[in]': params.slug,
    })
    return {
      blocks: items[0].fields.content,
    }
  },
  watch: {
    hasCookiesAccepted(newValue) {
      localStorage['cookie:accepted'] = newValue
    },
  },
  mounted() {
    if (localStorage['cookie:accepted']) {
      this.hasCookiesAccepted = localStorage['cookie:accepted']
    }
  },
}
</script>
