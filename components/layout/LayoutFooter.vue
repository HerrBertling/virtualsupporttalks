<template>
  <nav class="footerNav">
    <ul class="footerNav_list">
      <li
        v-for="{ link, title } in footerNav"
        :key="link"
        class="footerNav_item"
      >
        <nuxt-link class="footerNav_link" :to="link">
          {{ title }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "LayoutFooter",

  props: {
    footerNav: {
      type: Array,
      default: () => [
        {
          link: "/impressum",
          title: "Impressum",
        },
        {
          link: "/datenschutz",
          title: "Datenschutz",
        },
        {
          link: "/cookies",
          title: "Cookie-Richtlinie",
        },
      ],
    },
  },
};
</script>

<style scoped>
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

@media (min-width: 768px) {
  .footerNav_list {
    flex-direction: row;
  }
  .footerNav_link {
    padding: 16px 8px;
  }
}
</style>
