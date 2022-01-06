<template>
  <article
    :class="[
      'grid grid-cols-[4rem_1fr] grid-rows-[4rem_1fr] gap-3 px-3 pt-6 pb-3 rounded-md shadow-lg overflow-hidden bg-white relative',
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
      <h3 class="font-bold text-lg text-gray-600">
        {{ name }}
      </h3>
      <div class="flex flex-row">
        <a
          v-for="method in contactMethods"
          :key="method.type"
          :href="method.address"
          :title="$t('coach.website')"
          target="_blank"
          rel="noopener"
          class="flex items-center text-gray-600 no-underline transition-colors duration-200 hover:text-vsp-500 focus:text-vsp-500 active:text-vsp-500"
          @click="trackCoachClick(method.type, name)"
        >
          <component :is="method.icon" :width="24" :height="24" class="mr-2" />
        </a>
      </div>
    </header>
    <div class="row-start-2 col-span-full prose prose-sm mt-4">
      <p v-if="$i18n.locale === 'de'">
        <strong class="text-gray-600">{{ $t('coach.focus') }}</strong>
      </p>
      <slot />
    </div>
    <span
      v-if="emergency"
      class="absolute top-0 right-4 w-48 text-center text-orange-900 text-xs transform rotate-45 translate-x-16 translate-y-8 py-1 bg-orange-300 shadow-md"
    >
      Dringende Fälle
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
