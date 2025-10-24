import type { Document } from "@contentful/rich-text-types";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import type { Asset } from "contentful";
import { type PropsWithChildren, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { EmailTemplate } from "~/utils/contentful";
import type { ICoach, ICoachFields, ICoachtag, IPage, LOCALE_CODE } from "../../types/contentful";

// Type guard to check if a value is an Asset
function isAsset(value: unknown): value is Asset {
  return (
    typeof value === "object" &&
    value !== null &&
    "sys" in value &&
    typeof value.sys === "object" &&
    value.sys !== null &&
    "type" in value.sys &&
    value.sys.type === "Asset"
  );
}

// Type guard to check if a value is a Contentful RichText Document
function isDocument(value: unknown): value is Document {
  return (
    typeof value === "object" &&
    value !== null &&
    "nodeType" in value &&
    "content" in value &&
    "data" in value
  );
}

import CoachCard from "./CoachCard";
import CoachFilterTag from "./CoachFilterTag";
import CoachList from "./CoachList";
import CoachSearch from "./CoachSearch";
import ContentBlocks from "./ContentBlocks";
import ContentfulRichText from "./ContentfulRichText";
import ArrowDown from "./icons/ArrowDown";
import FilterIcon from "./icons/FilterIcon";
import Spinner from "./icons/Spinner";

const QUICK_RESPONSE_TAG_ID = "4dQrja372DDIuqvhTtnGda";

type SpeakingTimeContentProps = {
  page: IPage;
  locale: LOCALE_CODE;
  languages: string[];
  gender: string[];
  checkedGender: string[];
  tags: ICoachtag[];
  currentLang: string;
  availableTagIDs: string[];
  checkedTags: string[];
  coaches: ICoach[];
  coachesAmount: number;
  emailTemplate?: EmailTemplate;
};

export default function SpeakingTimeContent({
  page,
  locale,
  languages,
  gender,
  checkedGender,
  tags,
  currentLang,
  availableTagIDs,
  checkedTags,
  coaches,
  coachesAmount,
  emailTemplate,
}: SpeakingTimeContentProps) {
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation("searchingCoach");
  const [isActive, setIsActive] = useState(false);
  const [_showMoreFilters, _setShowMoreFilters] = useState(false);
  var timeout: NodeJS.Timeout;

  const handleChange = () => {
    if (formRef) {
      // not the best solution as the tags now will timeout for 300ms as well - but with the onchange on the form I could not find another way
      // to debounce the search input to not sent a request for each input .. happy for suggestions
      clearTimeout(timeout);
      timeout = setTimeout(
        () => submit(formRef.current, { replace: true, preventScrollReset: true }),
        300
      );
    }
  };
  const state = useNavigation();

  // Separate popular/most used tags from others
  const popularTags = tags.filter((tag) => tag.fields.isMostUsed === true);
  const otherTags = tags.filter((tag) => tag.fields.isMostUsed !== true);

  // sort popular tags to ensure the "quick response" one is always the first
  const quickResponseIndex = popularTags.map((tag) => tag.sys.id).indexOf(QUICK_RESPONSE_TAG_ID);
  if (quickResponseIndex > -1) {
    popularTags.unshift(popularTags.splice(quickResponseIndex, 1)[0]);
  }

  return (
    <div>
      <ContentBlocks content={page.fields.content as any} locale={locale} />
      <Form
        onChange={handleChange}
        ref={formRef}
        method="get"
        id="filter-form"
        className="bg-slate-100"
      >
        <section className="mx-auto max-w-7xl pt-6 px-4">
          <header className="inline-flex  cursor-pointer items-center hover:text-vsp-500">
            <FilterIcon />
            <h5 className="inline-block px-4 text-xl" id="details-filter">
              {t("filter.showFilter")}
            </h5>
          </header>

          {/* Popular/Most Used Tags - Always Visible */}
          {popularTags.length > 0 && (
            <fieldset className="mt-8">
              <CoachTagCollectionLegend>{t("filter.popularTags")}</CoachTagCollectionLegend>
              <CoachTagCollection>
                {popularTags.map((tag: ICoachtag) => {
                  const isHighlighted = tag.sys.id === QUICK_RESPONSE_TAG_ID;
                  const isNotSelectable =
                    !availableTagIDs.includes(tag.sys.id) && !checkedTags.includes(tag.sys.id);
                  return (
                    <CoachFilterTag
                      isHighlighted={isHighlighted}
                      disabled={isNotSelectable}
                      key={tag.sys.id}
                      value={tag.sys.id}
                      name="tag"
                      defaultValue={checkedTags.includes(tag.sys.id)}
                      type="checkbox"
                    >
                      {tag.fields.tag as string}
                    </CoachFilterTag>
                  );
                })}
              </CoachTagCollection>
            </fieldset>
          )}

          <details open={false} className="pt-6">
            <summary
              className="inline-flex gap-1 cursor-pointer items-center hover:text-vsp-500"
              onClick={() => setIsActive(!isActive)}
            >
              <h5 className="text-md font-semibold text-slate-500">{t("filter.moreFilters")}</h5>
              <div
                className={`transition-transform hover:text-vsp-500 ${
                  isActive ? "rotate-180" : "rotate-0"
                }`}
              >
                <ArrowDown className="size-4" />
              </div>
            </summary>

            <div className="pt-8 flex flex-col gap-8">
              <fieldset>
                <CoachTagCollectionLegend>{t("filter.language")}</CoachTagCollectionLegend>
                <CoachTagCollection>
                  {languages.map((lang: string) => (
                    <CoachFilterTag
                      isHighlighted={false}
                      disabled={false}
                      key={lang}
                      value={lang}
                      name="lang"
                      defaultValue={currentLang === lang}
                      type="radio"
                    >
                      {t(`languageTags.${lang}`)}
                    </CoachFilterTag>
                  ))}
                </CoachTagCollection>
              </fieldset>

              {/* Gender filter */}

              <fieldset>
                <CoachTagCollectionLegend>{t("filter.gender")}</CoachTagCollectionLegend>
                {gender.map((genders: string) => (
                  <CoachFilterTag
                    isHighlighted={false}
                    disabled={false}
                    key={genders}
                    value={genders}
                    name="gender"
                    defaultValue={checkedGender.includes(genders)}
                    type="checkbox"
                  >
                    {t(`genderTags.${genders}`)}
                  </CoachFilterTag>
                ))}
              </fieldset>

              {/* More Filters - Expandable Section */}
              {otherTags.length > 0 && (
                <fieldset>
                  <CoachTagCollectionLegend>{t("filter.tag")}</CoachTagCollectionLegend>
                  <CoachTagCollection>
                    {otherTags.map((tag: ICoachtag) => {
                      const isNotSelectable =
                        !availableTagIDs.includes(tag.sys.id) && !checkedTags.includes(tag.sys.id);
                      return (
                        <CoachFilterTag
                          isHighlighted={false}
                          disabled={isNotSelectable}
                          key={tag.sys.id}
                          value={tag.sys.id}
                          name="tag"
                          defaultValue={checkedTags.includes(tag.sys.id)}
                          type="checkbox"
                        >
                          {tag.fields.tag as string}
                        </CoachFilterTag>
                      );
                    })}
                  </CoachTagCollection>
                </fieldset>
              )}
              <div className="flex items-center gap-4">
                <noscript>
                  <button
                    className="font-inherit my-8 inline-flex items-center justify-center rounded-md bg-vsp-500 py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 disabled:pointer-events-none disabled:bg-vsp-200 md:text-lg"
                    type="submit"
                    disabled={state.state === "submitting"}
                  >
                    {t("filter.submitCta")}
                  </button>
                </noscript>
              </div>
            </div>
          </details>
        </section>
        <div className="py-6 px-4 max-w-7xl mx-auto flex justify-end lg:justify-between items-center flex-wrap">
          <CoachSearch />
          <div className="text-m font-semibold text-slate-700">
            {coachesAmount ? `${coachesAmount} ${t("result")}` : t("noResult")}
          </div>
        </div>
      </Form>

      <div className="relative">
        {state.state === "loading" && (
          <div className="absolute inset-0 z-50 flex items-start justify-center bg-white bg-opacity-50">
            <div className="mt-8">
              <Spinner />
            </div>
          </div>
        )}
        <CoachList>
          {coaches.map((coach: ICoach) => {
            const {
              email,
              name,
              url,
              phone,
              emergency,
              image,
              description,
              languages,
              mhfaTraining,
              completedMhfaTraining,
            } = coach.fields as ICoachFields;

            // Type guards for safe rendering
            const safeEmail = typeof email === "string" ? email : undefined;
            const safeName = typeof name === "string" ? name : undefined;
            const safeUrl = typeof url === "string" ? url : undefined;
            const safePhone = typeof phone === "string" ? phone : undefined;
            const safeEmergency = typeof emergency === "boolean" ? emergency : undefined;
            const safeLanguages = Array.isArray(languages)
              ? languages.filter((l): l is string => typeof l === "string")
              : undefined;
            const safeImage = isAsset(image) ? image : undefined;
            const safeMhfaTraining = isAsset(mhfaTraining) ? mhfaTraining : undefined;
            const safeMhfaLabel =
              typeof completedMhfaTraining === "string" ? completedMhfaTraining : undefined;
            const safeDescription = isDocument(description) ? description : undefined;

            return (
              <CoachCard key={coach.sys.id} emergency={safeEmergency} coachName={safeName}>
                <CoachCard.Avatar image={safeImage} name={safeName} />

                <CoachCard.Header>
                  <CoachCard.Name>{safeName}</CoachCard.Name>
                  <CoachCard.Meta>
                    <CoachCard.Languages languages={safeLanguages} />
                    <CoachCard.Badge image={safeMhfaTraining} label={safeMhfaLabel} />
                  </CoachCard.Meta>
                </CoachCard.Header>

                <CoachCard.Description>
                  {safeDescription && (
                    <ContentfulRichText content={safeDescription} withProse={false} />
                  )}
                </CoachCard.Description>

                <CoachCard.Contacts>
                  {safeEmail && (
                    <CoachCard.Email
                      email={safeEmail}
                      subject={emailTemplate?.subject}
                      body={emailTemplate?.content}
                    />
                  )}
                  {safeUrl && <CoachCard.Website url={safeUrl} />}
                  {safePhone && <CoachCard.Phone phone={safePhone} />}
                </CoachCard.Contacts>
              </CoachCard>
            );
          })}
        </CoachList>
      </div>
    </div>
  );
}

function CoachTagCollectionLegend({ children }: PropsWithChildren) {
  return <legend className="inline-block mb-3 text-lg text-slate-800">{children}</legend>;
}
function CoachTagCollection({ children }: PropsWithChildren) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}
