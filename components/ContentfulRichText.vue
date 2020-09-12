<template>
  <div class="richtext">
    <RichTextRenderer :document="content" />
  </div>
</template>

<script>
import RichTextRenderer from 'contentful-rich-text-vue-renderer'

export default {
  name: 'ContentfulRichText',
  components: {
    RichTextRenderer,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.richtext >>> li > p {
  margin: 0;
}
</style>
