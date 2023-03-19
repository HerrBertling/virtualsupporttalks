import type { IPage, LOCALE_CODE } from "../../@types/generated/contentful";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPageById } from "~/utils/contentful";
import pageIds from "~/utils/pageIds";
import ContentBlocks from "~/components/ContentBlocks";

import { getSeoMeta } from "~/seo";

type PageProps = {
  page: IPage;
  locale: LOCALE_CODE;
};

export const meta: MetaFunction = ({ data }) => {
  const { title, seo } = data?.page?.fields;

  let seoMeta = getSeoMeta({
    title: seo?.fields?.title || title,
    description: seo?.fields?.description || null,
  });
  return {
    ...seoMeta,
  };
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<PageProps> => {
  const locale = params.locale as LOCALE_CODE;
  if (!locale) {
    throw new Error("No locale provided");
  }
  const page = await getPageById(pageIds.STARTPAGE, locale);
  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }
  return { page, locale };
};

export default function Index() {
  const {
    page: {
      fields: { content },
    },
    locale,
  }: PageProps = useLoaderData<typeof loader>();
  return <ContentBlocks content={content} locale={locale} />;
}
