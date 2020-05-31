<template>
  <header
    id="header"
    :class="[
      hasScrolled && 'hasScrolled',
      whiteBackground && 'whiteBackground',
    ]"
  >
    <em>
      <nuxt-link to="/">
        <img src="~/assets/img/logo.jpg" alt="Virtual Support Talks Logo" />
      </nuxt-link>
    </em>
    <HeaderNavigation
      :navigation-items="navItems"
      @navigation-active="setHeaderBg"
    />
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',

  data() {
    return {
      scrollThreshold: 40,
      lastKnownScrollPos: 0,
      ticking: false,
      hasScrolled: false,
      whiteBackground: false,
      navItems: [
        {
          to: '/ich-suche-redezeit',
          title: 'Ich suche Redezeit',
        },
        {
          to: '/ich-biete-redezeit',
          title: 'Ich biete Redezeit',
        },
      ],
    }
  },

  mounted() {
    window.addEventListener('scroll', (e) => {
      this.lastKnownScrollPos = window.scrollY

      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.toggleScrollClass(this.lastKnownScrollPos)
          this.ticking = false
        })

        this.ticking = true
      }
    })
  },

  methods: {
    toggleScrollClass(scrollPos) {
      if (scrollPos > this.scrollThreshold && !this.hasScrolled) {
        this.hasScrolled = true
      }
      if (scrollPos < this.scrollThreshold && this.hasScrolled) {
        this.hasScrolled = false
      }
    },
    setHeaderBg(bool) {
      this.whiteBackground = bool
    },
  },
}
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: fixed;
  padding: 0 16px;
  top: 0;
  width: 100%;
  max-width: 100vw;
  background-color: transparent;
  z-index: 1337;
  transition: height 300ms ease-in;
  font-size: 16px;
}

#header::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  opacity: 0;
  z-index: 1;
  transition: opacity 300ms ease-in;
}

#header.hasScrolled {
  height: 64px;
}

#header.hasScrolled::after,
#header.whiteBackground::after {
  opacity: 1;
}

#header em,
#header nav {
  position: relative;
  z-index: 2;
}

#header.hasScrolled img {
  transform: scale(0.8);
}

#header img {
  max-height: 48px;
  width: auto;
  transition: transform 300ms ease-in;
}
</style>
