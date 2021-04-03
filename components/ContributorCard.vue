<template>
  <fade-in>
    <article :class="$style.contWrapper">
      <nuxt-link :to="localePath(permalink)">
        <figure :class="$style.contImage" role="figure" :aria-label="name">
          <picture>
            <source
              :srcset="`${image}?h=450&fm=webp, ${image}?h=900&fm=webp 2x`"
              type="image/webp"
            />
            <source
              :srcset="`${image}?h=450&fm=jpeg, ${image}?h=900&fm=jpeg 2x`"
              type="image/jpeg"
            />
            <img
              :src="`${image}?h=450`"
              :alt="name"
              height="450"
              loading="lazy"
            />
          </picture>
          <figcaption>{{ name }}</figcaption>
        </figure>
      </nuxt-link>
      <h3>{{ name }}</h3>
      <div>
        <clever-button :to="permalink" variant="secondary">
          {{ $t('initiator.more') }} {{ firstName }}
        </clever-button>
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
      return `/initiatoren/${this.slug}/`
    },
  },
}
</script>

<style module>
.contWrapper {
  display: grid;
  grid-template-rows: 450px 90px 70px;
  grid-gap: 1rem;
}

.contWrapper h3 {
  margin: 0;
}

.contImage {
  display: inline-flex;
  margin: 0;
}

.contImage figcaption {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

.contImage img {
  max-width: 100%;
  height: 450px;
  object-fit: cover;
  transition: opacity 300ms ease-in;
}

.contWrapper > a:hover img,
.contWrapper > a:focus img,
.contWrapper > a:active img {
  opacity: 0.8;
}
</style>
