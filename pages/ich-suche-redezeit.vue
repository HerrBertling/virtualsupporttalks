<template>
  <div>
    <ContentBlocks :blocks="content" />
    <div v-if="tags" :class="$style.coachSearch">
      <h5>Coach-Liste filtern</h5>
      <button
        v-for="tag in tags"
        :key="tag"
        :class="[$style.tag, tag === currentTag && $style.selected]"
        @click="toggleCurrentTag(tag)"
      >
        {{ tag }}
      </button>
    </div>
    <section :class="$style.coachesList">
      <CoachCard
        v-for="(coach, index) in filteredList"
        :key="index"
        :coach="coach"
      >
        <nuxt-content :document="coach" />
      </CoachCard>
    </section>
  </div>
</template>
<script>
export default {
  meta: {
    inMainNav: true,
    title: "Ich suche Redezeit",
  },

  async asyncData({ $content }) {
    const content = await $content("need-support").sortBy("order").fetch();
    const initialCoaches = await $content("coaches").sortBy("name").fetch();
    const coaches = Object.freeze(initialCoaches);
    return { content, coaches };
  },

  data() {
    return {
      currentTag: null,
    };
  },

  computed: {
    filteredList() {
      if (this.currentTag === null) {
        return this.coaches;
      }
      return this.coaches.filter(
        (coach) => coach.tags && coach.tags.includes(this.currentTag)
      );
    },
    tags() {
      let internalTags = [];
      this.coaches.forEach((coach) => {
        if (coach.tags) {
          const coachTags = coach.tags.split(", ");
          internalTags = [...internalTags, ...coachTags];
        }
      });
      return [...new Set(internalTags)];
    },
  },

  methods: {
    toggleCurrentTag(tag) {
      const tagIsActive = this.currentTag === tag;
      this.currentTag = tagIsActive ? null : tag;
    },
  },

  head() {
    return {
      title: "Ich suche Redezeit",
    };
  },
};
</script>

<style module>
.coachSearch {
  padding: 2rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
}

.coachesList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
