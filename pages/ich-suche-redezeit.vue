<template>
  <div>
    <ContentBlocks :blocks="content" />
    <section v-if="loading" :class="$style.loading">
      <h3>{{ $t('coach.loading') }}</h3>
      <LoadingSpinner />
    </section>
    <div v-else>
      <details v-if="hasLanguages" :class="$style.filterWrapper">
        <summary :class="$style.summary">
          <h5 :class="$style.tagToggle">{{ $t('coach.langFilter') }}</h5>
        </summary>
        <button
          v-for="lang in availableLanguages"
          :key="lang"
          :class="[$style.tag, lang === currentLanguage && $style.selected]"
          @click="toggleCurrentLang(lang)"
        >
          {{ $t(`languages.${lang}`) }}
        </button>
      </details>
      <details v-if="hasTags" :class="$style.filterWrapper">
        <summary :class="$style.summary">
          <h5 :class="$style.tagToggle">
            {{ $t('coach.filter') }} ({{ coachesCount }}
            {{ $t('coach.count') }})
          </h5>
        </summary>
        <button
          v-for="tag in tags"
          :key="tag.sys.id"
          :class="[$style.tag, tagIsActive(tag.sys.id) && $style.selected]"
          @click="toggleTag(tag.sys.id, tag.fields.tag)"
        >
          {{ tag.fields.tag }}
        </button>
      </details>
      <section v-if="coachesCount > 0" :class="$style.coachesList">
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
      <section v-else :class="$style.coachesList">
        <h3>Keine Coaches zu diesen Filtern gefunden :(</h3>
      </section>
    </div>
  </div>
</template>
<script>
import pageIds from '~/utils/pageIds'
import getSiteMeta from '~/utils/getSiteMeta'

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
    const [page, tags] = await Promise.all([
      $contentful.getEntry(pageIds.SEARCH_HELP, { locale: app.i18n.locale }),
      $contentful.getEntries({
        content_type: 'coachtag',
        order: 'fields.tag',
        locale: app.i18n.locale,
      }),
    ])

    return {
      title: page.fields.title,
      content: page.fields.content,
      tags: tags.items,
      seo: page.fields.seo?.fields,
    }
  },

  data() {
    return {
      currentTags: [],
      currentLanguage: this.$i18n.locale,
      loading: true,
      coaches: [],
      availableLanguages: [],
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
    hasTags() {
      return !!this.tags && this.tags.length > 0
    },

    hasLanguages() {
      return this.availableLanguages.length > 0
    },

    hasCurrentTags() {
      return this.currentTags.length > 0
    },

    coachesCount() {
      if (!this.coaches) {
        return 0
      }
      if (!this.hasCurrentTags) {
        return this.coaches.length
      }
      return this.currentCoaches.length
    },

    currentCoaches() {
      return this.coaches.filter((coach) => {
        return !!coach.fields.tag && this.matchesTags(coach.fields.tag)
      })
    },

    hasCoaches() {
      return this.coachesCount > 0
    },
  },

  watch: {
    currentLanguage(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.resetTags()
        this.getCoaches(newVal)
      }
    },
    coaches(newVal) {
      if (!!newVal && newVal.length < 2) {
        this.resetTags()
      }
    },
  },

  mounted() {
    this.getCoaches(this.currentLanguage)
  },

  methods: {
    resetTags() {
      this.currentTags = []
    },

    matchesTags(coachTags) {
      return this.currentTags.every((currentTag) =>
        coachTags.some((coachTag) => coachTag.sys.id === currentTag)
      )
    },

    tagIsActive(tag) {
      return this.currentTags.includes(tag)
    },

    toggleTag(tag, tagName) {
      const isActive = this.tagIsActive(tag)
      this.$ga.event({
        eventCategory: 'coachTag',
        eventAction: isActive ? 'unselect' : 'select',
        eventLabel: tagName,
      })
      this.currentTags = isActive
        ? this.currentTags.filter((tagsEntry) => tagsEntry !== tag)
        : [...this.currentTags, tag]
    },

    toggleCurrentLang(newLang) {
      this.$ga.event({
        eventCategory: 'coachLanguage',
        eventAction: 'select',
        eventLabel: newLang,
      })
      this.currentLanguage = newLang
    },

    shouldShowCoach(tags) {
      if (!this.hasCurrentTags) {
        return true
      }
      if (this.hasCurrentTags && !tags) {
        return false
      }
      return this.matchesTags(tags)
    },

    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)) // random index from 0 to i

        ;[array[i], array[j]] = [array[j], array[i]]
      }
      return array
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

      this.coaches = this.shuffle(coachesResponse.items)
      const langs = []
      if (this.coaches.length > 0) {
        this.coaches.forEach((coach) => {
          if (coach.fields.languages) {
            langs.push(...coach.fields.languages)
          }
        })
      }
      const allLangs = [...this.availableLanguages, ...langs].map((lang) =>
        lang.toLowerCase()
      )
      this.availableLanguages = [...new Set(allLangs)]
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
