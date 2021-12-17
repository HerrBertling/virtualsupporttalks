const type = 'website'
const url = 'https://www.virtualsupporttalks.de/'
const title = 'Redezeit für dich'
const description =
  'Wir unterstützen Dich bei Unsicherheiten, Selbstzweifeln, Einsamkeit, Wut, Hilflosigkeit, Frust, Unruhe, Überforderung und alles, was einen Menschen negativ beschäftigt, mit Redezeit, die Zuhörer*innen für alle Lebensfragen kostenlos zur Verfügung stellen.'
const image =
  'https://images.ctfassets.net/jz6x3ir73b58/1EPScTYT6PWQoZIcVcF6EG/246834a033d103e011fa5e2389947bb2/Kachel_fuer_Kreis.jpg'
const twitterCard = 'summary_large_image'

/**
 * @param { description: string,  image: string,  title: string,  url: string, type: string } meta
 */

export default (meta) => {
  const fullPath = `${url}${meta.url}`
  const socialImage = `https:${meta.image}?w=1200&h=630`
  return [
    {
      hid: 'description',
      name: 'description',
      content: meta.description || description,
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: meta.type || type,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: fullPath || url,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: meta.title || title,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: meta.description || description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: socialImage || image,
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: fullPath || url,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: meta.title || title,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: meta.description || description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: socialImage || image,
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: twitterCard,
    },
  ]
}
