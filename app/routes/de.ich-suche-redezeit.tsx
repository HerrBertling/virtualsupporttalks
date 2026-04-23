import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BasicLayout from "~/components/layout/BasicLayout";
import SpeakingTimeContent from "~/components/SpeakingTimeContent";
import { getSeoMeta } from "~/seo";
import { publicCacheHeaders } from "~/utils/cacheHeaders";
import { getSearchPageContents } from "~/utils/getSearchPageContents";
import type { Route } from "./+types/de.ich-suche-redezeit";

export async function loader({ request }: Route.LoaderArgs) {
  return getSearchPageContents(request, "de");
}

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return publicCacheHeaders(loaderHeaders);
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data?.page) {
    return [{ title: "Redezeit suchen" }];
  }

  const { title, seo } = data.page.fields;

  const seoMeta = getSeoMeta({
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
    navItems,
    checkedTags,
    currentLang,
    checkedGender,
    locale,
    availableTagIDs,
    emailTemplate,
  } = loaderData;

  return (
    <BasicLayout nav={navItems} lang={locale}>
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
