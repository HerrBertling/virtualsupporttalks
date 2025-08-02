import type { MetaFunction } from "react-router";
import type { Route } from "./+types/$locale.$slug";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import ContentBlocks from "~/components/ContentBlocks";
import { getSeoMeta } from "~/seo";
import { getLatestBlogposts, getPage } from "~/utils/contentful";
import type {
  IBlogpost,
  IPage,
  LOCALE_CODE,
} from "../../@types/generated/contentful";

export const meta: MetaFunction = ({ data }) => {
  if (!data?.page) {
    return [
      {
        title: "404 – page not found",
      },
    ];
  }
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

export async function loader({ params }: Route.LoaderArgs) {
  const { slug, locale } = params;
  const page = await getPage(slug, locale as LOCALE_CODE);

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  const latestPosts = (await getLatestBlogposts(
    (locale || "de") as LOCALE_CODE,
  )) as IBlogpost[];

  return { page, locale, latestPosts };
};

type PageProps = {
  locale: LOCALE_CODE;
  page: IPage;
  latestPosts: IBlogpost[];
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

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
