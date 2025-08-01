import type { LoaderFunction } from "react-router";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BlogpostCard from "~/components/BlogpostCard";
import { getBlogposts } from "~/utils/contentful";
import type {
  IBlogpost,
  ITag,
  LOCALE_CODE,
} from "../../@types/generated/contentful";

export const loader: LoaderFunction = async ({ params }) => {
  const tag = params.tag;
  const locale = (params.locale as string) || "de";
  const posts = (await getBlogposts(locale as LOCALE_CODE)) as IBlogpost[];

  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }

  const postsWithCurrentTag = posts.filter((post) => {
    return (
      post.fields.tagList &&
      post.fields.tagList.some((tag) => tag.fields.slug === params.tag)
    );
  });

  if (postsWithCurrentTag.length === 0) {
    throw new Response(`No posts found for ${tag}`, {
      status: 404,
      statusText: `No posts found for ${tag}`,
    });
  }

  return { posts: postsWithCurrentTag, locale, tag };
};

export default function Index() {
  const {
    posts,
    locale,
    tag,
  }: {
    posts: IBlogpost[];
    locale: LOCALE_CODE;
    tag: ITag["fields"]["slug"];
  } = useLoaderData<typeof loader>();
  const { t } = useTranslation("blogpostByTag");

  return (
    <>
      <header className="w-full px-4 pt-24">
        <h2 className="font-headline text-3xl font-bold">
          <>
            {t("title")} "{tag}"
          </>
        </h2>
      </header>
      <div className="my-4 mx-auto grid grid-cols-1 gap-y-24 gap-x-16 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
