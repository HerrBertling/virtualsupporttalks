import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
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

export const loader: LoaderFunction = async ({ params }: { params: any }) => {
  const locale = params.locale || "de";

  const page = getPageById(pageIds.NETWORK);
  const navigation = getMainNav("de");
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

  return [...data, locale];
};

export default function SupportMedia() {
  const [page, navigation, network, supporters, media, locale] =
    useLoaderData();

  return (
    <BasicLayout nav={navigation.fields.items} lang="en">
      <div className="container mx-auto max-w-6xl">
        <div className="pt-24">
          <section className="max-w-7xl mx-auto py-12 px-4 md:px-12">
            <h2 className="font-headline text-4xl font-bold mb-12">
              Unser Netzwerk
            </h2>
            {network.length && (
              <div
                style={{
                  gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))",
                }}
                className={"grid grid-rows-auto gap-x-4 gap-y-8"}
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
      </div>

      {supporters && (
        <section className="max-w-7xl mx-auto py-12 px-4 md:px-12">
          <h2 className="font-headline text-4xl font-bold mb-12">
            Unsere Unternehmenspartner
          </h2>
          <div
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))",
            }}
            className="grid grid-rows-auto gap-x-4 gap-y-8"
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
      <ContentBlocks content={page.fields.content} locale={locale} />
      {media && (
        <section className="max-w-7xl mx-auto py-12 px-4 md:px-12">
          <h2 className="font-headline text-4xl font-bold mb-12">
            Redezeit in den Medien
          </h2>
          <div
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))",
            }}
            className="grid grid-rows-auto gap-x-4 gap-y-8"
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
