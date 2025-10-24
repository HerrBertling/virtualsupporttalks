import type { Document } from "@contentful/rich-text-types";
import { useLoaderData } from "@remix-run/react";
import type { Entry } from "contentful";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BlogpostCard from "~/components/BlogpostCard";
import type { LOCALE_CODE, TypeBlogpostSkeleton } from "../../../types/contentful";
import CleverButton from "../CleverButton";
import ContentfulRichText from "../ContentfulRichText";
import LanguageFence from "../LanguageFence";

type IBlogpost = Entry<TypeBlogpostSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;

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

  if (!latestPosts) {
    return null;
  }

  return (
    <LanguageFence allowedLanguages={["en", "de"]}>
      <div className="w-full px-4 pt-20 mx-auto max-w-7xl">
        <header>
          <ContentfulRichText content={titleAndHeader} />
        </header>
        <div className="my-4 mx-auto grid grid-cols-1 gap-10 px-4 md:grid-cols-3 md:gap-6 lg:gap-y-16">
          {latestPosts.map((post: IBlogpost) => (
            <BlogpostCard post={post} locale={locale} key={post.sys.id} showTags={false} />
          ))}
        </div>
        <div className="w-full text-center mt-8 mb-20">
          <CleverButton to={"blog"}> {buttonText}</CleverButton>
        </div>
      </div>
    </LanguageFence>
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
