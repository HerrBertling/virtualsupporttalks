<template>
  <div>
    <ContentBlocks :blocks="content" />
    <div :class="$style.coachSearch">
      <label>
        <strong>Coach-Liste durchsuchen</strong>
        <input v-model.lazy="searchInput" type="search" />
      </label>
    </div>
    <section v-if="searchInput" :class="$style.coachesList">
      <CoachCard
        v-for="(coach, index) in coachList"
        :key="index"
        :coach="coach"
      >
        <nuxt-content :document="coach" />
      </CoachCard>
    </section>
    <section v-else :class="$style.coachesList">
      <CoachCard v-for="(coach, index) in coaches" :key="index" :coach="coach">
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

  async fetch() {
    this.coachList = await this.$content("coaches")
      .search(this.searchInput)
      .fetch();
  },

  async asyncData({ $content }) {
    const content = await $content("need-support").sortBy("order").fetch();
    const coaches = await $content("coaches").sortBy("name").fetch();
    return { content, coaches };
  },

  data() {
    return {
      searchInput: "",
      coachList: [],
    };
  },

  watch: {
    searchInput() {
      this.$fetch();
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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 1.5rem;
  padding: 3rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
