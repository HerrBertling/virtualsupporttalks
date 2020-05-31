<template>
  <div>
    <template v-for="(block, index) in blocks">
      <HeaderBlock
        v-if="block.type === 'HeaderBlock'"
        :key="index"
        :background-color="block.backgroundColor"
        :background-image="block.backgroundImage"
      />
      <ContentCentered
        v-else-if="block.type === 'ContentCentered'"
        :key="index"
        :background-color="block.backgroundColor"
        :text-color="block.textColor"
      >
        <nuxt-content :document="block" />
      </ContentCentered>
      <ContentImageBg
        v-else-if="block.type === 'ContentImageBg'"
        :key="index"
        :background-image="block.backgroundImage"
      >
        <nuxt-content :document="block" />
      </ContentImageBg>
      <ContentWithFullSizeImage
        v-else-if="block.type === 'ContentWithFullSizeImage'"
        :key="index"
        :background-color="block.backgroundColor"
        :image="block.image"
        :image-placement="block.imagePlacement || 'left'"
      >
        <nuxt-content :document="block" />
      </ContentWithFullSizeImage>
      <GenericContent v-else :key="index" v-bind="block">
        <pre>{{ block }}</pre>
      </GenericContent>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    blocks: {
      type: Array,
      required: true,
    },
  },
}
</script>
