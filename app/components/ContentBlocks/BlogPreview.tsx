import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BlogpostCard from "~/components/BlogpostCard";
import { IBlogpost, LOCALE_CODE } from "@types/generated/contentful";
import { useLoaderData } from "@remix-run/react";
import CleverButton from "../CleverButton";
import ContentfulRichText from "../ContentfulRichText";
import type { Document } from "@contentful/rich-text-types";

interface ContentBlockBlogPreviewProps {
  titleAndHeader: Document;
  buttonText: string;
}

export default function ContentBlockBlogPreview({
  titleAndHeader,
  buttonText,
}: ContentBlockBlogPreviewProps) {
  const { latestPosts, locale } = useLoaderData<{
    latestPosts: IBlogpost[];
    locale: LOCALE_CODE;
  }>();

  return (
    latestPosts && (
      <div className="w-full px-4 pt-24 mx-auto max-w-7xl">
        <header>
          <ContentfulRichText content={titleAndHeader} />
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
        <div className="w-full text-center mt-8">
          <CleverButton to={"blog"}> {buttonText}</CleverButton>
        </div>
      </div>
    )
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
