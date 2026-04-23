import { data } from "react-router";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import ContentBlocks from "~/components/ContentBlocks";
import TagGroup from "~/components/TagGroup";
import { getSeoMeta } from "~/seo";
import { publicCacheHeaders } from "~/utils/cacheHeaders";
import { getBlogpost } from "~/utils/contentful";
import { ensureFound } from "~/utils/ensureFound";
import type { LOCALE_CODE } from "../../types/contentful";
import type { Route } from "./+types/$locale.blog.$post";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data?.blogpost) {
    return [
      {
        title: "404 – page not found",
      },
    ];
  }
  const { title, seo, description } = data.blogpost.fields;

  const seoMeta = getSeoMeta({
    title: seo?.fields?.title || title,
    description: seo?.fields?.description || description,
  });
  return [
    {
      ...seoMeta,
    },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const { post, locale } = params;

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const blogpost = ensureFound(
    await getBlogpost(post, locale as LOCALE_CODE),
    "Blog post not found"
  );

  return data(
    { blogpost, locale: locale as LOCALE_CODE },
    {
      headers: {
        "Cache-Tag": `entry:${blogpost.sys.id},collection:blogpost,nav:${locale}`,
      },
    }
  );
}

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return publicCacheHeaders(loaderHeaders);
}

export default function Blogpost({ loaderData }: Route.ComponentProps) {
  const { blogpost, locale } = loaderData;

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
          className={`grid min-h-[16rem] max-h-96 grid-cols-1 grid-rows-1 overflow-hidden rounded-lg shadow-lg after:relative after:z-10 after:col-start-1 after:row-start-1 after:block after:bg-vsp-500 after:mix-blend-multiply ${
            !mainImage && "bg-contain"
          }`}
        >
          {mainImage && (
            <img
              alt=""
              className="relative z-0 col-start-1 row-start-1 min-h-[16rem] w-full max-w-4xl object-cover object-center"
              src={mainImage.fields.file?.url}
            />
          )}
          <h1 className="relative z-20 col-start-1 row-start-1 m-0 self-end break-words p-4 font-headline text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </header>
      <aside
        className={`mx-auto flex max-w-4xl flex-wrap gap-4 px-4 ${
          tagList ? "justify-between" : "justify-end"
        }`}
      >
        {Boolean(tagList) && (
          <TagGroup
            tags={tagList?.filter((tag): tag is NonNullable<typeof tag> => tag !== undefined)}
            locale={locale}
          />
        )}
        <div className="flex gap-4">
          {/* <ShareButton :title="title" :text="description" :url="url" /> */}
          <time dateTime="sys.createdAt" className="text-sm italic text-slate-400 md:text-base">
            {date}
          </time>
        </div>
      </aside>
      <ContentBlocks content={content} locale={locale} />
    </>
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
