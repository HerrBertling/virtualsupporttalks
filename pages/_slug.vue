<template>
  <article :class="$style.basicContent">
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  name: "BasicContent",

  async asyncData({ $content, params }) {
    const doc = await $content(`pages/${params.slug}`).fetch();
    return { doc };
  },
};
</script>

<style module>
.basicContent {
  padding: 6rem 1rem 3rem;
  min-height: 75vh;
  max-width: var(--widthContentMax);
  margin: 0 auto;
}
</style>
