import { Link } from "@remix-run/react";
import { useState } from "react";
import { availableLocales, getCurrentLocale } from "~/utils/locales";
import GlobeIcon from "./icons/GlobeIcon";

export default function LanguageSwitcher() {
  const [show, setShow] = useState(false);
  const currentLang = getCurrentLocale();
  const langsInMenu = availableLocales.filter((lang) => lang !== currentLang);
  return (
    <div className="mr-1 w-auto" onClick={() => setShow(!show)}>
      <div className="block cursor-pointer rounded-md p-4 no-underline hover:bg-white hover:text-vsp-500 lg:inline-block lg:rounded-md lg:py-1 lg:px-2">
        <button className="flex items-center justify-center uppercase">
          <GlobeIcon classNames="h-5 w-5" />
          {currentLang}
        </button>
      </div>
      {show && (
        <div className="absolute z-50 mt-4 flex flex-col items-center rounded-md bg-white lg:rounded-md">
          {langsInMenu.map((lang) => (
            <div key={lang} className="my-4 mx-3 hover:text-vsp-500">
              <Link
                to={`/${lang}`}
                className="block rounded-md p-4 uppercase no-underline hover:text-vsp-500 lg:rounded-md lg:py-1 lg:px-2"
              >
                {lang}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

{
  /* <template>
 

<script>
import vClickOutside from 'v-click-outside'

export default {
  name: 'LanguageSwitcher',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  
  props: {
    locales: {
      type: [String],
      default: null,
    },
  },
  data() {
    return {
      locale: this.$i18n.localeProperties.name,
      displayLocales: this.$i18n.locales.filter((loc) => loc !== this.locale),
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  methods: {
    handleClick(lang) {
      this.show = false
      this.displayLocales = this.locales.filter((loc) => loc !== lang)
      return (this.locale = lang)
    },
    onClickOutside(event) {
      if (this.show) {
        this.show = false
      }
    },
  },
}
</script> */
}
