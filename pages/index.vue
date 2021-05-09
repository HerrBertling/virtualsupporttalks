<template>
  <div>
    <ContentBlocks :blocks="content" />
    <section :class="$style.contributorList">
      <h2 :class="$style.contributorHeadline">
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
    const meta = this.seo
      ? Object.entries(this.seo).map((entry) => ({
          hid: entry[0],
          name: entry[0],
          content: entry[1],
        }))
      : []

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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 3rem;
  padding: 3rem 1rem;
  width: 100%;
  max-width: 1280px;
  align-items: center;
  margin: 0 auto;
}

.contributorHeadline {
  grid-column: 1 / -1;
  margin-bottom: 0;
}
</style>
