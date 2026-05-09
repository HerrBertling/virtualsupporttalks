import { data } from "react-router";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import ContentBlocks from "~/components/ContentBlocks";
import { getSeoMeta } from "~/seo";
import { publicCacheHeaders } from "~/utils/cacheHeaders";
import { getLatestBlogposts, getPage } from "~/utils/contentful";
import { assertSupportedLocale } from "~/utils/locales";
import type { IBlogpost } from "../../types/contentful";
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

export async function loader({ params, request }: Route.LoaderArgs) {
  const { slug, locale } = params;
  assertSupportedLocale(locale, request);

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const [page, latestPosts] = await Promise.all([
    getPage(slug, locale),
    getLatestBlogposts(locale) as Promise<IBlogpost[]>,
  ]);

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  return data(
    { page, locale, latestPosts },
    {
      headers: {
        "Cache-Tag": `entry:${page.sys.id},collection:blogpost,nav:${locale}`,
      },
    }
  );
}

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return publicCacheHeaders(loaderHeaders);
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { page, locale } = loaderData;
  return <ContentBlocks content={page.fields.content} locale={locale} />;
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
