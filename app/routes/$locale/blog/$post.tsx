import {
  IBlogpost,
  LOCALE_CODE,
} from "../../../../@types/generated/contentful";
import { useCatch, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getBlogpost } from "~/utils/contentful";
import ContentBlocks from "~/components/ContentBlocks";
import TagGroup from "~/components/TagGroup";
import BasicLayout from "~/components/layout/BasicLayout";

export const loader: LoaderFunction = async ({ params }) => {
  const { post, locale } = params;

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const blogpost = await getBlogpost(post, locale as LOCALE_CODE);

  if (!blogpost) {
    throw new Response("Not Found", { status: 404 });
  }

  return { blogpost, locale };
};

export default function Blogpost() {
  const { blogpost, locale } = useLoaderData();

  const { mainImage, content, title, tagList } = blogpost.fields;
  const dateObj = new Date(blogpost.sys.createdAt);
  const date = dateObj.toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <>
      <header className="pt-24 px-4 pb-6 w-full max-w-4xl mx-auto">
        <div
          className={`grid grid-cols-1 grid-rows-1 rounded-lg overflow-hidden shadow-lg min-h-[16rem] after:row-start-1 after:col-start-1 after:content-[\'\'] after:block after:z-10 after:bg-vsp-500 after:mix-blend-multiply after:relative ${
            !mainImage && "bg-contain"
          }`}
        >
          {mainImage && (
            <img
              className="col-start-1 row-start-1 w-full min-h-[16rem] object-cover max-w-4xl relative z-0"
              src={mainImage.fields.file.url}
            />
          )}
          <h1 className="col-start-1 row-start-1 relative z-20 self-end m-0 p-4 text-white text-3xl md:text-4xl lg:text-5xl font-bold font-headline break-words">
            {title}
          </h1>
        </div>
      </header>
      <aside
        className={`flex max-w-4xl mx-auto px-4 gap-4 flex-wrap ${
          Boolean(tagList) ? "justify-between" : "justify-end"
        }`}
      >
        {Boolean(tagList) && <TagGroup tags={tagList} locale={locale} />}
        <div className="flex gap-4">
          {/* <ShareButton :title="title" :text="description" :url="url" /> */}
          <time
            dateTime="sys.createdAt"
            className="text-gray-400 italic text-sm md:text-base"
          >
            {date}
          </time>
        </div>
      </aside>
      <ContentBlocks content={content} />
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
    <div className="mt-32 container mx-auto">
      <h2>Oh noez! Something went wrong.</h2>
      <p>{JSON.stringify(error)}</p>
    </div>
  );
}
