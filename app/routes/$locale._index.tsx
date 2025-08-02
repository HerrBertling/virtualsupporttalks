import type {
  IBlogpost,
  IPage,
  LOCALE_CODE,
} from "../../@types/generated/contentful";
import type { MetaFunction } from "react-router";
import type { Route } from "./+types/$locale._index";
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

export async function loader({
  params,
}: Route.LoaderArgs): Promise<PageProps> {
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

export default function Index({ loaderData }: Route.ComponentProps) {
  const {
    page: {
      fields: { content },
    },
    locale,
  } = loaderData;
  return <ContentBlocks content={content} locale={locale} latestPosts={loaderData.latestPosts} />;
}
