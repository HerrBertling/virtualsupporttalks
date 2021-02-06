<template>
  <div>
    <ContentBlocks :blocks="content" />
    <details v-if="hasLanguages && hasCoaches" :class="$style.filterWrapper">
      <summary :class="$style.summary">
        <h5 :class="$style.tagToggle">{{ $t('coach.langFilter') }}</h5>
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
    <details
      v-if="hasTags && hasCoaches && coaches.length > 1"
      :class="$style.filterWrapper"
    >
      <summary :class="$style.summary">
        <h5 :class="$style.tagToggle">
          {{ $t('coach.filter') }} ({{ coachesCount }} {{ $t('coach.count') }})
        </h5>
      </summary>
      <button
        v-for="tag in tags"
        :key="tag.sys.id"
        :class="[$style.tag, tag.sys.id === currentTag && $style.selected]"
        @click="toggleCurrentTag(tag.sys.id)"
      >
        {{ tag.fields.tag }}
      </button>
    </details>
    <section v-if="!loading" :class="$style.coachesList">
      <CoachCard
        v-for="(coach, index) in coaches"
        v-show="shouldShowCoach(coach.fields.tag)"
        :key="index"
        :name="coach.fields.name"
        :url="coach.fields.url"
        :email="coach.fields.email"
        :image="coach.fields.image.fields.file.url"
      >
        <ContentfulRichText :content="coach.fields.description" />
      </CoachCard>
    </section>
    <section v-else :class="$style.loading">
      <LoadingSpinner />
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
      currentLanguage: 'de',
      loading: false,
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
      if (!this.currentTag) {
        return this.coaches.length
      }
      return this.coaches.filter((coach) => {
        return !!coach.fields.tag && this.hasCurrentTag(coach.fields.tag)
      }).length
    },

    hasCoaches() {
      return this.coachesCount > 0
    },
  },

  watch: {
    currentLanguage(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getCoaches(newVal)
      }
    },
    coaches(newVal, oldVal) {
      if (newVal.length < 2) {
        this.currentTag = null
      }
    },
  },

  mounted() {
    if (this.$i18n.locale !== 'de') {
      this.currentLanguage = this.$i18n.locale
    }
  },

  methods: {
    hasCurrentTag(tags) {
      return tags.some((tag) => tag.sys.id === this.currentTag)
    },

    toggleCurrentTag(tag) {
      const tagIsActive = this.currentTag === tag
      this.currentTag = tagIsActive ? null : tag
    },

    toggleCurrentLang(newLang) {
      this.currentLanguage = newLang
    },

    shouldShowCoach(tags) {
      if (!this.currentTag) {
        return true
      }
      if (this.currentTag && !tags) {
        return false
      }
      return this.hasCurrentTag(tags)
    },

    async getCoaches(lang = null) {
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
      this.loading = true
      const coachesResponse = await this.$contentful.getEntries({
        ...baseOptions,
      })

      this.coaches = coachesResponse.items
      this.loading = false
    },
  },
}
</script>

<style module>
.filterWrapper {
  padding: 2rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
}

.filterWrapper + .filterWrapper {
  padding-top: 0;
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

.loading {
  display: grid;
  place-items: center;
  padding: 3rem 1rem;
  min-height: 20vh;
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
