<template>
  <div>
    <ContentBlocks :blocks="homeContent" />
    <section :class="$style.contributorList">
      <ContributorCard
        v-for="{ firstName, lastName, permalink, image } in contributors"
        :key="`${lastName}_${firstName}`"
        :first-name="firstName"
        :last-name="lastName"
        :permalink="permalink"
        :image="image"
      />
    </section>
  </div>
</template>
<script>
export default {
  async asyncData({ $content }) {
    const homeContent = await $content("home").sortBy("order").fetch();
    const contributors = await $content("contributors").fetch();
    return { homeContent, contributors };
  },
  head() {
    return {
      script: [
        {
          src: "https://identity.netlify.com/v1/netlify-identity-widget.js",
          defer: true,
        },
      ],
    };
  },
};
</script>

<style module>
.contributorList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 3rem;
  padding: 3rem 1rem;
  width: 100%;
  max-width: 1280px;
  align-items: center;
  margin: 0 auto;
}
</style>
