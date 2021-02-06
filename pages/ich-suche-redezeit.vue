<template>
  <div>
    <ContentBlocks :blocks="content" />
    <details v-if="hasTags && hasCoaches" :class="$style.coachSearch">
      <summary :class="$style.summary">
        <h5 :class="$style.tagToggle">
          {{ $t('coach.filter') }} ({{ coachesCount }} {{ $t('coach.count') }})
        </h5>
      </summary>
      <button
        v-for="tag in tags"
        :key="tag.sys.id"
        :class="[$style.tag, tag.fields.tag === currentTag && $style.selected]"
        @click="toggleCurrentTag(tag.fields.tag)"
      >
        {{ tag.fields.tag }}
      </button>
    </details>
    <details v-if="hasLanguages && hasCoaches" :class="$style.coachSearch">
      <summary :class="$style.summary">
        <h5 :class="$style.tagToggle">Sprachfilter</h5>
      </summary>
      <button
        v-for="lang in languages"
        :key="lang"
        :class="[$style.tag, lang === currentLanguage && $style.selected]"
        @click="toggleCurrentLang(lang)"
      >
        {{ $t(`languages.${lang}`) }}
      </button>
    </details>
    <section :class="$style.coachesList">
      <CoachCard
        v-for="(coach, index) in coaches"
        :key="index"
        :name="coach.fields.name"
        :url="coach.fields.url"
        :email="coach.fields.email"
        :image="coach.fields.image.fields.file.url"
      >
        <ContentfulRichText :content="coach.fields.description" />
      </CoachCard>
    </section>
  </div>
</template>
<script>
import pageIds from '~/utils/pageIds'

export default {
  name: 'SucheRedezeit',
  transition: 'page',

  meta: {
    inMainNav: true,
    title: 'Ich suche Redezeit',
  },

  nuxtI18n: {
    paths: {
      de: '/ich-suche-redezeit',
      en: '/i-need-speaking-time',
    },
  },

  async asyncData({ app, $contentful }) {
    const [page, coaches, tags] = await Promise.all([
      $contentful.getEntry(pageIds.SEARCH_HELP, { locale: app.i18n.locale }),
      $contentful.getEntries({
        limit: 500,
        content_type: 'coach',
        order: 'fields.name',
        locale: app.i18n.locale,
      }),
      $contentful.getEntries({
        content_type: 'coachtag',
        order: 'fields.tag',
        locale: app.i18n.locale,
      }),
    ])

    const availableLanuages = []
    coaches.items.forEach((coach) => {
      if (coach.fields.languages) {
        availableLanuages.push(...coach.fields.languages)
      }
    })
    const cleanedUpLangs = new Set(availableLanuages)
    return {
      title: page.fields.title,
      content: page.fields.content,
      coaches: coaches.items,
      tags: tags.items,
      seo: page.fields.seo?.fields,
      languages: [...cleanedUpLangs],
    }
  },

  data() {
    return {
      currentTag: null,
      currentLanguage: this.$i18n.locale,
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

  computed: {
    hasTags() {
      return !!this.tags && this.tags.length > 0
    },

    hasLanguages() {
      return !!this.languages && this.languages.length > 0
    },

    coachesCount() {
      if (!this.coaches) {
        return 0
      }
      return this.coaches.length
    },

    hasCoaches() {
      return this.coachesCount > 0
    },
  },

  watch: {
    currentTag(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getCoaches(newVal, this.currentLanguage)
      }
    },
    currentLanguage(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getCoaches(this.currentTag, newVal)
      }
    },
  },

  methods: {
    toggleCurrentTag(tag) {
      const tagIsActive = this.currentTag === tag
      this.currentTag = tagIsActive ? null : tag
    },

    toggleCurrentLang(newLang) {
      this.currentLanguage = newLang
    },

    async getCoaches(tag = null, lang = null) {
      let baseOptions = {
        limit: 500,
        content_type: 'coach',
        order: 'fields.name',
        locale: this.$i18n.locale,
      }
      const useLanguageFilter = lang !== 'de'

      if (useLanguageFilter) {
        baseOptions = {
          ...baseOptions,
          'fields.languages[in]': lang,
        }
      }

      const coachesResponse = await this.$contentful.getEntries({
        ...baseOptions,
      })

      this.coaches = coachesResponse.items
    },
  },
}
</script>

<style module>
.coachSearch {
  padding: 2rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
}

.summary {
  margin-bottom: 1rem;
}

.tagToggle {
  display: inline-block;
  margin: 0;
  font-size: 1.25rem;
}

.coachesList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 1.5rem;
  padding: 3rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
}

.tag {
  display: inline-block;
  border: 1px solid;
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
  width: auto;
  margin: 0 0.5rem 0.5rem 0;
}

.selected {
  background-color: grey;
  color: white;
}
</style>
