<template>
  <component :is="linkComponent" v-bind="linkAttrs">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'CleverLink',

  props: {
    to: {
      type: String,
      required: true,
    },
  },

  computed: {
    linkComponent() {
      if (this.isInternalLink) {
        return 'NuxtLink'
      }
      return 'a'
    },

    isInternalLink() {
      return (
        this.to.startsWith('https://www.virtualsupporttalks.de/') ||
        this.to.startsWith('/')
      )
    },

    linkAttrs() {
      let usedLink = this.to
      if (this.isInternalLink) {
        usedLink = this.to.replace('https://www.virtualsupporttalks.de', '')
        return {
          ...this.$attrs,
          to: this.localePath(usedLink),
        }
      }
      return {
        ...this.$attrs,
        href: usedLink,
        rel: 'noopener',
        target: '_blank',
      }
    },
  },
}
</script>
