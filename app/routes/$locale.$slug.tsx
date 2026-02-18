import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import ContentBlocks from "~/components/ContentBlocks";
import { getSeoMeta } from "~/seo";
import { getLatestBlogposts, getPage } from "~/utils/contentful";
import type { IBlogpost, LOCALE_CODE } from "../../types/contentful";
import type { Route } from "./+types/$locale.$slug";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data?.page) {
    return [
      {
        title: "404 – page not found",
      },
    ];
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
  const { slug, locale } = params;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const [page, latestPosts] = await Promise.all([
    getPage(slug, locale as LOCALE_CODE),
    getLatestBlogposts((locale || "de") as LOCALE_CODE) as Promise<IBlogpost[]>,
  ]);

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  return { page, locale: locale as LOCALE_CODE, latestPosts };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { page, locale } = loaderData;
  return <ContentBlocks content={page.fields.content} locale={locale} />;
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
