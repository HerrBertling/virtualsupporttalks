<template>
  <div>
    <header :class="$style.header">
      <h2>
        {{ $t('blog.overview.title') }}
      </h2>
    </header>
    <div :class="$style.grid">
      <CleverLink
        v-for="post in posts"
        :key="post.sys.id"
        :class="$style.blogpost"
        :to="`/blog/${post.fields.slug}/`"
      >
        <div v-if="post.fields.mainImage">
          <img
            :src="post.fields.mainImage.fields.file.url"
            :class="$style.image"
          />
        </div>
        <div v-else :class="$style.imagePlaceholder" />
        <h3 :class="$style.title">{{ post.fields.title }}</h3>
        <p :class="$style.description">{{ post.fields.description }}</p>
        <span>Weiterlesen…</span>
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
.header {
  padding: 6rem 1rem 0;
  width: 100%;
  max-width: var(--widthContentMax);
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 4rem;
  margin: 1rem auto;
  padding: 0 1rem;
  max-width: var(--widthContentMax);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
  }
}

.blogpost {
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  grid-gap: 0.5rem;
  text-decoration: none !important;
}

.blogpost:hover * {
  opacity: 1;
}

.image,
.imagePlaceholder {
  display: block;
  width: 100%;
  height: auto;
  max-height: 10rem;
  object-fit: cover;
  border-radius: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
}

.imagePlaceholder {
  height: 10rem;
  background: var(--colorPrimary) url(@/assets/img/logo.png) no-repeat center;
  background-size: contain;
}
.title {
  margin: 0;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
}

.description {
  margin: 0;
}

.blogpost span {
  display: block;
  text-decoration: underline;
}
</style>
