import {
  IBlogpost,
  ITag,
  LOCALE_CODE,
} from "../../../../../@types/generated/contentful";
import { useCatch, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getBlogposts } from "~/utils/contentful";
import BlogpostCard from "~/components/BlogpostCard";

export const loader: LoaderFunction = async ({ params }) => {
  const posts = (await getBlogposts()) as IBlogpost[];
  const tag = params.tag;
  const locale = (params.locale as string) || "de";

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

  return (
    <>
      <header className="pt-24 px-4 w-full">
        <h2 className="text-3xl font-bold font-headline">
          BLOGPOSTS for the tag {tag}
        </h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-16 my-4 mx-auto px-4 md:gap-8">
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
    <div className="mt-32 container mx-auto">
      <h2>Oh noez! We failed.</h2>
      <p>
        {caught.status}: {caught.statusText}
      </p>
    </div>
  );
}
export function ErrorBoundary(error) {
  return (
    <div>
      <h2>Oh noez! Something went wrong.</h2>
      <p>{JSON.stringify(error)}</p>
    </div>
  );
}
