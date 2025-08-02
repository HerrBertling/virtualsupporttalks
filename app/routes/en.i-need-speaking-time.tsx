import type { LoaderFunction, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BasicLayout from "~/components/layout/BasicLayout";
import SpeakingTimeContent from "~/components/SpeakingTimeContent";
import { getSeoMeta } from "~/seo";
import { getSearchPageContents } from "~/utils/getSearchPageContents";

export const loader: LoaderFunction = async ({ request }) => {
  const data = await getSearchPageContents(request, "en");
  return data;
};

export const meta: MetaFunction = ({ data }) => {
  const { title, seo } = data?.page?.fields;

  let seoMeta = getSeoMeta({
    title: seo?.fields?.title || title,
    description: seo?.fields?.description || null,
  });
  return [
    {
      ...seoMeta,
    },
  ];
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
    emailTemplate,
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
        emailTemplate={emailTemplate}
      />
    </BasicLayout>
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
