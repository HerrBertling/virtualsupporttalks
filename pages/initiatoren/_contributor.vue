<template>
  <article class="contributorPage">
    <figure class="contImage" role="figure" :aria-label="name">
      <picture>
        <source :srcset="img" type="image/jpeg" />
        <img :src="img" :alt="name" loading="lazy" />
      </picture>
      <figcaption>{{ name }}</figcaption>
    </figure>
    <div class="contContent">
      <h1>
        <a :href="contribData.website">{{ name }}</a>
      </h1>
      <nuxt-content :document="contribData" />
      <a class="button" :href="contribData.website">
        Zur Webseite von {{ contribData.firstName }}
      </a>
    </div>
  </article>
</template>

<script>
export default {
  name: "ContributorPage",

  async asyncData({ $content, params }) {
    const contribData = await $content(
      `contributors/${params.contributor}`
    ).fetch();
    return { contribData };
  },

  computed: {
    name() {
      const { firstName, lastName } = this.contribData;
      return `${firstName} ${lastName}`;
    },

    img() {
      return require(`~/${this.contribData.image}`);
    },
  },
};
</script>

<style scoped>
.contributorPage {
  display: grid;
  grid-template-columns: 1fr;
  background-color: rgb(192, 192, 192);
  padding: 4rem 1rem 2rem;
}

.contImage {
  margin: 0;
}

.contImage,
.contContent {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 0;
}

.contImage img {
  max-width: 100%;
  object-fit: cover;
}

.contContent > div {
  margin-bottom: 2rem;
}

@media (min-width: 1280px) {
  .contributorPage {
    grid-template-columns: 1fr 1fr;
    padding: 0 0 2rem;
  }
  .contImage,
  .contContent {
    padding: 4rem;
  }
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
