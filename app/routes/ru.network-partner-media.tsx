import type { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

export const headers: HeadersFunction = () => ({
  // Tell the browser to always check the freshness of the cache
  "Cache-Control": "public, max-age=0, must-revalidate",
  // Tell the CDN to treat it as fresh for 5 minutes, but for a day after that return a stale version while it revalidates
  "Netlify-CDN-Cache-Control": "public, durable, s-maxage=300, stale-while-revalidate=86400",
});

export const meta: MetaFunction = ({ data }) => {
  const { title, seo } = data?.page?.fields;

  let seoMeta = getSeoMeta({
    title: seo?.fields?.title || title,
    description: seo?.fields?.description || null,
  });
  return [
    {
      ...seoMeta,
    },
  ];
};

export const loader: LoaderFunction = async () => {
  const locale = "ru";

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

export default function SupportMedia() {
  const { page, navigation, network, supporters, media, locale } =
    useLoaderData<typeof loader>();

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
