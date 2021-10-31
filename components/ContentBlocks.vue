<template>
  <div>
    <template v-for="(block, index) in blocks">
      <HeaderBlock
        v-if="block.sys.contentType.sys.id === 'headerBlock'"
        :key="block.sys.id"
        v-bind="block.fields"
      />
      <ContentCentered
        v-else-if="block.sys.contentType.sys.id === 'centeredContent'"
        :key="block.sys.id"
        :backgroundcolor="block.fields.backgroundcolor"
        :textcolor="block.fields.textcolor"
        :button-url="block.fields.buttonUrl"
        :button-text="block.fields.buttonText"
      >
        <ContentfulRichText :content="block.fields.content" />
      </ContentCentered>
      <ContentImageBg
        v-else-if="block.sys.contentType.sys.id === 'contentImageBg'"
        :key="block.sys.id"
        :with-padding-top="index === 0"
        v-bind="block.fields"
      >
        <ContentfulRichText :content="block.fields.content" />
      </ContentImageBg>
      <ContentWithFullSizeImage
        v-else-if="block.sys.contentType.sys.id === 'contentWithFullSizeImage'"
        :key="block.sys.id"
        :background-color="block.fields.backgroundcolor"
        :image="block.fields.image.fields.file.url"
        :image-right="block.fields.imageRight"
      >
        <ContentfulRichText :content="block.fields.content" />
      </ContentWithFullSizeImage>
      <TwoImages
        v-else-if="block.sys.contentType.sys.id === 'twoImages'"
        :key="block.sys.id"
        :image1="block.fields.image1.fields.file.url"
        :image2="block.fields.image2.fields.file.url"
        :text1="block.fields.text1"
        :text2="block.fields.text2"
        :link1="block.fields.link1"
        :link2="block.fields.link2"
      />
      <ContentBlockImageCollection
        v-else-if="block.sys.contentType.sys.id === 'imageCollection'"
        :key="block.sys.id"
        :images="block.fields.images"
        :with-padding-top="index === 0"
      />
      <GenericContent v-else :key="block.sys.id" :block="block" />
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
