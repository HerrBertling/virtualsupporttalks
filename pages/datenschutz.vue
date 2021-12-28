<template>
  <article class="max-w-3xl pt-24 px-4 pb-3 mx-auto">
    <ContentfulRichText :content="content[0].fields.content" />
    <form>
      <fieldset class="my-8">
        <legend class="mb-4 font-bold text-xl">
          {{ $t('cookie.settings') }}
        </legend>
        <label class="grid grid-cols-[20px_1fr] items-center">
          <input
            v-model="hasCookiesAccepted"
            class="accent-vsp-500"
            type="checkbox"
          />
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
