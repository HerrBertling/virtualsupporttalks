<template>
  <nav aria-role="navigation">
    <button
      id="navToggle"
      :class="['menuToggle', navExpanded && 'menuActive']"
      :aria-expanded="navExpanded"
      aria-controls="navigation"
      @click="toggleNav"
    >
      <span class="menuText">Menu</span>
      <span class="burger"></span>
    </button>
    <ul id="navigation" :class="['headerNav', navExpanded && 'menuExpanded']">
      <li v-for="item in navigationItems" :key="item.path">
        <nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
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
          title: 'Ich suche Redezeit',
          path: '/ich-suche-redezeit',
        },
        {
          title: 'Ich biete Redezeit',
          path: '/ich-biete-redezeit',
        },
        {
          title: 'Supporter und Medien',
          path: '/supporter-und-medien',
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
  },
}
</script>

<style scoped>
.headerNav {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 64px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 48px);
  transform: translateX(100vw);
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

  nav {
    flex-grow: 1;
    max-width: 70vw;
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
