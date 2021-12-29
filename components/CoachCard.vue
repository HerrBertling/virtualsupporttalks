<template>
  <article
    :class="[
      'grid grid-cols-[4rem_1fr] grid-rows-[4rem_1fr] gap-3 px-3 pt-6 pb-3 rounded-md shadow-lg overflow-hidden bg-white',
      $style.coachWrapper,
    ]"
  >
    <a
      :href="url ? url : `mailto:${email}`"
      target="_blank"
      rel="noopener"
      class="h-16 w-16 rounded-full overflow-hidden row-start-1 col-start-1 shadow-inset-md"
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
          class="w-full h-full object-cover"
          width="80"
          height="80"
          loading="lazy"
        />
      </picture>
    </a>
    <header class="row-start-1 col-start-2 self-start">
      <h3 class="text-sm font-bold mb-2">
        {{ name }}
      </h3>
      <a
        v-if="url"
        :href="url"
        target="_blank"
        rel="noopener"
        class="flex items-center text-[10px] mb-2 no-underline hover:text-vsp-500 focus:text-vsp-500 active:text-vsp-500"
        @click="trackCoachClick('website', name)"
      >
        <WebIcon :width="16" :height="16" class="mr-2" />
        <span> {{ $t('coach.website') }} </span>
      </a>
      <a
        v-if="email"
        :href="`mailto:${email}`"
        target="_blank"
        rel="noopener"
        class="flex items-center text-[10px] mb-2 no-underline hover:text-vsp-500 focus:text-vsp-500 active:text-vsp-500"
        @click="trackCoachClick('email', name)"
      >
        <MailIcon :width="16" :height="16" class="mr-2" />
        <span>{{ $t('coach.email') }}</span>
      </a>
    </header>
    <div class="row-start-2 col-span-full prose prose-sm mt-4">
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
  content-visibility: auto;
  contain-intrinsic-size: 400px;
}
</style>
