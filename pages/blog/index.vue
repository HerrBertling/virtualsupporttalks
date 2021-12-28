<template>
  <div class="container mx-auto max-w-6xl">
    <header class="pt-24 px-4 w-full">
      <h2 class="text-3xl font-bold font-headline">
        {{ $t('blog.overview.title') }}
      </h2>
    </header>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 my-4 mx-auto px-4 md:gap-8"
    >
      <CleverLink
        v-for="post in posts"
        :key="post.sys.id"
        class="group grid grid-cols-1 content-start gap-2 no-underline"
        :to="`/blog/${post.fields.slug}/`"
      >
        <div v-if="post.fields.mainImage">
          <img
            :src="post.fields.mainImage.fields.file.url"
            class="opacity-80 group-hover:opacity-100 transition-opacity duration-300 object-cover rounded-lg h-auto w-full max-h-40"
          />
        </div>
        <div
          v-else
          :class="
            ('opacity-80 group-hover:opacity-100 transition-opacity duration-300 object-cover rounded-lg h-40 w-full max-h-40 bg-contain bg-vsp-500 bg-no-repeat bg-center',
            $style.imagePlaceholder)
          "
        />
        <h3 class="text-xl font-headline font-bold group-hover:text-vsp-500">
          {{ post.fields.title }}
        </h3>
        <p :class="$style.description">{{ post.fields.description }}</p>
        <span class="block underline">Weiterlesen…</span>
      </CleverLink>
    </div>
  </div>
</template>

<script>
import getSiteMeta from '~/utils/getSiteMeta'

export default {
  name: 'BlogPostIndex',
  transition: 'page',

  async asyncData({ app, $contentful, params }) {
    const { items } = await $contentful.getEntries({
      content_type: 'blogpost',
      locale: app.i18n.locale,
      include: 5,
    })
    return {
      posts: items,
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
.imagePlaceholder {
  background-image: url(@/assets/img/logo.png);
}
</style>
