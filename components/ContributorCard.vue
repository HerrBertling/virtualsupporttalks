<template>
  <fade-in>
    <article class="flex flex-col gap-4">
      <nuxt-link :to="localePath(permalink)" class="group">
        <figure
          class="inline-flex m-0 overflow-hidden rounded-md shadow-lg"
          role="figure"
          :aria-label="name"
        >
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
              class="max-w-full h-[450px] object-cover transition-opacity duration-300 group-hover:opacity-80 group-focus:opacity-80 group-active:opacity-80"
              height="450"
              loading="lazy"
            />
          </picture>
          <figcaption class="sr-only">
            {{ name }}
          </figcaption>
        </figure>
      </nuxt-link>
      <h3 class="font-bold font-headline text-2xl">{{ name }}</h3>
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
