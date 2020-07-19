<template>
  <article :class="$style.coachWrapper">
    <a
      :href="coach.url ? coach.url : `mailto:${coach.email}`"
      target="_blank"
      rel="noopener"
      :class="$style.coachImage"
    >
      <img :src="usedImage" :alt="coach.name" loading="lazy" @error="err" />
    </a>
    <a
      :href="coach.url ? coach.url : `mailto:${coach.email}`"
      target="_blank"
      rel="noopener"
      :class="$style.title"
    >
      <h3 :class="$style.headline">
        {{ coach.name }}
      </h3>
    </a>
    <div :class="$style.content">
      <p><strong>Meine Schwerpunkte:</strong></p>
      <slot />
    </div>
  </article>
</template>

<script>
export default {
  name: "CoachCard",

  props: {
    coach: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    usedImage() {
      if (this.coach.image.startsWith("/static/")) {
        return this.coach.image.substring(7);
      }
      return this.coach.image;
    },
  },
  methods: {
    err() {
      console.log("image not found?");
    },
  },
};
</script>

<style module>
.coachWrapper {
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 4rem 1fr;
  grid-gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07);
  overflow: hidden;
}
.coachImage {
  margin: 0;
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  grid-row: 1;
  grid-column: 1;
  overflow: hidden;
  box-shadow: inset 0 2px 0 0 rgba(0, 0, 0, 0.07);
}

.coachImage figcaption {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

.coachImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  grid-row: 1;
  grid-column: 2;
  align-self: center;
}

.headline {
  font-size: 0.75rem;
}

.content {
  grid-row: 2;
  grid-column: 1 / -1;
  font-size: 0.75rem !important;
}
.coachContent ul {
  padding: 0;
  margin: 0;
}
</style>
