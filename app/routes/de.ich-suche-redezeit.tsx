import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BasicLayout from "~/components/layout/BasicLayout";
import SpeakingTimeContent from "~/components/SpeakingTimeContent";
import { getSeoMeta } from "~/seo";
import type { SearchPageContentResponse } from "~/utils/getSearchPageContents";
import { getSearchPageContents } from "~/utils/getSearchPageContents";

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
    gender,
    tags,
    navigation,
    checkedTags,
    currentLang,
    checkedGender,
    locale,
    availableTagIDs,
  } = useLoaderData<typeof loader>();

  return (
    <BasicLayout nav={navigation.fields.items} lang={locale}>
      <SpeakingTimeContent
        languages={languages}
        gender={gender}
        currentLang={currentLang}
        checkedGender={checkedGender}
        locale={locale}
        coaches={coaches}
        coachesAmount={coachesAmount}
        tags={tags}
        checkedTags={checkedTags}
        availableTagIDs={availableTagIDs}
        page={page}
      />
    </BasicLayout>
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
