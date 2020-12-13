import 'regenerator-runtime/runtime.js'

const contentful = require('contentful')
export default (context, inject) => {
  const cms = contentful.createClient({
    space: context.$config.contentfulSpace,
    accessToken: context.$config.contentfulKey,
  })
  inject('contentful', cms)
}
