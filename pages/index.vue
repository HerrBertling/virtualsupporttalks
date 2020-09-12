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
export default {
  async asyncData({ $contentful }) {
    const { fields } = await $contentful.getEntry('2W0lOJiaTbb5Dptc3mjRhN')
    const { items } = await $contentful.getEntries({
      content_type: 'contributor',
    })
    return { title: fields.title, content: fields.content, contributors: items }
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
