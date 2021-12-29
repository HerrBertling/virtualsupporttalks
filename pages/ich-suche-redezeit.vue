<template>
  <div>
    <ContentBlocks :blocks="content" />
    <ContentBlockCoachList />
  </div>
</template>
<script>
import pageIds from '~/utils/pageIds'
import getSiteMeta from '~/utils/getSiteMeta'

export default {
  name: 'SucheRedezeit',
  transition: 'page',

  nuxtI18n: {
    paths: {
      de: '/ich-suche-redezeit',
      en: '/i-need-speaking-time',
    },
  },

  async asyncData({ app, $contentful }) {
    const page = await $contentful.getEntry(pageIds.SEARCH_HELP, {
      locale: app.i18n.locale,
    })

    return {
      title: page.fields.title,
      content: page.fields.content,
      seo: page.fields.seo?.fields,
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
