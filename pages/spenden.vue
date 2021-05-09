<template>
  <div :class="$style.wrapper">
    <ContentBlocks :blocks="content" />
    <BetterplaceWidget />
    <AmazonCharityBanner />
  </div>
</template>

<script>
import pageIds from '~/utils/pageIds'

export default {
  name: 'DonationPage',
  transition: 'page',

  nuxtI18n: {
    paths: {
      de: '/jetzt-unterstuetzen-spende-an-redezeit/',
      en: '/support-now-donate-to-redezeit/',
    },
  },

  async asyncData({ app, $contentful }) {
    const { fields } = await $contentful.getEntry(pageIds.DONATIONS, {
      locale: app.i18n.locale,
    })
    return {
      title: fields.title,
      content: fields.content,
      seo: fields.seo?.fields,
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

<style module>
.wrapper {
  padding-top: 6rem;
}
</style>
