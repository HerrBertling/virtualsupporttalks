<template>
  <div>
    <ContentBlocks :blocks="content" />
  </div>
</template>
<script>
export default {
  meta() {
    return {
      inMainNav: true,
      title: this.title,
    }
  },

  async asyncData({ $contentful }) {
    const { fields } = await $contentful.getEntry('2WBTRHlycqG57zkTI0G5K3')
    // const { items } = await $contentful.getEntries({
    //   content_type: 'contributor',
    // })
    return { title: fields.title, content: fields.content }
  },

  head() {
    return {
      title: this.title,
    }
  },
}
</script>
