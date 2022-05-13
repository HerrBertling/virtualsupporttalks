import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import BasicCatchBoundary from "~/components/BasicCatchBoundary";
import ContentBlocks from "~/components/ContentBlocks";
import { getSeoMeta } from "~/seo";
import { getPage } from "~/utils/contentful";
import { IPage, LOCALE_CODE } from "../../../@types/generated/contentful";

export const meta: MetaFunction = ({ data }) => {
  if (!data?.page) {
    return {
      title: "404 – page not found",
    };
  }
  const { title, seo } = data?.page?.fields;

  let seoMeta = getSeoMeta({
    title: seo?.fields?.title || title,
    description: seo?.fields?.description || null,
  });
  return {
    ...seoMeta,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug, locale } = params;
  const page = await getPage(slug, locale as LOCALE_CODE);

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  return { page, locale };
};

type PageProps = {
  locale: LOCALE_CODE;
  page: IPage;
};

export default function Index() {
  const {
    page: {
      fields: { content },
    },
    locale,
  }: PageProps = useLoaderData();
  return <ContentBlocks content={content} locale={locale} />;
}

export function CatchBoundary() {
  const caught = useCatch();
  return <BasicCatchBoundary {...caught} />;
}
