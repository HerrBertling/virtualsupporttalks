import type { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BasicLayout from "~/components/layout/BasicLayout";
import SpeakingTimeContent from "~/components/SpeakingTimeContent";
import { getSeoMeta } from "~/seo";
import { getSearchPageContents } from "~/utils/getSearchPageContents";

export const headers: HeadersFunction = () => ({
  // Tell the browser to always check the freshness of the cache
  "Cache-Control": "public, max-age=0, must-revalidate",
  // Tell the CDN to treat it as fresh for 5 minutes, but for a day after that return a stale version while it revalidates
  "Netlify-CDN-Cache-Control": "public, durable, s-maxage=300, stale-while-revalidate=86400",
});

export const loader: LoaderFunction = async ({ request }) => {
  const data = await getSearchPageContents(request, "uk");
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
