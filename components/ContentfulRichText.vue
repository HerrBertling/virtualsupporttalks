<template>
  <div :class="['richtext', withProse && 'prose lg:prose-lg max-w-none']">
    <RichTextRenderer
      v-if="!!content"
      :document="content"
      :node-renderers="renderNodes"
    />
  </div>
</template>

<script>
import { INLINES } from '@contentful/rich-text-types'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import CleverLink from '~/components/CleverLink.vue'

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
    withProse: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    renderNodes() {
      return {
        [INLINES.HYPERLINK]: (node, key, h, next) => {
          return h(
            CleverLink,
            {
              key,
              props: {
                to: node.data.uri,
              },
            },
            next(node.content, key, h, next)
          )
        },
      }
    },
  },
}
</script>

<style scoped>
.richtext >>> li > p {
  margin: 0;
}
</style>
