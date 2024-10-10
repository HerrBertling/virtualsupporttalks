import type {
  IBlogpost,
  IPage,
  LOCALE_CODE,
} from "../../@types/generated/contentful";
import type { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getLatestBlogposts, getPageById } from "~/utils/contentful";
import pageIds from "~/utils/pageIds";
import ContentBlocks from "~/components/ContentBlocks";

import { getSeoMeta } from "~/seo";

type PageProps = {
  page: IPage;
  locale: LOCALE_CODE;
  latestPosts: IBlogpost[];
};

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

export const headers: HeadersFunction = () => ({
  // Tell the browser to always check the freshness of the cache
  "Cache-Control": "public, max-age=0, must-revalidate",
  // Tell the CDN to treat it as fresh for 5 minutes, but for a day after that return a stale version while it revalidates
  "Netlify-CDN-Cache-Control": "public, durable, s-maxage=300, stale-while-revalidate=86400",
});

export const loader: LoaderFunction = async ({
  params,
}): Promise<PageProps> => {
  const locale = params.locale as LOCALE_CODE;
  if (!locale) {
    throw new Error("No locale provided");
  }
  const page = await getPageById(pageIds.STARTPAGE, locale);
  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  const latestPosts = (await getLatestBlogposts(
    locale as LOCALE_CODE,
  )) as IBlogpost[];

  return { page, locale, latestPosts };
};

export default function Index() {
  const {
    page: {
      fields: { content },
    },
    locale,
  }: PageProps = useLoaderData<typeof loader>();
  return <ContentBlocks content={content} locale={locale} />;
}
