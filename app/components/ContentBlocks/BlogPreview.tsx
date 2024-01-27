import { useTranslation } from "react-i18next";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BlogpostCard from "~/components/BlogpostCard";
import { IBlogpost } from "@types/generated/contentful";
import { useLoaderData } from "@remix-run/react";

export default function ContentBlockBlogPreview() {
  const { latestPosts } = useLoaderData<{ latestPosts: IBlogpost[] }>();
  const all = useLoaderData();
  const { t } = useTranslation("blogpostOverview");

  console.log("POSTS from component", latestPosts, all);

  return (
    <>
      <header className="w-full px-4 pt-32 pb-12">
        <h2 className="font-headline text-3xl font-bold">{t("title")}</h2>
      </header>
      <div className="my-4 mx-auto grid grid-cols-1 gap-16 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-y-16 lg:gap-x-12">
        {latestPosts.map((post: IBlogpost) => (
          <BlogpostCard post={post} locale={"de"} key={post.sys.id} />
        ))}
      </div>
    </>
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
