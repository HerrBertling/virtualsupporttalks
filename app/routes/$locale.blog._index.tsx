import { useTranslation } from "react-i18next";
import { data } from "react-router";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BlogpostCard from "~/components/BlogpostCard";
import { publicCacheHeaders } from "~/utils/cacheHeaders";
import { getBlogposts } from "~/utils/contentful";
import type { IBlogpost, LOCALE_CODE } from "../../types/contentful";
import type { Route } from "./+types/$locale.blog._index";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = (params.locale as string) || "de";
  const posts = await getBlogposts(locale as LOCALE_CODE);

  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }

  return data({ posts, locale }, { headers: { "Cache-Tag": `collection:blogpost,nav:${locale}` } });
}

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return publicCacheHeaders(loaderHeaders);
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { posts, locale } = loaderData;
  const { t } = useTranslation("blogpostOverview");
  return (
    <>
      <header className="w-full px-4 pt-32 pb-12">
        <h2 className="font-headline text-3xl font-bold">{t("title")}</h2>
      </header>
      <div className="my-4 mx-auto grid grid-cols-1 gap-16 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-y-16 lg:gap-x-12">
        {(posts as IBlogpost[]).map((post: IBlogpost) => (
          <BlogpostCard post={post} locale={locale as LOCALE_CODE} key={post.sys.id} />
        ))}
      </div>
    </>
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
