import ContentBlocks from "~/components/ContentBlocks";
import { getSeoMeta } from "~/seo";
import { getLatestBlogposts, getPageById } from "~/utils/contentful";
import pageIds from "~/utils/pageIds";
import type { IBlogpost, LOCALE_CODE } from "../../types/contentful";
import type { Route } from "./+types/$locale._index";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data?.page) {
    return [{ title: "Redezeit" }];
  }

  const { title, seo } = data.page.fields;

  const seoMeta = getSeoMeta({
    title: seo?.fields?.title || title,
    description: seo?.fields?.description || undefined,
  });
  return [
    {
      ...seoMeta,
    },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale as LOCALE_CODE;
  if (!locale) {
    throw new Error("No locale provided");
  }

  const [page, latestPosts] = await Promise.all([
    getPageById(pageIds.STARTPAGE, locale),
    getLatestBlogposts(locale) as Promise<IBlogpost[]>,
  ]);

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  return { page, locale, latestPosts };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { page, locale } = loaderData;
  return <ContentBlocks content={page.fields.content} locale={locale} />;
}
