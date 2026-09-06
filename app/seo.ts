const defaults = {
  title: "REDEZEIT FÜR DICH #virtualsupporttalks",
  titleTemplate: "%s | REDEZEIT FÜR DICH #virtualsupporttalks",
  description:
    "Redezeit bietet dir ehrenamtlich ein Ohr bei Unsicherheiten, Selbstzweifeln, Einsamkeit, Wut, Hilflosigkeit, Frust, Unruhe, Überforderung und allem, was einen Menschen belasten kann",
};

type MetaDescriptor = { title: string } | { name: string; content: string };

/**
 * Returns React Router meta descriptors for a page.
 *
 * The title and the description have to be separate descriptors: React Router
 * renders an object containing `title` as a <title> element and ignores its
 * other keys, so folding both into one object silently dropped the
 * description from every page.
 */
export function getSeoMeta({
  title,
  description,
}: {
  title?: string | null;
  description?: string | null;
}): MetaDescriptor[] {
  return [
    { title: title ? defaults.titleTemplate.replace("%s", title) : defaults.title },
    { name: "description", content: description || defaults.description },
  ];
}

export function getSeo(): [MetaDescriptor[], Array<Record<string, string>>] {
  return [getSeoMeta({}), []];
}
