<template>
  <div class="w-full block lg:w-auto lg:mr-1" @click="$emit('click')">
    <nuxt-link
      class="block p-4 no-underline lg:inline-block lg:py-1 lg:px-2 lg:rounded-md rounded-md hover:text-vsp-500"
      exact-active-class="bg-gray-100 lg:bg-white border-l-4 border-b-transparent border-l-vsp-500 lg:border-l-transparent lg:underline lg:decoration-vsp-500"
      :to="to"
    >
      <slot />
    </nuxt-link>
  </div>
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
