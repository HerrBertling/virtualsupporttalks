<template>
  <div>
    <ContentBlocks :blocks="content" />
    <section
      v-if="loading"
      class="grid place-items-center px-4 py-12 min-h-[20vh] max-w-7xl mx-auto"
    >
      <h3>{{ $t('coach.loading') }}</h3>
      <LoadingSpinner />
    </section>
    <div v-else>
      <details v-if="hasLanguages" class="py-8 px-4 max-w-7xl mx-auto">
        <summary class="mb-4">
          <h5 class="inline-block text-xl">{{ $t('coach.langFilter') }}</h5>
        </summary>
        <button
          v-for="lang in availableLanguages"
          :key="lang"
          :class="[
            'inline-block border rounded-md py-1 px-2 w-auto mr-2 mb-2 transition-colors hover:bg-gray-100',
            lang === currentLanguage &&
              'bg-gray-400 text-white hover:bg-gray-300',
          ]"
          @click="toggleCurrentLang(lang)"
        >
          {{ $t(`languages.${lang}`) }}
        </button>
      </details>
      <details v-if="hasTags" class="pt-0 pb-8 px-4 max-w-7xl mx-auto">
        <summary class="mb-4">
          <h5 class="inline-block text-xl">
            {{ $t('coach.filter') }} ({{ coachesCount }}
            {{ $t('coach.count') }})
          </h5>
        </summary>
        <button
          v-for="tag in tags"
          :key="tag.sys.id"
          :class="[
            'inline-block border rounded-md py-1 px-2 w-auto mr-2 mb-2 hover:bg-gray-100',
            tagIsActive(tag.sys.id) &&
              'bg-gray-400 text-white hover:bg-gray-300',
          ]"
          @click="toggleTag(tag.sys.id, tag.fields.tag)"
        >
          {{ tag.fields.tag }}
        </button>
      </details>
      <div v-if="coachesCount > 0" class="bg-gray-100">
        <section
          class="grid grid-cols-coachgrid items-start gap-x-6 gap-y-12 py-12 px-4 max-w-7xl mx-auto"
        >
          <CoachCard
            v-for="(coach, index) in coaches"
            v-show="shouldShowCoach(coach.fields.tag)"
            :key="index"
            :name="coach.fields.name"
            :url="coach.fields.url"
            :email="coach.fields.email"
            :image="coach.fields.image.fields.file.url"
          >
            <ContentfulRichText
              :content="coach.fields.description"
              :with-prose="false"
            />
          </CoachCard>
        </section>
      </div>
      <section
        v-else
        class="grid grid-cols-coachgrid gap-x-6 gap-y-12 py-12 px-4 max-w-7xl mx-auto"
      >
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
