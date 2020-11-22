<template>
  <a
    :href="url"
    class="supporter"
    target="_blank"
    rel="noreferrer noopener"
    loading="lazy"
  >
    <div>
      <picture>
        <source
          :srcset="`${image}?w=240&h=240&fit=fill&fm=webp`"
          type="image/webp"
        />
        <source
          :srcset="`${image}?w=240&h=240&fit=fill&fm=jpeg`"
          type="image/webp"
        />
        <img
          :src="`${image}?w=240&h=240&fit=fill`"
          :alt="title"
          loading="lazy"
        />
      </picture>
      <h3 v-if="title">{{ title }}</h3>
    </div>
  </a>
</template>

<script>
export default {
  name: 'SupporterTile',

  props: {
    url: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>
.supporter {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 300ms ease-in;
  text-decoration: none;
  content-visibility: auto;
  contain-intrinsic-size: 350px;
}

.supporter:hover,
.supporter:focus,
.supporter:active {
  opacity: 0.8;
}
.supporter div {
  text-align: center;
}

.supporter h3 {
  margin: 0;
}

.supporter img {
  object-fit: cover;
  max-width: 300px;
  max-height: 300px;
  width: 80%;
  margin: auto;
}
</style>
