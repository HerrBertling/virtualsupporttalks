<template>
  <article :class="$style.basicContent">
    <ContentfulRichText :content="content[0].fields.content" />
    <form>
      <fieldset :class="$style.fieldset">
        <legend :class="$style.legend">Cookie-Einstellungen bearbeiten</legend>
        <label :class="$style.toggle">
          <input v-model="hasCookiesAccepted" type="checkbox" />
          <span>
            Cookies {{ hasCookiesAccepted ? 'deaktivieren' : 'aktivieren' }}
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

  async asyncData({ $contentful }) {
    const { fields } = await $contentful.getEntry(pageIds.DATA_PRIVACY)
    return { title: fields.title, content: fields.content }
  },
  data() {
    return {
      hasCookiesAccepted: false,
    }
  },
  head() {
    return {
      title: this.title,
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
