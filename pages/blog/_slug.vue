<template>
  <div class="container mx-auto">
    <header class="pt-24 px-4 pb-6 w-full max-w-4xl mx-auto">
      <div
        :class="[
          'grid grid-cols-1 grid-rows-1 rounded-lg overflow-hidden shadow-lg min-h-[16rem] after:row-start-1 after:col-start-1 after:content-[\'\'] after:block after:z-10 after:bg-vsp-500 after:mix-blend-multiply after:relative',
          !mainImage && `bg-contain ${$style.withPlaceholder}`,
        ]"
      >
        <img
          v-if="mainImage"
          class="col-start-1 row-start-1 w-full min-h-64 object-cover max-w-4xl relative z-0"
          :src="mainImage.fields.file.url"
        />
        <h1
          class="col-start-1 row-start-1 relative z-20 self-end m-0 p-4 text-white text-5xl font-bold"
        >
          {{ title }}
        </h1>
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
.withPlaceholder {
  background: var(--colorPrimary) url(@/assets/img/logo.png) no-repeat center;
}
</style>
