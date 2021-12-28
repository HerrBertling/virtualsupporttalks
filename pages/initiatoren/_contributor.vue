<template>
  <div class="bg-gray-200 pt-24 pb-8 px-4 xl:py-16 xl:px-0 min-h-[90vh]">
    <article class="grid grid-cols-1 xl:grid-cols-2 mx-auto max-w-7xl">
      <figure
        class="my-0 max-w-4xl mx-auto py-4 xl:py-16 xl:px-16"
        role="figure"
        :aria-label="name"
      >
        <picture>
          <source
            :srcset="`${img}?w=600&fm=webp, ${img}?w=1200&fm=webp 2x`"
            type="image/webp"
          />
          <source
            :srcset="`${img}?w=600&fm=jpeg, ${img}?w=1200&fm=jpeg 2x`"
            type="image/jpeg"
          />
          <img
            :src="`${img}?w=600`"
            :alt="name"
            class="max-w-full object-cover overflow-hidden rounded-md shadow-lg mb-8"
            loading="lazy"
          />
        </picture>
        <figcaption class="ml-4">{{ name }}</figcaption>
      </figure>
      <div class="max-w-4xl mx-auto py-4 xl:py-16 xl:px-16 prose prose-lg">
        <h1>
          <a class="font-bold no-underline" :href="website">{{ name }}</a>
        </h1>
        <ContentfulRichText :content="content" :with-prose="false" />
        <CleverButton :to="website" variant="secondary">
          Zur Webseite von {{ firstName }}
        </CleverButton>
      </div>
    </article>
  </div>
</template>

<script>
import CleverButton from '~/components/CleverButton.vue'
export default {
  name: 'ContributorPage',
  components: { CleverButton },
  transition: 'page',
  async asyncData({ app, $contentful, params }) {
    const { items } = await $contentful.getEntries({
      content_type: 'contributor',
      'fields.slug[in]': params.contributor,
      locale: app.i18n.locale,
    })
    const { content, firstname, lastname, url } = items[0].fields
    return {
      content,
      img: items[0].fields.image.fields.file.url,
      firstName: firstname,
      lastName: lastname,
      website: url,
    }
  },
  head() {
    return {
      title: `${this.firstName} ${this.lastName}`,
    }
  },
  computed: {
    name() {
      const { firstName, lastName } = this
      return `${firstName} ${lastName}`
    },
  },
}
</script>
