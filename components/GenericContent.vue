<template>
  <section :class="$style.cb_genericContent">
    <ContentfulRichText
      v-if="block.fields.content"
      :content="block.fields.content"
    />
  </section>
</template>
<script>
export default {
  name: 'GenericContent',
  props: {
    block: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
<style module>
.cb_genericContent {
  margin: 0 auto;
  padding: 6rem 1rem 3rem;
  min-height: 75vh;
  width: 100vw;
  max-width: var(--widthContentMax);
}
</style>
