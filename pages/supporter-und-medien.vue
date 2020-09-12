<template>
  <div :class="$style.wrapper">
    <section :class="$style.tileSection">
      <h2>Unsere Supporter</h2>
      <div :class="$style.tiles">
        <SupporterTile
          v-for="entry in supporter"
          :key="entry.fields.url"
          :url="entry.fields.url"
          :image="entry.fields.image.fields.file.url"
        />
      </div>
    </section>
    <ContentBlocks :blocks="content" />
    <section :class="$style.tileSection">
      <h2>Redezeit in den Medien</h2>
      <div :class="$style.tiles">
        <SupporterTile
          v-for="medium in media"
          :key="medium.fields.url"
          :url="medium.fields.url"
          :title="medium.fields.title"
          :image="medium.fields.image.fields.file.url"
        />
      </div>
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

  async asyncData({ $contentful }) {
    const { fields } = await $contentful.getEntry('25tWaqDQRtqkh9Bh2idI2A')
    const media = await $contentful.getEntries({
      content_type: 'media',
      order: 'fields.title',
    })
    const supporter = await $contentful.getEntries({
      content_type: 'supporter',
      order: 'fields.title',
    })
    return {
      title: fields.title,
      content: fields.content,
      media: media.items,
      supporter: supporter.items,
    }
  },
}
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
