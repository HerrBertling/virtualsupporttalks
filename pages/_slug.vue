<template>
  <article :class="$style.basicContent">
    <ContentfulRichText :content="content" />
  </article>
</template>

<script>
export default {
  name: 'BasicContent',
  async asyncData({ $contentful, params }) {
    const { items } = await $contentful.getEntries({
      content_type: 'page',
      'fields.slug[in]': params.slug,
    })
    return {
      content: items[0].fields.content[0].fields.content,
    }
  },
  watch: {
    hasCookiesAccepted(newValue) {
      localStorage['cookie:accepted'] = newValue
    },
  },
  mounted() {
    if (localStorage['cookie:accepted']) {
      this.hasCookiesAccepted = localStorage['cookie:accepted']
    }
  },
}
</script>

<style module>
.basicContent {
  padding: 6rem 1rem 3rem;
  min-height: 75vh;
  max-width: var(--widthContentMax);
  margin: 0 auto;
}
</style>
