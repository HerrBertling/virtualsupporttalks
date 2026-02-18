import NetworkPartnerMediaContent from "~/components/NetworkPartnerMediaContent";
import { getSeoMeta } from "~/seo";
import { getMainNav, getMedia, getNetwork, getPageById, getSupporters } from "~/utils/contentful";
import { ensureFound } from "~/utils/ensureFound";
import pageIds from "~/utils/pageIds";
import type { LOCALE_CODE } from "../../types/contentful";
import type { Route } from "./+types/ru.network-partner-media";

const locale: LOCALE_CODE = "ru";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data?.page) {
    return [{ title: "Сетевые партнеры СМИ" }];
  }

  const { title, seo } = data.page.fields;

  const seoMeta = getSeoMeta({
    title: seo?.fields?.title || title,
    description: seo?.fields?.description || null,
  });
  return [
    {
      ...seoMeta,
    },
  ];
};

export async function loader() {
  const [page, navigation, network, supporters, media] = await Promise.all([
    getPageById(pageIds.NETWORK, locale),
    getMainNav(locale),
    getNetwork(),
    getSupporters(),
    getMedia(),
  ]);

  const validNavigation = ensureFound(navigation, "Could not load navigation");
  const navItems = (validNavigation.fields.items ?? []).filter(
    (item): item is NonNullable<typeof item> => item !== undefined
  );

  return {
    page: ensureFound(page, "Could not load page"),
    navItems,
    network: network ?? [],
    supporters: supporters ?? [],
    media: media ?? [],
    locale,
  };
}

export default function SupportMedia({ loaderData }: Route.ComponentProps) {
  const { page, navItems, network, supporters, media, locale } = loaderData;

  return (
    <NetworkPartnerMediaContent
      navItems={navItems}
      media={media}
      locale={locale}
      page={page}
      network={network}
      supporters={supporters}
    />
  );
}
