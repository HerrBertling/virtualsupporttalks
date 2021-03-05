<template>
  <div :class="$style.wrapper">
    <article :class="$style.contributorPage">
      <figure :class="$style.contImage" role="figure" :aria-label="name">
        <picture>
          <source
            :srcset="`${img}?w=600&fm=webp, ${img}?w=1200&fm=webp 2x`"
            type="image/webp"
          />
          <source
            :srcset="`${img}?w=600&fm=jpeg, ${img}?w=1200&fm=jpeg 2x`"
            type="image/jpeg"
          />
          <img :src="`${img}?w=600`" :alt="name" loading="lazy" />
        </picture>
        <figcaption>{{ name }}</figcaption>
      </figure>
      <div :class="$style.contContent">
        <h1>
          <a :href="website">{{ name }}</a>
        </h1>
        <ContentfulRichText :content="content" />
        <a :class="$style.button" :href="website">
          Zur Webseite von {{ firstName }}
        </a>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ContributorPage',
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

<style module>
.wrapper {
  background-color: rgb(192, 192, 192);
  padding: 6rem 1rem 2rem;
}

.contributorPage {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
  max-width: 1280px;
}

.contImage {
  margin: 0;
}

.contImage,
.contContent {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 0;
}

.contImage img {
  max-width: 100%;
  object-fit: cover;
}

.contContent > div {
  margin-bottom: 2rem;
}

@media (min-width: 1280px) {
  .wrapper {
    padding: 4rem 0;
  }
  .contributorPage {
    grid-template-columns: 1fr 1fr;
  }
  .contImage,
  .contContent {
    padding: 4rem;
  }
}

.button,
.button[href]:link,
.button[href]:visited {
  background: var(--colorTextDefault);
  color: var(--colorWhite);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  border-radius: 4px;
  padding: 1rem 2rem;
  text-decoration: none;
  transition: opacity 300ms ease-in;
}

.button[href]:hover,
.button[href]:focus,
.button[href]:active {
  opacity: 0.8;
}
</style>
