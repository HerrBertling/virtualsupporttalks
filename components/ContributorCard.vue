<template>
  <fade-in>
    <article :class="[$style.contWrapper, $style.plzAnimateMe]">
      <nuxt-link :to="permalink">
        <figure :class="$style.contImage" role="figure" :aria-label="name">
          <img :src="image" :alt="name" loading="lazy" />
          <figcaption>{{ name }}</figcaption>
        </figure>
      </nuxt-link>
      <div>
        <h3>{{ name }}</h3>
        <nuxt-link :class="$style.button" :to="permalink">
          Mehr zu {{ firstName }}
        </nuxt-link>
      </div>
    </article>
  </fade-in>
</template>

<script>
export default {
  name: 'ContributorCard',

  props: {
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      required: true,
    },
  },

  computed: {
    name() {
      return `${this.firstName} ${this.lastName}`
    },
    permalink() {
      return `/initiatoren/${this.slug}`
    },
  },
}
</script>

<style module>
.contImage figcaption {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

.contImage img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  transition: opacity 300ms ease-in;
}

.contWrapper > a:hover img,
.contWrapper > a:focus img,
.contWrapper > a:active img {
  opacity: 0.8;
}

.button,
.button[href]:link,
.button[href]:visited {
  background: var(--colorTextDefault);
  color: var(--colorWhite);
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
</style>
