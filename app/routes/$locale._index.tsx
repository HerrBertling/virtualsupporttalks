import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ContentBlocks from "~/components/ContentBlocks";
import { getSeoMeta } from "~/seo";
import { getLatestBlogposts, getPageById } from "~/utils/contentful";
import pageIds from "~/utils/pageIds";
import type { IBlogpost, LOCALE_CODE } from "../../types/contentful";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const locale = params.locale as LOCALE_CODE;
  if (!locale) {
    throw new Error("No locale provided");
  }
  const page = await getPageById(pageIds.STARTPAGE, locale);
  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  const latestPosts = (await getLatestBlogposts(locale as LOCALE_CODE)) as IBlogpost[];

  return json({ page, locale, latestPosts });
};

export default function Index() {
  const { page, locale } = useLoaderData<typeof loader>();
  return <ContentBlocks content={page.fields.content} locale={locale} />;
}
