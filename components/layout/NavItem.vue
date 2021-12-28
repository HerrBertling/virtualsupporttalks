<template>
  <li class="w-full block lg:w-auto lg:mr-1" @click="$emit('click')">
    <nuxt-link
      class="block p-4 rounded-md no-underline lg:inline-block lg:py-1 lg:px-2"
      active-class="bg-white"
      :to="to"
    >
      <slot />
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
}
</script>
