<template>
  <nav :class="$style.nav" aria-role="navigation">
    <button
      :class="[$style.menuToggle, navExpanded && $style.menuActive]"
      :aria-expanded="navExpanded"
      aria-controls="navigation"
      @click="toggleNav"
    >
      <span :class="$style.menuText">Menu</span>
      <span :class="$style.burger"></span>
    </button>
    <ul :class="[$style.headerNav, navExpanded && $style.menuExpanded]">
      <li v-for="item in navigationItems" :key="item.path.de" @click="closeNav">
        <nuxt-link :to="item.path[$i18n.locale]">
          {{ item.title[$i18n.locale] }}
        </nuxt-link>
      </li>
      <li v-if="$i18n.locale === 'de'">
        <nuxt-link :to="localePath('/', 'en')">English version</nuxt-link>
      </li>
      <li v-else>
        <nuxt-link :to="localePath('/', 'de')">Deutsche Version</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HeaderNavigation',
  data() {
    return {
      navExpanded: false,
      navigationItems: [
        {
          title: {
            de: 'Ich suche Redezeit',
            en: 'I need speaking time',
          },
          path: {
            de: '/ich-suche-redezeit/',
            en: '/en/i-need-speaking-time/',
          },
        },
        {
          title: {
            de: 'Ich biete Redezeit',
            en: 'I offer speaking time',
          },
          path: {
            de: '/ich-biete-redezeit/',
            en: '/en/i-offer-speaking-time/',
          },
        },
        {
          title: {
            de: 'Netzwerk, Partner + Medien',
            en: 'Network, partner + media',
          },
          path: {
            de: '/netzwerk-partner-medien/',
            en: '/en/network-partner-media/',
          },
        },
        {
          title: {
            de: 'Spenden',
            en: 'Donate',
          },
          path: {
            de: '/jetzt-unterstuetzen-spende-an-redezeit/',
            en: '/en/support-now-donate-to-redezeit/',
          },
        },
        {
          title: {
            de: 'Blog',
            en: 'Blog',
          },
          path: {
            de: '/blog/',
            en: '/en/blog/',
          },
        },
      ],
    }
  },

  watch: {
    navExpanded(newValue) {
      this.$emit('navigation-active', newValue)
    },
  },

  methods: {
    toggleNav() {
      this.navExpanded = !this.navExpanded
    },
    closeNav() {
      this.navExpanded = false
    },
  },
}
</script>

<style module>
.headerNav {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 64px;
  right: 0;
  width: 100vw;
  max-width: 50rem;
  height: calc(100vh - 64px);
  transform: translateX(50rem);
  transition: transform 300ms ease-in;
  background: var(--colorWhite);
}

.headerNav.menuExpanded {
  transform: translateX(0);
}

.menuText {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

.burger {
  position: relative;
}

.burger,
.burger::before,
.burger::after {
  display: inline-block;
  content: '';
  background-color: var(--colorTextDefault);
  height: 2px;
  width: 24px;
  transition: transform 200ms ease-in;
}
.burger::before,
.burger::after {
  position: absolute;
  left: 0;
  width: 100%;
}

.burger::before {
  top: -6px;
}

.burger::after {
  top: 6px;
}

.menuActive .burger {
  background-color: white;
}

.menuActive .burger::before,
.menuActive .burger::after {
  top: 0;
}

.menuActive .burger::before {
  transform: scale(1.0876) rotate(45deg);
}

.menuActive .burger::after {
  transform: scale(1.0876) rotate(-45deg);
}

.headerNav li {
  display: block;
  width: 100%;
  margin: 0;
}

.headerNav li a {
  display: block;
  padding: 1rem;
  border-radius: 0.25rem;
}

.headerNav li a[href]:not(:hover) {
  text-decoration: none;
}

.headerNav li a[data-current='current item'] {
  background-color: white;
}

@media (min-width: 960px) {
  .menuToggle {
    display: none;
  }
  .headerNav {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: static;
    width: auto;
    height: auto;
    transform: none;
    background: transparent;
    top: auto;
    left: auto;
  }

  .nav {
    flex-grow: 1;
    max-width: 960px;
  }

  .headerNav li {
    width: auto;
    margin-right: 0.25rem;
  }

  .headerNav li a {
    display: inline-block;
    padding: 0.25rem 0.5rem;
  }
}
</style>
