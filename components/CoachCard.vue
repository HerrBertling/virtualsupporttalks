<template>
  <article :class="$style.coachWrapper">
    <a
      :href="url ? url : `mailto:${email}`"
      target="_blank"
      rel="noopener"
      :class="$style.coachImage"
      @click="trackCoachClick('image', name)"
    >
      <picture>
        <source
          :srcset="`${image}?w=120&h=120&fm=webp&f=face&fit=thumb, ${image}?w=240&h=240&fm=webp&f=face&fit=thumb 2x`"
          type="image/webp"
        />
        <source
          :srcset="`${image}?w=120&h=120&fm=jpeg&f=face&fit=thumb, ${image}?w=240&h=240&fm=jpeg&f=face&fit=thumb 2x`"
          type="image/jpeg"
        />
        <img
          :src="`${image}?w=120&h=120&f=face&fit=thumb`"
          :alt="name"
          width="80"
          height="80"
          loading="lazy"
        />
      </picture>
    </a>
    <header :class="$style.title">
      <h3 :class="$style.headline">
        {{ name }}
      </h3>
      <a
        v-if="url"
        :href="url"
        target="_blank"
        rel="noopener"
        :class="$style.link"
        @click="trackCoachClick('website', name)"
      >
        <WebIcon :width="16" :height="16" :class="$style.gap" />
        <span> {{ $t('coach.website') }} </span>
      </a>
      <a
        v-if="email"
        :href="`mailto:${email}`"
        target="_blank"
        rel="noopener"
        :class="$style.link"
        @click="trackCoachClick('email', name)"
      >
        <MailIcon :width="16" :height="16" :class="$style.gap" />
        <span>{{ $t('coach.email') }}</span>
      </a>
    </header>
    <div :class="$style.content">
      <p v-if="$i18n.locale === 'de'">
        <strong>{{ $t('coach.focus') }}</strong>
      </p>
      <slot />
    </div>
  </article>
</template>

<script>
import MailIcon from '~/components/icons/mail.vue'
import WebIcon from '~/components/icons/web.vue'
export default {
  name: 'CoachCard',

  components: {
    MailIcon,
    WebIcon,
  },

  props: {
    email: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  methods: {
    trackCoachClick(type, coach) {
      this.$ga.event({
        eventCategory: 'coachClick',
        eventAction: type,
        eventLabel: coach,
      })
    },
  },
}
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
  content-visibility: auto;
  contain-intrinsic-size: 400px;
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
  margin: 0 0 0.5rem;
}

.link[href],
.link[href]:visited {
  display: flex;
  align-items: center;
  font-size: 0.625rem;
  margin: 0 0 0.5rem;
  text-decoration: none;
}

.gap {
  margin-right: 0.5rem;
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
