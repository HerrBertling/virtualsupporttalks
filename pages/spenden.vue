<template>
  <div :class="$style.wrapper">
    <ContentBlocks :blocks="content" />
    <BetterplaceWidget />
    <AmazonCharityBanner />
  </div>
</template>

<script>
import pageIds from '~/utils/pageIds'
import getSiteMeta from '~/utils/getSiteMeta'

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

<style module>
.wrapper {
  padding-top: 6rem;
}
</style>
