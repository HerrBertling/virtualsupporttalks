<template>
  <div>
    <ContentBlocks :blocks="content" />
  </div>
</template>
<script>
import pageIds from '~/utils/pageIds'
import getSiteMeta from '~/utils/getSiteMeta'

export default {
  name: 'StartPage',
  transition: 'page',

  async asyncData({ app, $contentful }) {
    const { fields } = await $contentful.getEntry(pageIds.STARTPAGE, {
      locale: app.i18n.locale,
    })
    return {
      seo: fields.seo?.fields,
      content: fields.content,
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

    const gverification = {
      hid: 'google-site-verification',
      name: 'google-site-verification',
      content: 'L3i7mNfABWt59rswWMPKe_fjYDpV7KpDRDe372TaPGY',
    }

    const fullMeta = [...meta, gverification]

    return {
      title,
      meta: fullMeta,
    }
  },
  mounted() {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (const registration of registrations) {
          registration.unregister()
        }
      })
    }
  },
}
</script>
