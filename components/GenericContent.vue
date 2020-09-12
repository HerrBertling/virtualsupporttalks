<template>
  <section :class="$style.cb_genericContent">
    <ContentfulRichText
      v-if="block.fields.content"
      :content="block.fields.content"
    />
    <slot v-else />
  </section>
</template>
<script>
export default {
  name: 'GenericContent',
}
</script>
<style module>
.cb_genericContent {
  max-width: 1280px;
  width: 100vw;
  margin: 0 auto;
  padding: 2rem 0;
}
</style>
