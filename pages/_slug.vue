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
      title: items[0].fields.title,
      seo: items[0].fields.seo?.fields,
    }
  },
  head() {
    const title = this.seo ? this.seo.title : this.title
    const meta = this.seo
      ? Object.entries(this.seo).map((entry) => ({
          hid: entry[0],
          name: entry[0],
          content: entry[1],
        }))
      : []

    return {
      title,
      meta,
    }
  },
}
</script>
