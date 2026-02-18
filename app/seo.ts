const defaults = {
  title: "REDEZEIT FÜR DICH #virtualsupporttalks",
  titleTemplate: "%s | REDEZEIT FÜR DICH #virtualsupporttalks",
  description:
    "Redezeit bietet dir ehrenamtlich ein Ohr bei Unsicherheiten, Selbstzweifeln, Einsamkeit, Wut, Hilflosigkeit, Frust, Unruhe, Überforderung und allem, was einen Menschen belasten kann",
};

export function getSeoMeta({
  title,
  description,
}: {
  title?: string | null;
  description?: string | null;
}) {
  const resolvedTitle = title ? defaults.titleTemplate.replace("%s", title) : defaults.title;

  return {
    title: resolvedTitle,
    ...(description ? { description } : { description: defaults.description }),
  };
}

export function getSeo(): [Record<string, string>, Array<Record<string, string>>] {
  return [
    {
      title: defaults.title,
      description: defaults.description,
    },
    [],
  ];
}
