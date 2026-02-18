import { useTranslation } from "react-i18next";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BlogpostCard from "~/components/BlogpostCard";
import { getBlogposts } from "~/utils/contentful";
import type { IBlogpost, LOCALE_CODE } from "../../types/contentful";
import type { Route } from "./+types/$locale.blog.tag.$tag";

export async function loader({ params }: Route.LoaderArgs) {
  const tag = params.tag;
  const locale = (params.locale as LOCALE_CODE) || "de";

  if (!tag) {
    throw new Response("Not Found", { status: 404 });
  }

  const posts = (await getBlogposts(locale as LOCALE_CODE)) as IBlogpost[];

  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }

  const postsWithCurrentTag = posts.filter((post) => {
    const tagList = post.fields.tagList;
    if (!Array.isArray(tagList)) return false;

    return tagList.some((tagEntry) => {
      if (!tagEntry || typeof tagEntry !== "object" || !("fields" in tagEntry) || !tagEntry.fields)
        return false;
      if (typeof tagEntry.fields !== "object" || !("slug" in tagEntry.fields)) return false;
      return tagEntry.fields.slug === tag;
    });
  });

  if (postsWithCurrentTag.length === 0) {
    throw new Response(`No posts found for ${tag}`, {
      status: 404,
      statusText: `No posts found for ${tag}`,
    });
  }

  return { posts: postsWithCurrentTag, locale, tag };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { posts, locale, tag } = loaderData;
  const { t } = useTranslation("blogpostByTag");

  return (
    <>
      <header className="w-full px-4 pt-24">
        <h2 className="font-headline text-3xl font-bold">
          {t("title")} "{tag}"
        </h2>
      </header>
      <div className="my-4 mx-auto grid grid-cols-1 gap-y-24 gap-x-16 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
