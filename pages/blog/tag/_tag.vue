<template>
  <div class="container mx-auto max-w-6xl">
    <header class="pt-24 px-4 w-full">
      <h2 class="text-3xl font-bold font-headline">
        {{ $t('blog.overview.title') }} {{ $t('blog.tag.title') }} {{ tag }}
      </h2>
    </header>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 my-4 mx-auto px-4 md:gap-8"
    >
      <div
        v-for="post in posts"
        :key="post.sys.id"
        class="group grid grid-cols-1 content-start gap-2 no-underline"
      >
        <CleverLink
          v-if="post.fields.mainImage"
          :to="`/blog/${post.fields.slug}/`"
        >
          <img
            :src="post.fields.mainImage.fields.file.url"
            class="opacity-80 group-hover:opacity-100 transition-opacity duration-300 object-cover rounded-lg h-auto w-full max-h-40"
          />
        </CleverLink>
        <CleverLink
          v-else
          :to="`/blog/${post.fields.slug}/`"
          :class="
            ('opacity-80 group-hover:opacity-100 transition-opacity duration-300 object-cover rounded-lg h-40 w-full max-h-40 bg-contain bg-vsp-500 bg-no-repeat bg-center',
            $style.imagePlaceholder)
          "
        />
        <CleverLink :to="`/blog/${post.fields.slug}/`">
          <h3 class="text-xl font-headline font-bold group-hover:text-vsp-500">
            {{ post.fields.title }}
          </h3>
        </CleverLink>
        <aside
          :class="[
            'flex gap-4 items-center',
            Boolean(post.fields.tags) ? 'justify-between' : 'justify-end',
          ]"
        >
          <TagGroup v-if="Boolean(post.fields.tags)" :tags="post.fields.tags" />
          <time
            :datetime="post.sys.createdAt"
            class="text-gray-400 italic text-xs"
          >
            {{ getDateString(post.sys.createdAt) }}
          </time>
        </aside>
        <p :class="$style.description">{{ post.fields.description }}</p>
        <CleverLink :to="`/blog/${post.fields.slug}/`" class="block underline">
          Weiterlesen…
        </CleverLink>
      </div>
    </div>
  </div>
</template>

<script>
import getSiteMeta from '~/utils/getSiteMeta'
import TagGroup from '~/components/TagGroup.vue'
import unslugify from '~/utils/unslugify'
import CleverLink from '~/components/CleverLink.vue'
export default {
  name: 'BlogPostTagIndex',
  components: { TagGroup, CleverLink },
  transition: 'page',
  async asyncData({ app, $contentful, params }) {
    const tag = params.tag
    const { items } = await $contentful.getEntries({
      content_type: 'blogpost',
      'fields.tags[in]': unslugify(tag),
      locale: app.i18n.locale,
      order: '-sys.createdAt',
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
  computed: {
    tag() {
      return unslugify(this.$route.params.tag)
    },
  },
  methods: {
    getDateString(date) {
      const dateObj = new Date(date)
      return dateObj.toLocaleString(this.$i18n.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    },
  },
}
</script>

<style module>
.imagePlaceholder {
  background-image: url(@/assets/img/logo.png);
}
</style>
