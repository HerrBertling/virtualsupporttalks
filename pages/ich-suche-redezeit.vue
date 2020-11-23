<template>
  <div>
    <ContentBlocks :blocks="content" />
    <details v-if="hasTags" :class="$style.coachSearch">
      <summary :class="$style.summary">
        <h5 :class="$style.tagToggle">Coach-Liste filtern</h5>
      </summary>
      <button
        v-for="tag in tags"
        :key="tag"
        :class="[$style.tag, tag.sys.id === currentTag && $style.selected]"
        @click="toggleCurrentTag(tag.sys.id)"
      >
        {{ tag.fields.tag }}
      </button>
    </details>
    <section :class="$style.coachesList">
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
  </div>
</template>
<script>
import pageIds from '~/utils/pageIds'

export default {
  meta: {
    inMainNav: true,
    title: 'Ich suche Redezeit',
  },

  async asyncData({ $contentful }) {
    const [page, coaches, tags] = await Promise.all([
      $contentful.getEntry(pageIds.SEARCH_HELP),
      $contentful.getEntries({
        limit: 500,
        content_type: 'coach',
        order: 'fields.name',
      }),
      $contentful.getEntries({
        content_type: 'coachtag',
        order: 'fields.tag',
      }),
    ])
    return {
      title: page.fields.title,
      content: page.fields.content,
      coaches: coaches.items,
      tags: tags.items,
    }
  },

  data() {
    return {
      currentTag: null,
    }
  },

  head() {
    return {
      title: 'Ich suche Redezeit',
    }
  },

  computed: {
    hasTags() {
      return this.tags.length > 0
    },
  },

  methods: {
    toggleCurrentTag(tagId) {
      const tagIsActive = this.currentTag === tagId
      this.currentTag = tagIsActive ? null : tagId
    },

    shouldShowCoach(tags) {
      if (!this.currentTag) {
        return true
      }
      if (this.currentTag && !tags) {
        return false
      }
      return tags.some((tag) => tag.sys.id === this.currentTag)
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
  background-color: lightgrey;
  color: white;
}
</style>
