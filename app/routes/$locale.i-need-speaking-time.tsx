import type { MetaFunction } from "react-router";
import type { Route } from "./+types/$locale.i-need-speaking-time";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BasicLayout from "~/components/layout/BasicLayout";
import SpeakingTimeContent from "~/components/SpeakingTimeContent";
import { getSeoMeta } from "~/seo";
import { getSearchPageContents } from "~/utils/getSearchPageContents";
import type { LOCALE_CODE } from "../../@types/generated/contentful";

export async function loader({ request, params }: Route.LoaderArgs) {
  const locale = (params.locale as LOCALE_CODE) || "en";
  const data = await getSearchPageContents(request, locale);
  return data;
}

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

export default function SearchingCoach({ loaderData }: Route.ComponentProps) {
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
  } = loaderData;

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
