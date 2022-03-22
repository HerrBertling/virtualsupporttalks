import { ICoach, ICoachtag } from "../../@types/generated/contentful";
import { useLoaderData, useCatch, Form, useTransition } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";
import ContentBlocks from "~/components/ContentBlocks";
import BasicLayout from "~/components/layout/BasicLayout";
import {
  getSearchPageContents,
  SearchPageContentResponse,
} from "~/utils/getSearchPageContents";
import CoachList from "~/components/CoachList";
import CoachFilterTag from "~/components/CoachFilterTag";
import { getSeoMeta } from "~/seo";
import { useTranslation } from "react-i18next";

export const loader: LoaderFunction = async ({
  request,
}): Promise<SearchPageContentResponse> => {
  const data = await getSearchPageContents(request, "de");
  return data;
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

export default function SearchingCoach() {
  const {
    page,
    coaches,
    coachesAmount,
    languages,
    tags,
    navigation,
    checkedTags,
    currentLang,
    locale,
    availableTagIDs,
  } = useLoaderData();
  const state = useTransition();
  const { t } = useTranslation("searchingCoach");
  return (
    <BasicLayout nav={navigation.fields.items} lang={locale}>
      <div>
        <ContentBlocks content={page.fields.content} locale={locale} />
        <details open={true} className="mx-auto max-w-7xl py-8 px-4">
          <summary>
            <h5 className="inline-block text-xl">Filter anzeigen</h5>
          </summary>
          <Form replace>
            <fieldset className="mt-8">
              <legend className="mb-4 inline-block text-xl">
                {t("filter.language")}
              </legend>
              {languages.map((lang: string) => (
                <CoachFilterTag
                  disabled={false}
                  key={lang}
                  value={lang}
                  name="lang"
                  defaultValue={currentLang === lang}
                  type="radio"
                >
                  {lang}
                </CoachFilterTag>
              ))}
            </fieldset>
            <fieldset className="mt-8">
              <legend className="mb-4 inline-block text-xl">
                {t("filter.tag")}
              </legend>
              {tags.map((tag: ICoachtag) => (
                <CoachFilterTag
                  disabled={!availableTagIDs.includes(tag.sys.id)}
                  key={tag.sys.id}
                  value={tag.fields.tag}
                  name="tag"
                  defaultValue={checkedTags.includes(tag.fields.tag)}
                  type="checkbox"
                >
                  {tag.fields.tag}
                </CoachFilterTag>
              ))}
            </fieldset>
            <div className="flex items-center gap-4">
              <button
                className="font-inherit my-8 inline-flex items-center justify-center rounded-md bg-vsp-500 py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 disabled:pointer-events-none disabled:bg-vsp-200 md:text-lg"
                type="submit"
                disabled={state.state === "submitting"}
              >
                {t("filter.submitCta")}
              </button>
              <span className="text-sm text-slate-400">
                {coachesAmount} Zuhörer*innen gefunden.
              </span>
            </div>
          </Form>
        </details>
        <CoachList coaches={coaches} />
      </div>
    </BasicLayout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <>
      <h1>Oh no!</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </>
  );
}
