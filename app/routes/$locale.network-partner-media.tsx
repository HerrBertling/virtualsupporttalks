import type { MetaFunction } from "react-router";
import type { Route } from "./+types/$locale.network-partner-media";
import NetworkPartnerMediaContent from "~/components/NetworkPartnerMediaContent";
import { getSeoMeta } from "~/seo";
import {
  getMainNav,
  getMedia,
  getNetwork,
  getPageById,
  getSupporters,
} from "~/utils/contentful";
import pageIds from "~/utils/pageIds";
import type { LOCALE_CODE } from "../../@types/generated/contentful";

export const meta: MetaFunction = ({ data }) => {
  const { title, seo } = data?.page?.fields;

  let seoMeta = getSeoMeta({
    title: seo?.fields?.title || title || null,
    description: seo?.fields?.description || null,
  });
  return [
    {
      ...seoMeta,
    },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const locale = (params.locale as LOCALE_CODE) || "de";

  const page = getPageById(pageIds.NETWORK, locale);
  const navigation = getMainNav(locale);
  const network = getNetwork();
  const supporters = getSupporters();
  const media = getMedia();

  const data = await Promise.all([
    page,
    navigation,
    network,
    supporters,
    media,
  ]);

  if (!navigation) {
    throw new Response("Could not load navigation", { status: 404 });
  }

  return {
    page: data[0],
    navigation: data[1],
    network: data[2],
    supporters: data[3],
    media: data[4],
    locale,
  };
};

export default function SupportMedia({ loaderData }: Route.ComponentProps) {
  const { page, navigation, network, supporters, media, locale } = loaderData;

  return (
    <NetworkPartnerMediaContent
      navigation={navigation}
      media={media}
      locale={locale}
      page={page}
      network={network}
      supporters={supporters}
    />
  );
}
