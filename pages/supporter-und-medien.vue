<template>
  <div class="wrapper">
    <section class="tileSection">
      <h3>Unsere Supporter</h3>
      <div class="tiles">
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
    <section class="tileSection">
      <h3>Redezeit in den Medien</h3>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SupportMedia',

  meta: {
    inMainNav: true,
    title: 'Supporter und Medien',
  },

  async asyncData({ $content }) {
    const supporter = await $content('supporter').fetch()
    const content = await $content('supporter-content').fetch()
    return { supporter, content }
  },
}
</script>

<style scoped>
.wrapper {
  padding-top: 6rem;
}

.tileSection {
  max-width: 1280px;
  padding: 3rem;
  margin: 0 auto;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1rem;
}
</style>
