<template>
  <nav :class="$style.footerNav">
    <ul :class="$style.footerNav_list">
      <li
        v-for="{ link, title } in footerNav"
        :key="link"
        :class="$style.footerNav_item"
      >
        <nuxt-link :class="$style.footerNav_link" :to="link">
          {{ title }}
        </nuxt-link>
      </li>
    </ul>
    <client-only>
      <cookie-law theme="dark-lime">
        <div slot-scope="props" :class="$style.cookieBanner">
          <p>
            Diese Website verwendet Cookies. Weitere Informationen finden sich
            auf der <nuxt-link to="/datenschutz">Datenschutz-Seite</nuxt-link>
          </p>
          <div>
            <button :class="$style.accept" @click="acceptCookies(props.accept)">
              <span>Akzeptieren</span>
            </button>
          </div>
          <div>
            <button
              :class="$style.decline"
              @click="declineCookies(props.close)"
            >
              <span>Ablehnen</span>
            </button>
          </div>
        </div>
      </cookie-law>
    </client-only>
  </nav>
</template>

<script>
export default {
  name: 'LayoutFooter',
  props: {
    footerNav: {
      type: Array,
      default: () => [
        {
          link: '/impressum',
          title: 'Impressum',
        },
        {
          link: '/datenschutz',
          title: 'Datenschutz',
        },
      ],
    },
  },
  methods: {
    acceptCookies(handler) {
      this.$ga.enable()
      handler()
    },
    declineCookies(handler) {
      this.$ga.disable()
      handler()
    },
  },
}
</script>

<style module>
.footerNav {
  padding: 2rem;
  font-size: 0.8rem;
}
.footerNav_list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footerNav_link {
  display: block;
  padding: 8px;
  color: var(--colorTextDefault);
  text-decoration: underline;
}

.cookieBanner {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

@media (min-width: 768px) {
  .cookieBanner {
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 2rem;
  }
}

.cookieBanner a[href]:link,
.cookieBanner a[href]:visited {
  color: inherit !important;
}

.cookieBanner p {
  font-size: 0.75rem;
  margin: 0;
}

.accept,
.decline {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border: 2px solid;
  font-family: inherit;
  font-size: 0.75rem;
  color: white;
}

.accept {
  background: rgb(156, 195, 23);
  border-color: rgb(156, 195, 23);
}

.decline {
  background: transparent;
}

@media (min-width: 768px) {
  .footerNav_list {
    flex-direction: row;
  }
  .footerNav_link {
    padding: 16px 8px;
  }
}
</style>
