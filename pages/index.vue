<template>
  <div>
    <ContentBlocks :blocks="content" />
    <section
      :class="[
        $style.contributorList,
        'grid gap-12 py-12 px-4 w-full max-w-7xl items-start mx-auto',
      ]"
    >
      <h2 class="col-span-full text-2xl">
        {{ $t('contributorHeadline') }}
      </h2>
      <ContributorCard
        v-for="contributor in contributors"
        :key="`${contributor.fields.lastname}_${contributor.fields.firstname}`"
        :first-name="contributor.fields.firstname"
        :last-name="contributor.fields.lastname"
        :image="contributor.fields.image.fields.file.url"
        :slug="contributor.fields.slug"
      />
    </section>
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
    const { items } = await $contentful.getEntries({
      content_type: 'contributor',
    })
    return {
      seo: fields.seo?.fields,
      content: fields.content,
      contributors: items,
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

<style module>
.contributorList {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
