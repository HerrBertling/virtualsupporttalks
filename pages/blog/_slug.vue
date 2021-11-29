<template>
  <div>
    <header :class="$style.header">
      <div :class="$style.headerInner">
        <img
          v-if="mainImage"
          :class="$style.mainImage"
          :src="mainImage.fields.file.url"
        />
        <h1 :class="$style.title">{{ title }}</h1>
      </div>
    </header>
    <ContentBlocks :blocks="blocks" />
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  transition: 'page',

  async asyncData({ app, $contentful, params }) {
    const { items } = await $contentful.getEntries({
      content_type: 'blogpost',
      'fields.slug[in]': params.slug,
      locale: app.i18n.locale,
      include: 5,
    })
    return {
      blocks: items[0].fields.content,
      title: items[0].fields.title,
      seo: items[0].fields.seo?.fields,
      mainImage: items[0].fields.mainImage,
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
.header {
  padding: 6rem 1rem 0;
  width: 100%;
  max-width: var(--widthContentMax);
  margin: 0 auto -6rem;
}
.headerInner {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  border-radius: 0.5rem;
  overflow: hidden;
}
.headerInner:after {
  content: '';
  display: block;
  grid-column: 1;
  grid-row: 1;
  z-index: 1;
  background-color: var(--colorPrimary);
  mix-blend-mode: multiply;
}

.title {
  grid-column: 1;
  grid-row: 1;
  position: relative;
  z-index: 2;
  align-self: end;
  margin: 0;
  padding: 1rem;
  color: white;
}
.mainImage {
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: auto;
  max-height: 16rem;
  object-fit: cover;
  max-width: var(--widthContentMax);
  position: relative;
  z-index: 0;
}
</style>
