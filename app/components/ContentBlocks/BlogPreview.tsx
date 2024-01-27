import { useTranslation } from "react-i18next";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BlogpostCard from "~/components/BlogpostCard";
import { IBlogpost, LOCALE_CODE } from "@types/generated/contentful";
import { useLoaderData } from "@remix-run/react";
import CleverButton from "../CleverButton";

export default function ContentBlockBlogPreview() {
  const { latestPosts, locale } = useLoaderData<{
    latestPosts: IBlogpost[];
    locale: LOCALE_CODE;
  }>();

  const { t } = useTranslation("blogpostOverview");

  return (
    latestPosts && (
      <>
        <header className="w-full px-4 pt-32 pb-12">
          <h2 className="font-headline text-3xl font-bold">
            {t("contentBlockTitle")}
          </h2>
        </header>
        <div className="my-4 mx-auto grid grid-cols-1 gap-16 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-y-16 lg:gap-x-12">
          {latestPosts.map((post: IBlogpost) => (
            <BlogpostCard
              post={post}
              locale={locale}
              key={post.sys.id}
              showTags={false}
            />
          ))}
        </div>
        <div className="w-full text-center">
          <CleverButton to={`blog`}> {t("contentBlockButton")}</CleverButton>
        </div>
      </>
    )
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
