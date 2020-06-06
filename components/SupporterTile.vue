<template>
  <a
    :href="url"
    class="supporter"
    target="_blank"
    rel="noreferrer noopener"
    loading="lazy"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: "SupporterTile",

  props: {
    url: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.supporter {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 300ms ease-in;
  text-decoration: none;
}

.supporter:hover,
.supporter:focus,
.supporter:active {
  opacity: 0.8;
}
.supporter >>> p {
  margin: 0;
  text-align: center;
}

.supporter >>> h3 {
  margin: 0;
  text-align: center;
}

.supporter >>> img {
  object-fit: cover;
  max-width: 300px;
  max-height: 300px;
  width: 80%;
  margin: auto;
}
</style>
