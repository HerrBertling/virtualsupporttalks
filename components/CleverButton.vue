<template>
  <clever-link :to="to" :class="[$style.button, $style[variant]]">
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
}
</script>

<style module>
.button,
.button[href]:link,
.button[href]:visited {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  border-radius: 4px;
  padding: 1rem 2rem;
  text-decoration: none;
  transition: opacity 300ms ease-in;
}

.button[href]:hover,
.button[href]:focus,
.button[href]:active {
  opacity: 0.8;
}

.primary,
.primary[href]:link,
.primary[href]:visited {
  background: var(--colorPrimary);
  color: var(--colorWhite);
}

.secondary,
.secondary[href]:link,
.secondary[href]:visited {
  background: var(--colorTextDefault);
  color: var(--colorWhite);
}
</style>
