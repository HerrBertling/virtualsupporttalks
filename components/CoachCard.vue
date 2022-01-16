<template>
  <article
    :class="[
      'grid grid-cols-[4rem_1fr] grid-rows-[4rem_1fr] gap-3 px-3 py-3 rounded-md shadow-lg overflow-hidden bg-white relative',
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
    <header class="row-start-1 col-start-2 self-center">
      <a
        :href="url ? url : `mailto:${email}`"
        target="_blank"
        rel="noopener"
        @click="trackCoachClick('image', name)"
      >
        <h3
          class="font-bold text-xl text-gray-500 hover:text-vsp-500 transition-colors"
        >
          {{ name }}
        </h3>
      </a>
    </header>
    <div class="row-start-2 col-span-full prose prose-sm">
      <p v-if="$i18n.locale === 'de'">
        <strong class="text-gray-500">{{ $t('coach.focus') }}</strong>
      </p>
      <slot />
    </div>
    <div class="flex flex-row justify-between col-start-1 col-span-2 gap-2">
      <a
        v-for="method in contactMethods"
        :key="method.type"
        :href="method.address"
        :title="$t('coach.website')"
        target="_blank"
        rel="noopener"
        class="flex flex-grow py-2 border border-vsp-400 rounded-md text-sm w-full justify-center items-center text-gray-600 no-underline transition-colors duration-200 hover:text-vsp-900 hover:bg-vsp-100 hover:border-vsp-700 focus:border-vsp-700 focus:text-vsp-900 focus:bg-vsp-100 active:text-vsp-900 active:border-vsp-700 active:bg-vsp-100"
        @click="trackCoachClick(method.type, name)"
      >
        <component :is="method.icon" :width="20" :height="20" class="mr-1" />
        <span>{{ $t(method.type) }}</span>
      </a>
    </div>
    <span
      v-if="emergency"
      class="absolute top-0 right-4 w-48 text-center text-orange-900 text-xs transform rotate-45 translate-x-16 translate-y-8 py-1 bg-orange-300 shadow-md"
    >
      {{ $t('coach.emergency') }}
    </span>
  </article>
</template>

<script>
import MailIcon from '~/components/icons/mail.vue'
import PhoneIcon from '~/components/icons/phone.vue'
import WebIcon from '~/components/icons/web.vue'
export default {
  name: 'CoachCard',

  components: {
    MailIcon,
    PhoneIcon,
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
    phone: {
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
    emergency: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    contactMethods() {
      const methods = [
        {
          type: 'email',
          icon: 'MailIcon',
          address: this.email ? `mailto:${this.email}` : null,
        },
        {
          type: 'website',
          icon: 'WebIcon',
          address: this.url,
        },
        {
          type: 'phone',
          icon: 'PhoneIcon',
          address: this.phone ? `tel:${this.phone}` : null,
        },
      ]
      return methods.filter((method) => !!method.address)
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
