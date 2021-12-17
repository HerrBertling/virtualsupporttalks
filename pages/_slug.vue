<template>
  <div>
    <ContentBlocks :blocks="blocks" />
  </div>
</template>

<script>
import getSiteMeta from '~/utils/getSiteMeta'

export default {
  name: 'BasicContent',
  transition: 'page',

  async asyncData({ app, $contentful, params }) {
    const { items } = await $contentful.getEntries({
      content_type: 'page',
      'fields.slug[in]': params.slug,
      locale: app.i18n.locale,
      include: 5,
    })
    return {
      blocks: items[0].fields.content,
      title: items[0].fields.title,
      seo: items[0].fields.seo?.fields,
    }
  },
  head() {
    const title = this.seo ? this.seo.title : this.title
    const metaInput = {
      title,
      description: this.seo?.description,
      url: this.$route.path,
      image: this.seo?.image?.fields.file?.url,
    }

    const meta = getSiteMeta(metaInput)

    return {
      title,
      meta,
    }
  },
}
</script>
