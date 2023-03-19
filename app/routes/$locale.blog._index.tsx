import type { LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import BasicCatchBoundary from "~/components/BasicCatchBoundary";
import BlogpostCard from "~/components/BlogpostCard";
import { getBlogposts } from "~/utils/contentful";
import type { IBlogpost, LOCALE_CODE } from "../../@types/generated/contentful";

export const loader: LoaderFunction = async ({ params }) => {
  const locale = (params.locale as string) || "de";
  const posts = await getBlogposts(locale as LOCALE_CODE);

  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }

  return { posts, locale };
};

export default function Index() {
  const { posts, locale }: { posts: IBlogpost[]; locale: LOCALE_CODE } =
    useLoaderData<typeof loader>();
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

export function CatchBoundary() {
  const caught = useCatch();
  return <BasicCatchBoundary {...caught} />;
}
export function ErrorBoundary(error: Error) {
  return <BasicCatchBoundary status={503} statusText={error.message} />;
}
