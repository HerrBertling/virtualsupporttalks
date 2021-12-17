<template>
  <div class="container mx-auto">
    <header :class="$style.header">
      <div :class="[$style.headerInner, !mainImage && $style.withPlaceholder]">
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
import getSiteMeta from '~/utils/getSiteMeta'

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
      description: items[0].fields.description,
      seo: items[0].fields.seo?.fields,
      mainImage: items[0].fields.mainImage,
    }
  },
  head() {
    const metaInput = {
      title: this.seo?.title || this.title,
      description: this.seo?.description || this.description,
      url: this.$route.path,
      image: this.mainImage?.fields.file.url,
    }

    const meta = getSiteMeta(metaInput)

    return {
      title: metaInput.title,
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
  margin: 0 auto;
}
.headerInner {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  border-radius: 0.5rem;
  overflow: hidden;
  min-height: 16rem;
}

.withPlaceholder {
  background: var(--colorPrimary) url(@/assets/img/logo.png) no-repeat center;
  background-size: contain;
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
  height: 16rem;
  object-fit: cover;
  max-width: var(--widthContentMax);
  position: relative;
  z-index: 0;
}
</style>
