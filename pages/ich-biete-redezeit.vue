<template>
  <div>
    <ContentBlocks :blocks="content" />
  </div>
</template>
<script>
export default {
  meta: {
    inMainNav: true,
    title: 'Ich biete Redezeit',
  },

  async asyncData({ $content }) {
    const content = await $content('give-support')
      .sortBy('order')
      .fetch()
    return { content }
  },

  head() {
    return {
      title: 'Ich biete Redezeit',
    }
  },
}
</script>
