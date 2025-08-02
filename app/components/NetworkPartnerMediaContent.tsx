import type {
  IMedia,
  INavigation,
  INetwork,
  IPage,
  ISupporter,
  LOCALE_CODE,
} from "../../@types/generated/contentful";
import { useTranslation } from "react-i18next";
import ContentBlocks from "./ContentBlocks";
import BasicLayout from "./layout/BasicLayout";
import SupporterTile from "./SupporterTile";

type NetworkPartnerMediaProps = {
  page?: IPage;
  navigation: INavigation;
  network?: INetwork[];
  supporters?: ISupporter[];
  media: IMedia[];
  locale: LOCALE_CODE;
};

export default function networkPartnerMedia({
  navigation,
  locale,
  network,
  supporters,
  page,
  media,
}: NetworkPartnerMediaProps) {
  const { t } = useTranslation("networkPartnerMedia");
  return (
    <BasicLayout nav={navigation.fields.items!} lang={locale}>
      <div className="container mx-auto max-w-6xl">
        <div className="pt-24">
          <section className="mx-auto max-w-7xl px-4 py-12 md:px-12">
            <h2 className="mb-12 font-headline text-4xl font-bold">
              {t("title.network")}
            </h2>
            {network && (
              <div
                style={{
                  gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))",
                }}
                className="grid-rows-auto grid gap-x-4 gap-y-8"
              >
                {network.map((entry: any) => (
                  <SupporterTile
                    key={entry.sys.id}
                    image={entry.fields.image.fields.file.url}
                    url={entry.fields.url}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
        {supporters && (
          <section className="mx-auto max-w-7xl px-4 py-12 md:px-12">
            <h2 className="mb-12 font-headline text-4xl font-bold">
              {t("title.partner")}
            </h2>
            <div
              style={{
                gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))",
              }}
              className="grid-rows-auto grid gap-x-4 gap-y-8"
            >
              {supporters.map((entry: any) => (
                <SupporterTile
                  key={entry.sys.id}
                  url={entry.fields.url}
                  image={entry.fields.image.fields.file.url}
                />
              ))}
            </div>
          </section>
        )}
      </div>
      {page?.fields.content && (
        <ContentBlocks content={page.fields.content} locale={locale} />
      )}
      {media && (
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-12">
          <h2 className="mb-12 font-headline text-4xl font-bold">
            {t("title.media")}
          </h2>
          <div
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))",
            }}
            className="grid-rows-auto grid gap-x-4 gap-y-8"
          >
            {media.map((entry: any) => (
              <SupporterTile
                key={entry.sys.id}
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
