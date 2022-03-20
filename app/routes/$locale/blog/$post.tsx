import {
  IBlogpost,
  LOCALE_CODE,
} from "../../../../@types/generated/contentful";
import { useCatch, useLoaderData } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";
import { getBlogpost } from "~/utils/contentful";
import ContentBlocks from "~/components/ContentBlocks";
import TagGroup from "~/components/TagGroup";
import { getSeoMeta } from "~/seo";

export const meta: MetaFunction = ({ data }: { data: IBlogpost }) => {
  const { title, seo, description } = data?.blogpost?.fields;

  let seoMeta = getSeoMeta({
    title: seo?.fields?.title || title,
    description: seo?.fields?.description || description,
  });
  return {
    ...seoMeta,
  };
};

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
      <header className="mx-auto w-full max-w-4xl px-4 pt-24 pb-6">
        <div
          className={`grid min-h-[16rem] grid-cols-1 grid-rows-1 overflow-hidden rounded-lg shadow-lg after:relative after:z-10 after:col-start-1 after:row-start-1 after:block after:bg-vsp-500 after:mix-blend-multiply after:content-[\'\'] ${
            !mainImage && "bg-contain"
          }`}
        >
          {mainImage && (
            <img
              className="relative z-0 col-start-1 row-start-1 min-h-[16rem] w-full max-w-4xl object-cover"
              src={mainImage.fields.file.url}
            />
          )}
          <h1 className="relative z-20 col-start-1 row-start-1 m-0 self-end break-words p-4 font-headline text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </header>
      <aside
        className={`mx-auto flex max-w-4xl flex-wrap gap-4 px-4 ${
          Boolean(tagList) ? "justify-between" : "justify-end"
        }`}
      >
        {Boolean(tagList) && <TagGroup tags={tagList} locale={locale} />}
        <div className="flex gap-4">
          {/* <ShareButton :title="title" :text="description" :url="url" /> */}
          <time
            dateTime="sys.createdAt"
            className="text-sm italic text-gray-400 md:text-base"
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
    <div className="container mx-auto mt-32">
      <h2>Oh noez! We failed.</h2>
      <p>
        {caught.status}: {caught.statusText}
      </p>
    </div>
  );
}
export function ErrorBoundary(error) {
  return (
    <div className="container mx-auto mt-32">
      <h2>Oh noez! Something went wrong.</h2>
      <p>{JSON.stringify(error)}</p>
    </div>
  );
}
