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
        :with-padding-top="index === 0"
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
      <TwoImages
        v-else-if="block.type === 'TwoImages'"
        :key="index"
        :image1="block.image1"
        :image2="block.image2"
        :text1="block.text1"
        :text2="block.text2"
        :link1="block.link1"
        :link2="block.link2"
      />
      <GenericContent v-else :key="index" v-bind="block">
        <nuxt-content :document="block" />
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
};
</script>
