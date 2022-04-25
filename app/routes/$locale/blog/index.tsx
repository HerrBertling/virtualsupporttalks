import {
  IBlogpost,
  LOCALE_CODE,
} from "../../../../@types/generated/contentful";
import type { LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { getBlogposts } from "~/utils/contentful";
import BlogpostCard from "~/components/BlogpostCard";

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
    useLoaderData();
  return (
    <>
      <header className="w-full px-4 pt-32 pb-12">
        <h2 className="font-headline text-3xl font-bold">
          Die neuesten Blog-Beiträge
        </h2>
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
