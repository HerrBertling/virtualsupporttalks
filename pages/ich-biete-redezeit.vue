<template>
  <div>
    <ContentBlocks :blocks="content" />
  </div>
</template>
<script>
import pageIds from '~/utils/pageIds'

export default {
  name: 'IchBieteRedezeit',
  transition: 'page',

  meta() {
    return {
      inMainNav: true,
      title: this.title,
    }
  },

  async asyncData({ $contentful }) {
    const { fields } = await $contentful.getEntry(pageIds.GIVE_HELP)
    return { title: fields.title, content: fields.content }
  },

  head() {
    return {
      title: this.title,
    }
  },
}
</script>
