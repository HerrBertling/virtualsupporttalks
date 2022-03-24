import {
  IBlogpost,
  ITag,
  LOCALE_CODE,
} from "../../../../../@types/generated/contentful";
import { useCatch, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getBlogposts } from "~/utils/contentful";
import BlogpostCard from "~/components/BlogpostCard";
import { useTranslation } from "react-i18next";

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
  } = useLoaderData();
  const { t } = useTranslation("blogpostByTag");

  return (
    <>
      <header className="w-full px-4 pt-24">
        <h2 className="font-headline text-3xl font-bold">
          {t("title")} "{tag}"
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

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="container mx-auto mt-32">
      <h2>Oh noez! We failed.</h2>
      <p>
        {caught.status}: {caught.statusText}
      </p>
    </div>
  );
}
export function ErrorBoundary(error: Error) {
  return (
    <div>
      <h2>Oh noez! Something went wrong.</h2>
      <p>{JSON.stringify(error)}</p>
    </div>
  );
}
