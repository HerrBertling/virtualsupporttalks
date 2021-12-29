<template>
  <header
    :class="[
      'h-20 fixed top-0 w-full max-w-screen bg-transparent z-50 transition-all duration-300',
      'after:content-[\'\'] after:block after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-white after:opacity-0 after:z-10 after:transition-opacity after:duration-300',
      hasScrolled && 'h-16 after:opacity-100',
      whiteBackground && 'after:opacity-100',
    ]"
  >
    <div
      class="flex justify-between items-center mx-auto max-w-6xl px-4 h-full w-full"
    >
      <em class="relative z-20">
        <nuxt-link :to="localePath('/')">
          <img
            :class="[
              'max-h-12 w-auto transition-transform',
              hasScrolled && 'scale-[0.8]',
            ]"
            src="~/assets/img/logo.png"
            alt="Virtual Support Talks Logo"
          />
        </nuxt-link>
      </em>
      <LayoutHeaderNavigation />
    </div>
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
    }
  },

  mounted() {
    this.lastKnownScrollPos = window.scrollY
    this.toggleScrollClass(this.lastKnownScrollPos)
    window.addEventListener('scroll', (_e) => {
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
    // setHeaderBg(bool) {
    //   this.whiteBackground = bool
    // },
  },
}
</script>
