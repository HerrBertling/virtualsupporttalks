import { useLoaderData } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";
import {
  getMainNav,
  getPageById,
  getNetwork,
  getSupporters,
  getMedia,
} from "~/utils/contentful";
import ContentBlocks from "~/components/ContentBlocks";
import pageIds from "~/utils/pageIds";
import BasicLayout from "~/components/layout/BasicLayout";
import SupporterTile from "~/components/SupporterTile";
import { getSeoMeta } from "~/seo";

export const meta: MetaFunction = ({ data }) => {
  const { title, seo } = data?.page?.fields;

  let seoMeta = getSeoMeta({
    title: seo?.fields?.title || title || null,
    description: seo?.fields?.description || null,
  });
  return {
    ...seoMeta,
  };
};

export const loader: LoaderFunction = async () => {
  const locale = "de";

  const page = getPageById(pageIds.NETWORK, locale);
  const navigation = getMainNav(locale);
  const network = getNetwork();
  const supporters = getSupporters();
  const media = getMedia();

  const data = await Promise.all([
    page,
    navigation,
    network,
    supporters,
    media,
  ]);

  if (!navigation) {
    throw new Response("Could not load navigation", { status: 404 });
  }

  return {
    page: data[0],
    navigation: data[1],
    network: data[2],
    supporters: data[3],
    media: data[4],
    locale,
  };
};

export default function SupportMedia() {
  const { page, navigation, network, supporters, media, locale } =
    useLoaderData();

  return (
    <BasicLayout nav={navigation.fields.items} lang="de">
      <div className="container mx-auto max-w-6xl">
        <div className="pt-24">
          <section className="mx-auto max-w-7xl py-12 px-4 md:px-12">
            <h2 className="mb-12 font-headline text-4xl font-bold">
              Unser Netzwerk
            </h2>
            {network.length && (
              <div
                style={{
                  gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))",
                }}
                className={"grid-rows-auto grid gap-x-4 gap-y-8"}
              >
                {network.map((entry: any) => (
                  <SupporterTile
                    key={entry.fields.url}
                    image={entry.fields.image.fields.file.url}
                    url={entry.fields.url}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {supporters && (
          <section className="mx-auto max-w-7xl py-12 px-4 md:px-12">
            <h2 className="mb-12 font-headline text-4xl font-bold">
              Unsere Unternehmenspartner
            </h2>
            <div
              style={{
                gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))",
              }}
              className="grid-rows-auto grid gap-x-4 gap-y-8"
            >
              {supporters.map((entry: any) => (
                <SupporterTile
                  key={entry.fields.url}
                  url={entry.fields.url}
                  image={entry.fields.image.fields.file.url}
                />
              ))}
            </div>
          </section>
        )}
      </div>
      <ContentBlocks content={page.fields.content} locale={locale} />
      {media && (
        <section className="mx-auto max-w-7xl py-12 px-4 md:px-12">
          <h2 className="mb-12 font-headline text-4xl font-bold">
            Redezeit in den Medien
          </h2>
          <div
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))",
            }}
            className="grid-rows-auto grid gap-x-4 gap-y-8"
          >
            {media.map((entry: any) => (
              <SupporterTile
                key={entry.fields.url}
                url={entry.fields.url}
                image={entry.fields.image.fields.file.url}
                title={entry.fields.title}
              />
            ))}
          </div>
        </section>
      )}
    </BasicLayout>
  );
}
