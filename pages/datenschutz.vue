<template>
  <article :class="$style.basicContent">
    <ContentfulRichText :content="content[0].fields.content" />
    <form>
      <fieldset :class="$style.fieldset">
        <legend :class="$style.legend">
          {{ $t('cookie.settings') }}
        </legend>
        <label :class="$style.toggle">
          <input v-model="hasCookiesAccepted" type="checkbox" />
          <span>
            {{
              hasCookiesAccepted
                ? $t('cookie.deactivate')
                : $t('cookie.activate')
            }}
          </span>
        </label>
      </fieldset>
    </form>
  </article>
</template>

<script>
import pageIds from '~/utils/pageIds'

export default {
  name: 'DataPrivacy',
  transition: 'page',

  nuxtI18n: {
    paths: {
      de: '/datenschutz',
      en: '/privacy',
    },
  },

  async asyncData({ app, $contentful }) {
    const { fields } = await $contentful.getEntry(pageIds.DATA_PRIVACY, {
      locale: app.i18n.locale,
    })
    return {
      title: fields.title,
      content: fields.content,
      seo: fields.seo?.fields,
    }
  },
  data() {
    return {
      hasCookiesAccepted: false,
    }
  },
  head() {
    const title = this.seo ? this.seo.title : this.title
    const meta = this.seo
      ? Object.entries(this.seo).map((entry) => ({
          hid: entry[0],
          name: entry[0],
          content: entry[1],
        }))
      : []

    return {
      title,
      meta,
    }
  },
  watch: {
    async hasCookiesAccepted(newValue) {
      if (newValue) {
        await this.$ga.enable()
        localStorage['cookie:accepted'] = newValue
      } else {
        await this.$ga.disable()
        localStorage.clear()
      }
    },
  },
  mounted() {
    if (localStorage['cookie:accepted']) {
      this.hasCookiesAccepted = localStorage['cookie:accepted']
    }
  },
}
</script>

<style module>
.basicContent {
  padding: 6rem 1rem 3rem;
  min-height: 75vh;
  max-width: var(--widthContentMax);
  margin: 0 auto;
}

.fieldset {
  border: 0;
  padding: 0;
  margin: 1rem 0;
}

.legend {
  margin-bottom: 1rem;
  font-weight: bold;
}

.toggle {
  display: grid;
  grid-template-columns: 40px auto;
}
</style>
