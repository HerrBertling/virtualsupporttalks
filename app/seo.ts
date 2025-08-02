// SEO utilities for React Router v7
interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const defaultSeo = {
  title: "REDEZEIT FÜR DICH #virtualsupporttalks",
  titleTemplate: "%s | REDEZEIT FÜR DICH #virtualsupporttalks",
  description:
    "Redezeit bietet dir ehrenamtlich ein Ohr bei Unsicherheiten, Selbstzweifeln, Einsamkeit, Wut, Hilflosigkeit, Frust, Unruhe, Überforderung und allem, was einen Menschen belasten kann",
};

export function getSeoMeta(config: SeoConfig = {}) {
  const title = config.title ? 
    defaultSeo.titleTemplate.replace('%s', config.title) : 
    defaultSeo.title;
  
  const description = config.description || defaultSeo.description;

  return {
    title,
    description,
    "og:title": title,
    "og:description": description,
    "twitter:title": title,
    "twitter:description": description,
    ...(config.image && {
      "og:image": config.image,
      "twitter:image": config.image,
    }),
    ...(config.url && {
      "og:url": config.url,
    }),
  };
}

export function getSeoLinks(config: SeoConfig = {}) {
  return [
    ...(config.url ? [{ rel: "canonical", href: config.url }] : [])
  ];
}

// For backward compatibility
export function getSeo(config: SeoConfig = {}) {
  return {
    title: config.title ? 
      defaultSeo.titleTemplate.replace('%s', config.title) : 
      defaultSeo.title,
    description: config.description || defaultSeo.description,
  };
}
