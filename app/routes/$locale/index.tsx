import { IPage, LOCALE_CODE } from "../../../@types/generated/contentful";
import { LoaderFunction, useLoaderData } from "remix";
import { getPageById } from "~/utils/contentful";
import pageIds from "~/utils/pageIds";
import ContentBlocks from "~/components/ContentBlocks";

type PageProps = {
  page: IPage;
  locale: LOCALE_CODE;
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
  }: PageProps = useLoaderData();
  return <ContentBlocks content={content} locale={locale} />;
}
