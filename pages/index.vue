<template>
  <div>
    <ContentBlocks :blocks="content" />
    <section :class="$style.contributorList">
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
  async asyncData({ $contentful }) {
    const { fields } = await $contentful.getEntry(pageIds.STARTPAGE)
    const { items } = await $contentful.getEntries({
      content_type: 'contributor',
    })
    return {
      seo: { title: fields.title, description: fields.description },
      content: fields.content,
      contributors: items,
    }
  },
  head() {
    return {
      ...this.seo,
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
</style>
