import { initSeo } from "remix-seo";
export const { getSeo, getSeoMeta, getSeoLinks } = initSeo({
  // Pass any SEO defaults for your site here.
  // If individual routes do not provide their own meta and link tags,
  // the tags generated by the defaults will be used.
  title: "REDEZEIT FÜR DICH #virtualsupporttalks",
  titleTemplate: "%s | REDEZEIT FÜR DICH #virtualsupporttalks",
  description:
    "Redezeit bietet dir ehrenamtlich ein Ohr bei Unsicherheiten, Selbstzweifeln, Einsamkeit, Wut, Hilflosigkeit, Frust, Unruhe, Überforderung und allem, was einen Menschen belasten kann",
});
