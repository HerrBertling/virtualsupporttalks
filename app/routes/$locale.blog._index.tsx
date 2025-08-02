import { useTranslation } from "react-i18next";
import type { Route } from "./+types/$locale.blog._index";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BlogpostCard from "~/components/BlogpostCard";
import { getBlogposts } from "~/utils/contentful";
import type { IBlogpost, LOCALE_CODE } from "../../@types/generated/contentful";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = (params.locale as string) || "de";
  const posts = await getBlogposts(locale as LOCALE_CODE);

  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }

  return { posts, locale };
};

export default function Index({ loaderData }: Route.ComponentProps) {
  const { posts, locale } = loaderData;
  const { t } = useTranslation("blogpostOverview");
  return (
    <>
      <header className="w-full px-4 pt-32 pb-12">
        <h2 className="font-headline text-3xl font-bold">{t("title")}</h2>
      </header>
      <div className="my-4 mx-auto grid grid-cols-1 gap-16 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-y-16 lg:gap-x-12">
        {posts.map((post: IBlogpost) => (
          <BlogpostCard post={post} locale={locale} key={post.sys.id} />
        ))}
      </div>
    </>
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
