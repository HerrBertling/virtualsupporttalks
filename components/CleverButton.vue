<template>
  <clever-link
    :to="to"
    :class="[
      'inline-flex justify-center text-white items-center font-inherit rounded-md py-4 px-8 no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg',
      isPrimary && 'bg-vsp-500',
      isSecondary && 'bg-gray-400',
    ]"
  >
    <slot />
  </clever-link>
</template>

<script>
export default {
  name: 'CleverButton',

  props: {
    to: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    isPrimary() {
      return this.variant === 'primary'
    },
    isSecondary() {
      return this.variant === 'secondary'
    },
  },
}
</script>
