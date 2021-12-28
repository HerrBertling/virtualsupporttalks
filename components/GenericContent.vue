<template>
  <section class="mx-auto pt-24 px-4 pb-12 min-h-[50vh] w-screen max-w-3xl">
    <ContentfulRichText :content="block.fields.content" />
  </section>
</template>
<script>
export default {
  name: 'GenericContent',
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
}
</script>
