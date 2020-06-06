<template>
  <div :class="$style.wrapper">
    <section :class="$style.tileSection">
      <h2>Unsere Supporter</h2>
      <div :class="$style.tiles">
        <SupporterTile
          v-for="tile in supporter"
          :key="tile.url"
          :url="tile.url"
        >
          <nuxt-content :document="tile" />
        </SupporterTile>
      </div>
    </section>
    <ContentBlocks :blocks="content" />
    <section :class="$style.tileSection">
      <h2>Redezeit in den Medien</h2>
      <div :class="$style.tiles">
        <SupporterTile
          v-for="medium in media"
          :key="medium.url"
          :url="medium.url"
        >
          <nuxt-content :document="medium" />
        </SupporterTile>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "SupportMedia",

  meta: {
    inMainNav: true,
    title: "Supporter und Medien",
  },

  async asyncData({ $content }) {
    const supporter = await $content("supporter").fetch();
    const content = await $content("supporter-content").fetch();
    const media = await $content("medien").fetch();
    return { supporter, content, media };
  },
};
</script>

<style module>
.wrapper {
  padding-top: 6rem;
}

.tileSection {
  max-width: 1280px;
  padding: 3rem 1rem;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .tileSection {
    padding: 3rem;
  }
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 1rem;
  grid-row-gap: 2rem;
}
</style>
