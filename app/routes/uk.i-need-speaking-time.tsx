import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BasicLayout from "~/components/layout/BasicLayout";
import SpeakingTimeContent from "~/components/SpeakingTimeContent";
import { getSearchPageContents } from "~/utils/getSearchPageContents";

export const loader: LoaderFunction = async ({ request }) => {
  const data = await getSearchPageContents(request, "uk");
  return data;
};

export const meta: V2_MetaFunction = ({ data }) => {
  const { title, seo } = data?.page?.fields;

  return [
    { title: seo?.fields?.title || title },
    { description: seo?.fields?.description || null },
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
