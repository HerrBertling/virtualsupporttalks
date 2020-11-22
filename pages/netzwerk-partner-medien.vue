<template>
  <div :class="$style.wrapper">
    <section v-if="network.length > 0" :class="$style.tileSection">
      <h2>Unser Netzwerk</h2>
      <div :class="$style.tiles">
        <SupporterTile
          v-for="entry in network"
          :key="entry.fields.url"
          :url="entry.fields.url"
          :image="entry.fields.image.fields.file.url"
        />
      </div>
    </section>
    <section v-if="supporter.length > 0" :class="$style.tileSection">
      <h2>Unsere Unternehmenspartner</h2>
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
    <section v-if="media.length > 0" :class="$style.tileSection">
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
import pageIds from '~/utils/pageIds'
export default {
  name: 'SupportMedia',

  meta: {
    inMainNav: true,
    title: 'Netzwerk, Partner + Medien',
  },

  async asyncData({ $contentful }) {
    const { fields } = await $contentful.getEntry(pageIds.NETWORK)
    const media = await $contentful.getEntries({
      content_type: 'media',
      order: 'fields.title',
    })
    const supporter = await $contentful.getEntries({
      content_type: 'supporter',
      order: 'fields.title',
    })
    const network = await $contentful.getEntries({
      content_type: 'network',
      order: 'fields.title',
    })
    return {
      title: fields.title,
      content: fields.content,
      media: media.items,
      supporter: supporter.items,
      network: network.items,
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
